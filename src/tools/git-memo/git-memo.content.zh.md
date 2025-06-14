## 配置

设置全局配置

```shell
git config --global user.name "[name]"
git config --global user.email "[email]"
```

## 开始使用

创建一个 git 仓库

```shell
git init
```

克隆现有的 git 仓库

```shell
git clone [url]
```

## 提交

提交所有已跟踪的更改

```shell
git commit -am "[commit message]"
```

将新的修改添加到最后一次提交

```shell
git commit --amend --no-edit
```

## 分支

列出仓库中的所有本地分支（使用 -a 显示本地和远程分支）

```shell
git branch
```

切换到现有分支

```shell
git switch [branch name]
```

创建新分支

```shell
git checkout -b [branch name]
```

## 我犯了错误

更改最后一次提交消息

```shell
git commit --amend
```

撤销最近的提交并保留更改

```shell
git reset HEAD~1
```

撤销最近的 `N` 次提交并保留更改

```shell
git reset HEAD~N
```

撤销最近的提交并丢弃更改

```shell
git reset HEAD~1 --hard
```

将分支重置为远程状态

```shell
git fetch origin
git reset --hard origin/[branch-name]
```

## 其他

将本地 master 分支重命名为 main

```shell
git branch -m master main
```

查看日志图形
```shell
git log --graph
```

查看日志图形（仅合并）

```shell
git log --graph --merges
```

使用二分查找追踪有问题的提交

```shell
git bisect start
git bisect good 13c988d4f15e06bcdd0b0af290086a3079cdadb0
git bisect bad ca82a6dff817ec66f44342007202690a93763949
```

从主线分支将新更改拉取到当前分支

```shell
git checkout [branch-name]
git fetch origin [master-branch-name]
git rebase origin/[master-branch-name]
```

