## 语法

根据使用的客户端，JSONPath 表达式以 `$.` 开头表示根元素。
某些客户端省略前导 `$.`。

| 语法 | 描述 |
| ------ | :--------- |
| `$.store.book[0].title` | |              
| `store.book[0].title` | 隐式 `$.` |
| `$['store']['book'][0]['title']` | 类似脚本语言的替代表示法 |

## 树遍历

| 语法 | 描述 |
| ------ | :--------- |
| `$.parentNode.childNode.field`       | XPath: `/parentNode/childNode/@field` ("parentNode" 的所有 "childNode" 的 "field" 内容) |
| `$..anyChildNode`                    | XPath: `//anyChildNode` (任意深度下所有名为 "anyChildNode" 的子节点) |
| `$.parentNode.*`                     | XPath: `/parentNode/*` (下面的所有子节点) |

## 数组访问

| 语法 | 描述 |
| ------ | :--------- |
| `$.myList[0]` | 第一个元素 |
| `$.myList[-1]` | 最后一个元素 |
| `$.myList[2:3]` | 范围 |
| `$.myList[0,4,5]` | 选择 |

## 过滤

| 语法 | 描述 |
| ------ | :--------- |
| `$.customer[?(@.car)]` |                       只有具有 "car" 属性的 "customer" |
| `$.customer[?(@.car == 'Ford Fiesta')]` |      只有拥有 "Ford Fiesta" 的 "customer" |
| `$.customer[?(@.age > 18)]` |                  只有成年人 |

## 复杂条件

| 语法 | 描述 |
| ------ | :--------- |
| `$.customer[?(@.age > 18 \|\| @.car == 'Ford Fiesta')]` |     逻辑或 |
| `$.customer[?(@.age < 18 && @.hobby == 'Biking' )]` |       逻辑与 |

## 输出映射

| 语法 | 描述 |
| ------ | :--------- |
| `$.[].{Name:name, Age:age, Hobbies:details.hobbies}` | 将字段/嵌套字段映射到新集合

## 致谢

原作者：https://gist.github.com/mackoj/5786f8b95da0a82e8e003f444c4295bf