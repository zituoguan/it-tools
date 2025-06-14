| 选择器                  | 示例                      | 示例描述                                                                                      |
|-------------------------|---------------------------|-----------------------------------------------------------------------------------------------|
| `.class`                | `.intro`                  | 选择所有 class="intro" 的元素                                                                 |
| `.class1.class2`        | `.name1.name2`            | 选择 class 属性同时包含 name1 和 name2 的所有元素                                             |
| `.class1 .class2`       | `.name1 .name2`           | 选择 class 包含 name1 的元素的所有后代中 class 包含 name2 的元素                              |
| `#id`                   | `#firstname`              | 选择 id="firstname" 的元素                                                                    |
| `*`                     | `*`                       | 选择所有元素                                                                                  |
| `element`               | `p`                       | 选择所有 \<p\> 元素                                                                           |
| `element.class`         | `p.intro`                 | 选择所有 class="intro" 的 \<p\> 元素                                                          |
| `element,element`       | `div, p`                  | 选择所有 \<div\> 元素和所有 \<p\> 元素                                                        |
| `element element`       | `div p`                   | 选择所有在 \<div\> 元素内的 \<p\> 元素                                                        |
| `element>element`       | `div > p`                 | 选择父元素为 \<div\> 的所有 \<p\> 元素                                                        |
| `element+element`       | `div + p`                 | 选择紧跟在 \<div\> 元素之后的第一个 \<p\> 元素                                                |
| `element1~element2`     | `p ~ ul`                  | 选择所有在 \<p\> 元素之后的兄弟 \<ul\> 元素                                                   |
| `[attribute]`           | `[target]`                | 选择所有带有 target 属性的元素                                                                |
| `[attribute=value]`     | `[target="_blank"]`       | 选择所有 target 属性值为 "_blank" 的元素                                                      |
| `[attribute~=value]`    | `[title~="flower"]`       | 选择 title 属性包含单词 "flower" 的所有元素                                                   |
| `[attribute\|=value]`   | `[lang\|="en"]`           | 选择 lang 属性值等于 "en" 或以 "en-" 开头的所有元素                                           |
| `[attribute^=value]`    | `a[href^="https"]`        | 选择 href 属性值以 "https" 开头的所有 \<a\> 元素                                              |
| `[attribute$=value]`    | `a[href$=".pdf"]`         | 选择 href 属性值以 ".pdf" 结尾的所有 \<a\> 元素                                               |
| `[attribute*=value]`    | `a[href*="w3schools"]`    | 选择 href 属性值包含 "w3schools" 子串的所有 \<a\> 元素                                        |
| `:active`               | `a:active`                | 选择当前激活的链接                                                                            |
| `::after`               | `p::after`                | 在每个 \<p\> 元素内容之后插入内容                                                            |
| `::before`              | `p::before`               | 在每个 \<p\> 元素内容之前插入内容                                                            |
| `:checked`              | `input:checked`           | 选择所有已选中的 \<input\> 元素                                                              |
| `:default`              | `input:default`           | 选择默认的 \<input\> 元素                                                                    |
| `:disabled`             | `input:disabled`          | 选择所有被禁用的 \<input\> 元素                                                              |
| `:empty`                | `p:empty`                 | 选择没有子元素（包括文本节点）的 \<p\> 元素                                                   |
| `:enabled`              | `input:enabled`           | 选择所有可用的 \<input\> 元素                                                                |
| `:first-child`          | `p:first-child`           | 选择作为其父元素第一个子元素的所有 \<p\> 元素                                                 |
| `::first-letter`        | `p::first-letter`         | 选择每个 \<p\> 元素的首字母                                                                  |
| `::first-line`          | `p::first-line`           | 选择每个 \<p\> 元素的首行                                                                    |
| `:first-of-type`        | `p:first-of-type`         | 选择作为其父元素中第一个 \<p\> 元素的所有 \<p\> 元素                                          |
| `:focus`                | `input:focus`             | 选择获得焦点的输入元素                                                                       |
| `:fullscreen`           | `:fullscreen`             | 选择处于全屏模式的元素                                                                       |
| `:has()`                | `h2:has(+p)`              | 选择后面紧跟 \<p\> 元素的 h2 元素，并将样式应用于 h2                                          |
| `:hover`                | `a:hover`                 | 选择鼠标悬停时的链接                                                                          |
| `:in-range`             | `input:in-range`          | 选择值在指定范围内的输入元素                                                                 |
| `:indeterminate`        | `input:indeterminate`     | 选择处于不确定状态的输入元素                                                                 |
| `:invalid`              | `input:invalid`           | 选择所有值无效的输入元素                                                                     |
| `:lang()`               | `p:lang(it)`              | 选择 lang 属性等于 "it"（意大利语）的所有 \<p\> 元素                                         |
| `:last-child`           | `p:last-child`            | 选择作为其父元素最后一个子元素的所有 \<p\> 元素                                               |
| `:last-of-type`         | `p:last-of-type`          | 选择作为其父元素中最后一个 \<p\> 元素的所有 \<p\> 元素                                        |
| `:link`                 | `a:link`                  | 选择所有未访问的链接                                                                          |
| `::marker`              | `::marker`                | 选择列表项的标记符                                                                            |
| `:not()`                | `:not(p)`                 | 选择所有不是 \<p\> 元素的元素                                                                |
| `:nth-child()`          | `p:nth-child(2)`          | 选择作为其父元素第二个子元素的所有 \<p\> 元素                                                 |
| `:nth-last-child()`     | `p:nth-last-child(2)`     | 选择作为其父元素倒数第二个子元素的所有 \<p\> 元素                                             |
| `:nth-last-of-type()`   | `p:nth-last-of-type(2)`   | 选择作为其父元素中倒数第二个 \<p\> 元素的所有 \<p\> 元素                                      |
| `:nth-of-type()`        | `p:nth-of-type(2)`        | 选择作为其父元素中第二个 \<p\> 元素的所有 \<p\> 元素                                          |
| `:only-of-type`         | `p:only-of-type`          | 选择作为其父元素中唯一一个 \<p\> 元素的所有 \<p\> 元素                                        |
| `:only-child`           | `p:only-child`            | 选择作为其父元素唯一子元素的所有 \<p\> 元素                                                   |
| `:optional`             | `input:optional`          | 选择没有 "required" 属性的输入元素                                                            |
| `:out-of-range`         | `input:out-of-range`      | 选择值超出指定范围的输入元素                                                                 |
| `::placeholder`         | `input::placeholder`      | 选择带有 "placeholder" 属性的输入元素                                                        |
| `:read-only`            | `input:read-only`         | 选择带有 "readonly" 属性的输入元素                                                           |
| `:read-write`           | `input:read-write`        | 选择没有 "readonly" 属性的输入元素                                                           |
| `:required`             | `input:required`          | 选择带有 "required" 属性的输入元素                                                           |
| `:root`                 | `:root`                   | 选择文档的根元素                                                                             |
| `::selection`           | `::selection`             | 选择被用户选中的元素部分                                                                     |
| `:target`               | `#news:target`            | 选择当前活动的 #news 元素（点击包含该锚点的 URL 后）                                         |
| `:valid`                | `input:valid`             | 选择所有值有效的输入元素                                                                     |
| `:visited`              | `a:visited`               | 选择所有已访问的链接                                                                          |