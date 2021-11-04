#!/bin/bash

if [ `whoami` = root ]
then
    # clear ipTables
    iptables -F
    iptables -X
    iptables -t nat -F
    iptables -t nat -X
    iptables -t mangle -F
    iptables -t mangle -X
    iptables -P INPUT ACCEPT
    iptables -P FORWARD ACCEPT
    iptables -P OUTPUT ACCEPT

    # start setting
    iptables -A INPUT -i lo -j ACCEPT

    # 127.0.0.1 accept local request 接受local主動丟出的封包
    iptables -A INPUT -m state --state ESTABLISHED,RELATED,UNTRACKED -j ACCEPT

    # 對TCP/UDP連接不启用追蹤，解决nf_contrack滿導致無法連接的問題
    iptables -t raw -A PREROUTING -p tcp --dport 80 -j NOTRACK
    iptables -t raw -A OUTPUT -p tcp --sport 80 -j NOTRACK

    # 開放特定port
    iptables -A INPUT -p tcp --dport ssh -j ACCEPT
    iptables -A INPUT -p tcp --dport 80  -j ACCEPT
    iptables -A INPUT -p tcp --dport 443 -j ACCEPT
    iptables -A INPUT -p icmp -j ACCEPT
  
    # 開放特定的port給某個ip
    iptables -A INPUT -p tcp --dport 9000 -s 123.123.123.123 -j ACCEPT
    
    # 開放特定範圍的port 
    iptables -A INPUT -p tcp --dport 10090:10100 -j ACCEPT

    # deny all input
    iptables -P INPUT DROP
    
    # 阻擋特定 ip 的連線
    iptables -I INPUT -s 123.123.123.123 -j DROP
    
    # 阻擋特定 ip 連到特定 port
    iptables -I INPUT --dport 9000 -s 123.123.123.123 -j DROP

    # accept all output
    iptables -P OUTPUT ACCEPT

    # show all settings
    iptables -L
else
    echo "please use root"
fi
