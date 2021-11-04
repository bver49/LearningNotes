## Network

### Traceroute

#### 調查連接到某部主機時，經過的每個節點以及連線速度 

`traceroute google.com`

### Check port usage

#### Check specific port usage

`lsof -i :3000 | grep LISTEN`

#### List port usage

`lsof -PiTCP -sTCP:LISTEN`

`netstat -aep | grep ':\*'`

`netstat -ltunp`

#### Check remote host port usage

`nc -vz example.com.or.ip 80`

`telnet example.com.or.ip 80`

### Check DNS record

`nslookup example.com`

`dig example.com`

`host example.com`

## scp

#### 從遠端抓取檔案

`scp username@serverhost:/file/on/server /local/path`

`scp -r username@serverhost:/folder/on/server /local/path`

#### 複製檔案或資料夾到遠端

`scp localfile username@serverhost:/filename`


`scp -r localfolder username@serverhost:/foldername`

## Grep

### Find keyword in file

`grep keyword filename`

### Find keyword by command result

`some command | grep keyword`

## Edit

### Create file

`touch filename`

### Show file content

`cat filename`

### Append string into file

`cat >> filename`

## Disk

### Check disk usage

`df -h`

### Check file size in the directory

`du -hmd 1`

### Check sum of filesize in the directory

`du -sh`

## Process

### Check process

`ps aux`

`top`

### Kill process

`kill -9 PID`

## SSH

### Gen ssh key

ssh-keygen

### Send ssh key to remote server

ssh-copy-id username@host

## Timezone

ln -snf /usr/share/zoneinfo/Asia/Taipei /etc/localtime



