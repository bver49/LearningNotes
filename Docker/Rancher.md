# Rancher

Rancher 是用來管理 docker container 的工具

## 指定container要在哪個 Host 執行

- `Host` 上須先設定一組 `label`，`ex: name=hostA`
- 建立 `container` 時在 `label` 設定中加入 `io.rancher.scheduler.affinity:host_label  name=hostA`，來指定要跑 `container` 的 `host`
- 也可以透過 `scheduleing` 設定 `container` 選擇 `host` 的條件

## 讓 Scale 的 Container 不建立在同一個 Host 上 

- 建立 `container` 時在 `label` 設定中加入 `io.rancher.scheduler.affinity:container_label_ne: io.rancher.stack_service.name=$${stack_name}/$${service_name}`
