## Docker指令

用image來建立container跑起特定服務

```sh

docker images  #查看現有的映像檔

docker ps #查看運行中的容器

docker ps -a #查看現有的容器，包含未運行的

docker run -d --name custom image command  #使用image 建立一個名字叫 custom 的container在背景啟動，啟動時執行command

docker run -it  image command   #使用image 建立一個container在前景啟動，啟動時執行command

docker rmi image  #移除image

docker rm -f container  #移除container

docker run -d -P image  #用image啟動container時自動連接container跟host的port  EX：分配host上的 3000 port 對應container的 5000port

docker run -d -p 80:5000 image  #用image啟動container時將host的80 port 對應到container的5000 port

docker run -d -p 127.0.0.1:80:5000 image  #用image啟動container時將host的127.0.0.1:80 port 對應到container的5000 port

docker run -d -P --name server --link db:linkalias image #用image建一個名字為server的container，並且連接名為db的container，並為這個link取一個別名

docker start/stop container  #啟動/暫停 container

docker exec -it container bash  #進入container

docker build -t  name:tag  .  #用dockerfile建立一份image，並給予image一個name與tag

docker rm $(docker ps -a -q)  #刪除所有container
 
```

## Dockerfile 指令

#設定映像檔的基底為ubuntu

FROM  ubuntu:trusty

#複製本地端檔案或資料夾到映像檔指定路徑中，可用ADD或COPY，用ADD的話若為壓縮檔 會自動解壓縮

ADD ./demo  /

#運行指令安裝套件等等

RUN echo x
  
#為RUN、CMD、ENTRYPOINT指定目錄

WORKDIR /tmp
  
#打開3000 PORT

EXPOSE 3000
  
#容器啟動時運行的指令

CMD ["command","params"]
