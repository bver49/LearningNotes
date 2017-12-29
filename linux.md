## iptables

### Show rules

`iptables -L -n`

### Create rules

```sh
-i 封包所進入的網路介面，EX: eth0、lo
-A [OUTPUT|INPUT|FORWARD]
-p [tcp|udp|icmp|all]
-s 來源 IP
--sport 來源PORT範圍
-d 目標 IP
--dport 目標PORT範圍，EX: 1024:65535
-j [ACCEPT|DROP|REJECT|LOG]

```

### Reset iptables

Create file in `/etc/network/if-pre-up.d/iptables`

```sh

#!/bin/sh

# Reset iptables rules
iptables -F

iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# localhost
iptables -A INPUT -s 127.0.0.1 -p tcp -j ACCEPT

# Web
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# SSH
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Drop others
iptables -A INPUT -j DROP

```

`sudo chmod +x /etc/network/if-pre-up.d/iptables`

Then reboot

### Other

```sh

iptables -P INPUT   [ACCEPT|DROP]    
iptables -P OUTPUT  [ACCEPT|DROP]  
iptables -P FORWARD [ACCEPT|DROP]  
iptables -A INPUT -i lo -j [ACCEPT|DROP|REJECT|LOG]

```

## scp

#### 從遠端抓取檔案

`scp username@serverhost:/file/on/server /local/path`

`scp -r username@serverhost:/folder/on/server /local/path`

#### 複製檔案或資料夾到遠端

`scp localfile username@serverhost:/filename`


`scp -r localfolder username@serverhost:/foldername`

## traceroute

#### 調查連接到某部主機時，經過的每個節點以及連線速度 

`traceroute google.com`

## Check port usage

#### Check specific port usage

`lsof -i :3000 | grep LISTEN`

#### List port usage

`lsof -PiTCP -sTCP:LISTEN`

`netstat -aep | grep ':\*'`

### Check remote host port usage

`nc -vz example.com.or.ip 80`

`telnet example.com.or.ip 80`
