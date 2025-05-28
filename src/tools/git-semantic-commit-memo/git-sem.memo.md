# 语义化提交信息

了解对提交信息风格进行微小更改如何能让您成为一名更好的程序员。

格式：`<类型>(<范围>): <主题>`

`<范围>` 是可选的

## 示例

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> 摘要，使用现在时。
|
+-------> 类型：chore、docs、feat、fix、refactor、style 或 test。
```

更多示例：

- `feat`: (为用户添加的新功能，而不是为构建脚本添加的新功能)
- `fix`: (为用户修复的 bug，而不是修复构建脚本)
- `docs`: (对文档的更改)
- `style`: (格式化、缺少分号等；不更改生产代码)
- `refactor`: (重构生产代码，例如重命名变量)
- `test`: (添加缺失的测试、重构测试；不更改生产代码)
- `chore`: (更新 grunt 任务等；不更改生产代码)

参考资料：

- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html