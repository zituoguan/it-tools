# Kubernetes

* PDF: https://sematext.com/kubernetes-cheat-sheet/
* 官网: https://kubernetes.io/
* 文档: https://kubernetes.io/docs/home

## 客户端配置

* 在bash中设置自动完成；需要先安装bash-completion包
```
source <(kubectl completion bash)
```

* 查看Kubernetes配置
```
kubectl config view
```

* 通过json路径查看特定配置项
```
kubectl config view -o jsonpath='{.users[?(@.name == "k8s")].user.password}'
```

* 为`foo.kuberntes.com`设置凭据
```
kubectl config set-credentials kubeuser/foo.kubernetes.com --username=kubeuser --password=kubepassword
```

* 设置活动命名空间
```
kubectl config set-context --current --namespace=namespace_name
```

## 查看、查找资源

* 列出命名空间中的所有服务
```
kubectl get services
```

* 以宽格式列出所有命名空间中的所有pod
```
kubectl get pods -o wide --all-namespaces
```

* 以json（或yaml）格式列出所有pod
```
kubectl get pods -o json
```

* 描述资源详情（node、pod、svc）
```
kubectl describe nodes my-node
```

* 按名称排序列出服务
```
kubectl get services --sort-by=.metadata.name
```

* 按重启次数排序列出pod
```
kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'
```

* 对frontend-v1进行滚动更新
```
kubectl rolling-update frontend-v1 -f frontend-v2.json
```

* 将名为'foo'的副本集扩展到3个
```
kubectl scale --replicas=3 rs/foo
```

* 将"foo.yaml"中指定的资源扩展到3个
```
kubectl scale --replicas=3 -f foo.yaml
```

* 在每个pod/副本中执行命令
```
for i in 0 1; do kubectl exec foo-$i -- sh -c 'echo $(hostname) > /usr/share/nginx/html/index.html'; done
```

## 管理资源

* 获取pod或服务的文档
```
kubectl explain pods,svc
```

* 创建资源，如pods、services或daemonsets
```
kubectl create -f ./my-manifest.yaml
```

* 将配置应用到资源
```
kubectl apply -f ./my-manifest.yaml
```

* 启动单个Nginx实例
```
kubectl run nginx --image=nginx
```

* 创建包含多个键的secret
```
cat <<EOF | kubectl create -f -
apiVersion: v1
kind: Secret
metadata:
 name: mysecret
type: Opaque
data:
 password: $(echo "s33msi4" | base64)
 username: $(echo "jane"| base64)
EOF
```

* 删除资源
```
kubectl delete -f ./my-manifest.yaml
```

## 监控和日志

* 从Github仓库部署Heapster
```
kubectl create -f deploy/kube-config/standalone/
```

* 显示节点指标
```
kubectl top node
```

* 显示pod指标
```
kubectl top pod
```

* 显示给定pod及其容器的指标
```
kubectl top pod pod_name --containers
```

* 导出pod日志（stdout）
```
kubectl logs pod_name
```

* 流式输出pod容器日志（stdout，多容器情况）
```
kubectl logs -f pod_name -c my-container
```

## 与运行中的pod交互

* 在pod中运行命令
```
kubectl exec pod_name -- command_name
```

* 在具有多个容器的pod中运行命令
```
kubectl exec pod_name -c container_name -- command_name
```

* 获取pod的终端
```
kubectl exec -it pod_name /bin/sh
```

* 获取在具有多个容器的pod中运行的容器的终端
```
kubectl exec -it pod_name -c container_name /bin/sh
```

### 致谢

https://raw.githubusercontent.com/LeCoupa/awesome-cheatsheets/refs/heads/master/tools/kubernetes.md