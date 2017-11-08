# Rancher

Rancher 是用來管理docker container的工具

## 指定container要在哪個host執行

- host上須先設定一組label，ex: name=hostA
- 跑起service時透過label來指定要跑service的host
- `io.rancher.scheduler.affinity:host_label  name=hostA`
