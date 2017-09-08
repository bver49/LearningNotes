## Docker指令

用image來建立container跑起特定服務

```sh
docker images  #查看現有的映像檔

docker ps  #查看運行中的容器

docker ps -a  #查看現有的容器，包含未運行的

docker run -d --name custom image command  #使用image 建立一個名字叫 custom 的container在背景啟動，啟動時執行command

docker rmi image  #移除image

docker rm -f  container  #移除container

docker run -d -P  image  #用image啟動container時自動連接container跟host的port  EX：分配host上的 3000 port 對應container的 5000port

docker run -d -p 80:5000 image  #用image啟動container時將host的80 port 對應到container的5000 port

docker run -d -p 127.0.0.1:80:5000 image  #用image啟動container時將host的127.0.0.1:80 port 對應到container的5000 port

docker run -d -P --name server --link db:linkalias image #用image建一個名字為server的container，並且連接名為db的container，並為這個link取一個別名

docker start/stop container   #啟動/暫停 container

docker exec -it container bash   #進入container
```
