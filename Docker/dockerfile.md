## Dockerfile

```dockerfile

#設定映像檔的基底為ubuntu

FROM  ubuntu:trusty

#是build時候可以從外部以--build-arg引入的變數 EX: docker build --build-arg SOME_VARIBLE=some_value .

ARG SOME_VARIBLE

#設定環境變數

ENV NODE_ENV production 

#複製本地端檔案或資料夾到映像檔指定路徑中，可用ADD或COPY，用ADD的話可為URL或壓縮檔，若為壓縮檔 會自動解壓縮

ADD ./demo  /tmp

COPY ./demo /tmp

#執行run指令時會創建一個Volume掛載到容器/opt路徑下

VOLUME /opt

#運行終端指令安裝套件等等

RUN echo x
  
#切換RUN、CMD、ENTRYPOINT等指令執行的目錄

WORKDIR /tmp
  
#打開3000 PORT

EXPOSE 3000
  
#容器啟動時運行的指令

CMD ["command","params"]

```
