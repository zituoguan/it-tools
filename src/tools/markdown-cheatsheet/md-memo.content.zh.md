---
layout: default
title: Markdown 语法速查表
description: Markdown 语法的快速参考指南。
last_modified_at: 2021-12-05
---

## 概述

这个 Markdown 语法速查表提供了所有 Markdown 语法元素的快速概览。它无法涵盖所有边缘情况，如果您需要关于这些元素的更多信息，请参考<n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/">基础语法</n-a>和<n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/">扩展语法</n-a>的参考指南。

## 基础语法

这些是 John Gruber 原始设计文档中概述的元素。所有 Markdown 应用程序都支持这些元素。

<n-table :single-line="false">
  <thead>
    <tr>
      <th>元素</th>
      <th>Markdown 语法</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#headings">标题</n-a></td>
      <td><code># H1<br>
          ## H2<br>
          ### H3</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#bold">粗体</n-a></td>
      <td><code>**粗体文本**</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#italic">斜体</n-a></td>
      <td><code>*斜体文本*</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#blockquotes-1">引用</n-a></td>
      <td><code>> 引用文本</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#ordered-lists">有序列表</n-a></td>
      <td><code>
        1. 第一项<br>
        2. 第二项<br>
        3. 第三项<br>
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#unordered-lists">无序列表</n-a></td>
      <td>
        <code>
          - 第一项<br>
          - 第二项<br>
          - 第三项<br>
        </code>
      </td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#code">代码</n-a></td>
      <td><code>`代码`</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#horizontal-rules">水平分割线</n-a></td>
      <td><code>---</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#links">链接</n-a></td>
      <td><code>[标题](https://www.example.com)</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/basic-syntax/#images-1">图片</n-a></td>
      <td><code>![替代文本](image.jpg)</code></td>
    </tr>
  </tbody>
</n-table>

## 扩展语法

这些元素通过添加额外功能来扩展基础语法。并非所有 Markdown 应用程序都支持这些元素。

<n-table :single-line="false">
  <thead>
    <tr>
      <th>元素</th>
      <th>Markdown 语法</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#tables">表格</n-a></td>
      <td><code>
          | 语法        | 描述        |<br>
          | ----------- | ----------- |<br>
          | 标题        | 标题内容    |<br>
          | 段落        | 文本内容    |
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#fenced-code-blocks">围栏代码块</n-a></td>
      <td><code>```<br>
      {<br>
      &nbsp;&nbsp;"firstName": "John",<br>
      &nbsp;&nbsp;"lastName": "Smith",<br>
      &nbsp;&nbsp;"age": 25<br>
      }<br>
      ```
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#footnotes">脚注</n-a></td>
      <td><code>
        这是一个带脚注的句子。[^1]<br><br>
        [^1]: 这是脚注内容。
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#heading-ids">标题 ID</n-a></td>
      <td><code>### 我的标题 {#custom-id}</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#definition-lists">定义列表</n-a></td>
      <td><code>
        术语<br>
        : 定义
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#strikethrough">删除线</n-a></td>
      <td><code>~~地球是平的。~~</code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#task-lists">任务列表</n-a></td>
      <td><code>
        - [x] 写新闻稿<br>
        - [ ] 更新网站<br>
        - [ ] 联系媒体
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#emoji">表情符号</n-a><br>(另请参阅 <n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji">复制和粘贴表情符号</n-a>)</td>
      <td><code>
        太有趣了！:joy:
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#highlight">高亮</n-a></td>
      <td><code>
        我需要高亮这些==非常重要的词语==。
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#subscript">下标</n-a></td>
      <td><code>
        H~2~O
      </code></td>
    </tr>
    <tr>
      <td><n-a target="_blank" href="https://www.markdownguide.org/extended-syntax/#superscript">上标</n-a></td>
      <td><code>
        X^2^
      </code></td>
    </tr>
  </tbody>
</n-table>