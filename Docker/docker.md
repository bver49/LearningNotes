## Docker安裝

### Server

``` sh
curl -sSL https://get.docker.com | sudo sh
```

### Mac(OSX)

下載 https://store.docker.com/editions/community/docker-ce-desktop-mac


## 映像檔

```sh

docker images  #查看現有的映像檔

docker build -t  name:tag  .  #用dockerfile建立一份image，並給予image一個name與tag

docker tag imageid newtag  #為image重新取一個tag

```

## 容器

```sh

docker ps #查看運行中的容器

docker ps -a #查看現有的容器，包含未運行的

docker run -d --name custom image command  #使用image 建立一個名字叫 custom 的container在背景啟動，啟動時執行command

docker run -it  image command   #使用image 建立一個container在前景啟動，啟動時執行command

docker run -d -P image  #用image啟動container時自動連接container跟host的port EX：自動分配host上的 3000 port 對應container的 5000port

docker run -d -p 80:5000 image  #用image啟動container時將host的80 port 對應到container的5000 port

docker run -d -p 127.0.0.1:80:5000 image  #用image啟動container時將host的127.0.0.1:80 port 對應到container的5000 port

docker start/stop/restart container  #啟動/暫停/重啟 container

docker exec -it container bash  #進入container

```

## 查看配置

```sh

docker inspect -f {{.State.Running}}  #container 確認container是否運行中

docker logs container  #查看container的log

docker logs -f container  #查看container的log，log會即時更新

docker port container	 #查看容器port的配置

```

## 刪除容器與映像檔

```sh

docker rm -f container  #移除container

docker rmi -f image  #移除image

docker rm -f $(docker ps -a -q)  #刪除所有container

docker rmi -f $(docker images -q) #刪除所有images

docker container prune #刪除所有未運行的container

docker image prune #刪除所有未使用images

docker image prune -a #刪除所有images

```

## Container 互連

假設目前已有一個 container 叫 mysql，再來要開一個container叫server並讓server可以連到mysql，可用以下指令連接名為mysql的container

```sh
docker run -d -P --name server --link mysql:db server_image 
```

在 container server 內 host 使用 mysql 或 db 就可以連到 container mysql，可以用ping來做測試

```sh
ping db
ping mysql
```

可以在 /etc/hosts 這個檔案內看到相關的網路設定

## Volume

可以在dockerfile內指定路徑掛載匿名volume

```dockerfile
VOLUME /container_path
```

不過會被 docker run 的 -v 指令覆蓋，docker run 時可以用以下指令設定volume

```sh

docker run -v /opt -d image  #建立一個container時自動創立一個volume掛載到container的/opt路徑下

docker run -d -v host_path:/container_path image  #把主機的資料夾掛載到container中，讓container存入該資料夾的檔案可在主機上讀取

docker run -v volumeid:/opt -d image  #把已存在volume掛載到container的/opt路徑下，以後若移除這個container，還是可以透過把volume掛在新的container下volume中原有的檔案

docker run -d  --name containerB --volumes-from containerA imager  #建立一個 containerB 並使用 containerA 的 volume

```

要操作或創建volume可以用以下指令

```sh

docker volume ls  #列出host上的所有volume

docker volume create  #建立一個volume，會回傳volumeid

docker volume inspect volumename #查看volume的狀況，EX：主機上的路徑、容器中的路徑

docker inspect -f '{{.Mounts}}' container #查看某一個 container 的 volume 狀況

docker container inspect -f '{{ range .Mounts }}{{ .Name }}:{{ .Destination }} {{ end }}' container #查看某一個 container 的 volume 狀況

```



