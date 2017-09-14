# Nginx

## nginx 指令

### 檢查設定檔路徑
```sh
nginx -t
```

### 重啟nginx

```sh
sudo service nginx restart
```

## nginx 設定檔

### 基本結構

```sh
http {  
  server {
    location {

    }
  }
}
```

### 設定 proxy server

在 /etc/nginx/conf.d/ 創立一個自己的 config 檔案

以下範例的情況為，讓 nginx 監聽 80 port，假如 url 為 www.example.com 則導向 server 的 3000 port

```sh  
server {

  listen 80;
  server_name www.example.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
  }
}
```

以下範例的情況為，若只有一個domain的情況，想在不同的 port 開起服務，首先讓 nginx 監聽 80 port，假如 url 為 www.example.com 則導向 server 的 3000 port
如果 url 為 api.example.com 則導向 server 的 8080 port

```sh
server {

  listen 80;

  server_name www.example.com example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
  }

}

server {

  listen 80;

  server_name api.example.com;

  location / {
    proxy_pass http://127.0.0.1:8080;
  }

}
```

以下範例的情況為，若有兩個 domain ，想讓兩個 domain 連到同一台 server 不同的 port，首先讓 nginx 監聽 80 port，假如 url 為 www.example1.com 則導向 server 的 3000 port
如果 url 為 www.example2.com 則導向 server 的 8080 port

```sh
server {

  listen 80;

  server_name www.example1.com example1.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
  }

}

server {

  listen 80;

  server_name www.example2.com example2.com;

  location / {
    proxy_pass http://127.0.0.1:8080;
  }

}
```

## 負載平衡

nginx config

```sh
upstream server{
  server 192.168.60.1:80;        //主機A的位置
  server 192.168.60.2:80;        //主機B的位置
}

server{
  listen 80; 
  server_name  domain.com;      //網站的網域名稱
  location / {
     proxy_pass http://server;   //設定的upstream
  }
}
```

## With cloudflare

透過 cloudflare 幫忙做反向代理以及掛上 https，主要的架構如下

```     
       HTTP
       port 80
       HTTPS            HTTP         redirect
       port 443         port 80      port 3000
client ----> cloudflare ---->  nginx ----> webapp
```
