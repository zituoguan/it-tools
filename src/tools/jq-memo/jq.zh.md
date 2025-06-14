# 使用 jq 处理 JSON

jq 用于切片、过滤、映射和转换结构化的 json 数据。

## 安装 jq

### 在 Mac OS 上

`brew install jq`

### 在 AWS Linux 上

在我们当前的 AMI 上无法通过 yum install 安装。不过在最新的 AMI 上应该可以：https://aws.amazon.com/amazon-linux-ami/2015.09-release-notes/

从源码安装被证明是棘手的。

## 有用的参数

运行 jq 时，以下参数可能会很有用：

| 参数        |  描述  |
| ------ | :--------- |
| `--version`| 输出 jq 版本并以零退出。 |
| `--sort-keys` | 按键排序输出每个对象的字段。|

## 基本概念

jq 的语法非常一致：

| 语法  |  描述  |
| ------ | :--------- |
| , | 用逗号分隔的过滤器将产生多个独立的输出|
| ? | 如果类型不符预期将忽略错误 |
| [] | 数组构造 |
| {} | 对象构造 |
| + | 连接或相加 |
| - | 集合差异或相减 |
| length | 所选元素的大小 |
| &#124; | 管道用于以类似 bash 的方式链接命令|


## 处理 json 对象

| 描述 | 命令 |
| ------ | :--------- |
| 显示所有键 | `jq 'keys'` |
| 对所有项目加 1 | `jq 'map_values(.+1)'` |
| 删除一个键| `jq 'del(.foo)'` |
| 将对象转换为数组 | `to_entries &#124; map([.key, .value])` |

## 处理字段

| 描述 | 命令 |
| ------ | :--------- |
| 连接两个字段| `fieldNew=.field1+' '+.field2` |


## 处理 json 数组

### 切片和过滤

| 描述 | 命令 |
| ------ | :--------- |
| 全部 | `jq .[]` |
| 第一个 |	`jq '.[0]'` |
| 范围 | `jq '.[2:4]'` |
| 前 3 个 | `jq '.[:3]'` |
| 后 2 个 | `jq '.[-2:]'` |
| 倒数第二个 | `jq '.[-2]'`|
| 按值选择整数数组 | `jq 'map(select(. >= 2))'` |
| 按值选择对象数组| `jq '.[] &#124; select(.id == "second")'` |
| 按类型选择 | `jq '.[] &#124; numbers'` 其中类型包括 arrays, objects, iterables, booleans, numbers, normals, finites, strings, nulls, values, scalars |

### 映射和转换

| 描述 | 命令 |
| ------ | :--------- |
| 对所有项目加 1 | `jq 'map(.+1)'` |
| 删除 2 个项目| `jq 'del(.[1, 2])'` |
| 连接数组 | `jq 'add'` |
| 展平数组 | `jq 'flatten'` |
| 创建数字范围 | `jq '[range(2;4)]'` |
| 显示每个项目的类型| `jq 'map(type)'` |
| 排序基本类型数组| `jq 'sort'` |
| 排序对象数组 | `jq 'sort_by(.foo)'` |
| 按键分组 - 与展平相反 | `jq 'group_by(.foo)'` |
| 数组的最小值| `jq 'min'` 另见 min, max, min_by(path_exp),
| Remove duplicates| `jq 'unique'` or `jq 'unique_by(.foo)'` or `jq 'unique_by(length)'` |
| Reverse an array | `jq 'reverse'` |