Docker 提供了将应用程序打包并在称为容器的松散隔离环境中运行的能力。隔离性和安全性允许你在同一主机上同时运行多个容器。容器非常轻量，包含运行应用所需的一切，因此无需依赖主机上已安装的内容。你可以轻松地在协作时共享容器，并确保每个人获得的容器都是一致且可用的。

## 安装

## 常用命令

Docker Desktop 可用于 Mac、Linux 和 Windows：https://docs.docker.com/desktop

查看使用 Docker 的示例项目：

https://github.com/docker/awesome-compose

查阅官方文档了解更多 Docker 用法：https://docs.docker.com

## 镜像

Docker 镜像是包含运行应用所需一切内容（代码、运行时、系统工具、系统库和设置）的轻量级、独立、可执行软件包。

从 Dockerfile 构建镜像：

```bash
docker build -t <image_name> .
```

不使用缓存从 Dockerfile 构建镜像：

```bash
docker build -t <image_name> . --no-cache
```

列出本地镜像：

```bash
docker images
```

删除镜像：

```bash
docker rmi <image_name>
```

移除所有未使用的镜像：

```bash
docker image prune
```

## Docker Hub

Docker Hub 是 Docker 提供的用于查找和分享容器镜像的服务。了解更多并查找镜像：https://hub.docker.com

登录 Docker：

```bash
docker login -u <username>
```

将镜像发布到 Docker Hub：

```bash
docker push <username>/<image_name>
```

在 Hub 上搜索镜像：

```bash
docker search <image_name>
```

从 Docker Hub 拉取镜像：

```bash
docker pull <image_name>
```

启动 docker 守护进程：

```bash
docker -d
```

获取 Docker 帮助。所有子命令也可加 -help：

```bash
docker --help
```

显示系统范围信息：

```bash
docker info
```

## 容器

容器是 docker 镜像的运行时实例。无论基础设施如何，容器的运行方式始终一致。容器将软件与环境隔离，确保其在开发和测试等不同环境下都能一致运行。

从镜像创建并运行容器，并自定义容器名：

```bash
docker run --name <container_name> <image_name>
```

运行容器并将容器端口映射到主机端口：

```bash
docker run -p <host_port>:<container_port> <image_name>
```

后台运行容器：

```bash
docker run -d <image_name>
```

启动或停止已存在的容器：

```bash
docker start|stop <container_name>（或 <container-id>）
```

删除已停止的容器：

```bash
docker rm <container_name>
```

进入正在运行的容器的 shell：

```bash
docker exec -it <container_name> sh
```

获取并跟踪容器日志：

```bash
docker logs -f <container_name>
```

查看正在运行的容器详细信息：

```bash
docker inspect <container_name>（或 <container_id>）
```

列出当前正在运行的容器：

```bash
docker ps
```

列出所有容器（包括运行中和已停止的）：

```bash
docker ps --all
```

查看资源使用情况统计：

```bash
docker container stats
```