```yml
version: "2"
services:
  server:
      build: ./server
      expose:
        - "3000"
      links:
        - db
      ports:
        - "3000:3000"
  db:
      image: mysql
      command:
        - mysqld
        - --character-set-server=utf8mb4
        - --collation-server=utf8mb4_unicode_ci
      environment:
        MYSQL_ROOT_PASSWORD: secret_password
      volumes:
        - /hoset_path:/container_path
```
