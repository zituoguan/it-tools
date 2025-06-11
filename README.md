## Docker 镜像重大变更

由于 *Docker 基础镜像* 现在为 `nginx-unpriviledged`，Docker 镜像现在监听 **8080** 端口，不再是 80。因此你需要更新端口映射，例如从 `8080:80` 改为 `8080:8080`。

### 在此查看这些变更： <https://sharevb-it-tools.vercel.app/> 或 <https://sharevb.github.io/it-tools/>

如果你想要使用包含我 PR 及其他更新的最新版 it-tools，可以在 docker-compose 文件中使用我的镜像，直到主分支更新为止。

- GitHub Action 会在每次推送到此分支时触发 - [查看包](https://github.com/sharevb/it-tools/pkgs/container/it-tools)

（感谢 [gitmotion](https://github.com/gitmotion/it-tools) 提供的 README fork 范本）

## 贡献者

非常感谢所有已经做出贡献的人们！

[![contributors](https://contrib.rocks/image?repo=sharevb/it-tools&refresh=1)](https://github.com/sharevb/it-tools/graphs/contributors)


## 新增功能

几乎包含 [it-tools 所有 PR](https://github.com/sharevb/it-tools/pulls)。

## Docker 镜像

[GitHub Container Registry](https://github.com/sharevb/it-tools/pkgs/container/it-tools)：`ghcr.io/sharevb/it-tools:latest`

[Docker Hub](https://hub.docker.com/r/sharevb/it-tools)：`sharevb/it-tools:latest`

## 推荐使用 HTTPS

一些工具（如 PGP 加密）依赖于 WebCrypto API，该 API 仅在 HTTPS/SSL 环境下可用。

因此，即使在内部安装中，你也可以使用 Let's Encrypt 通过 DNS 质询启用 HTTPS。

关于 DNS 质询的一些文档：
- https://medium.com/@life-is-short-so-enjoy-it/homelab-nginx-proxy-manager-setup-ssl-certificate-with-domain-name-in-cloudflare-dns-732af64ddc0b
- https://doc.traefik.io/traefik/user-guides/docker-compose/acme-dns/
- https://medium.com/@svenvanginkel/traefik-letsencrypt-dns01-challenge-with-ovhcloud-52f2a2c6d08a

## 在 Docker Compose 文件中使用

```yml
services:
  it-tools:
    container_name: it-tools
    image: sharevb/it-tools:latest
    pull_policy: always
    restart: unless-stopped
    ports:
      - 8080:8080
```

## 过滤工具并添加主页自定义内容

你可以通过挂载 `home.custom.md` 到 `/usr/share/nginx/html`，在主页添加自定义内容。

你也可以通过挂载 `tools-filter.json` 到 `/usr/share/nginx/html`，过滤可用工具。内容示例：
```json
{
  "excludeCategoryFilterRegex": "",
  "includeCategoryFilterRegex": "",
  "excludeToolsFilterRegex": "",
  "includeToolsFilterRegex": ""
}
```
Category 匹配英文分类名；Tools 匹配工具路径/URL。

详见 [docker-tools-filter-and-home-content](https://github.com/sharevb/it-tools)
## 使用自定义默认语言构建：

```
docker build -t it-tools-fr --build-arg VITE_LANGUAGE=fr .
docker run -d --name it-tools-fr --restart unless-stopped -p 8080:8080 it-tools-fr
```

## 为自定义子文件夹构建 Docker 镜像

参考 https://github.com/sharevb/it-tools/pull/461#issuecomment-1602506049 和 https://github.com/CorentinTh/it-tools/pull/461：
```
docker build -t it-tools  --build-arg BASE_URL="/my-folder/" .
docker run -d --name it-tools --restart unless-stopped -p 8080:8080 it-tools
```

然后访问 `http://localhost:8080` 会看到空白页，但在 DevTools 的 Network 标签页会发现应用尝试从 `/my-folder/...` 加载资源。

因此你需要在前面加一层服务器，如 [Nginx Proxy Manager](https://nginxproxymanager.com/)、[Traefik](https://traefik.io/traefik/)、[caddy](https://caddyserver.com/) 等，并设置 `/my-folder` 的反向代理。

## Docker Compose 以 `/it-tools/` 子文件夹托管

对于 `/it-tools/` 子文件夹，可以使用 `baseurl-it-tools` 标签。

参见 [docker-compose.yml 和 nginx.conf 示例](https://github.com/sharevb/it-tools/docker-subfolder-sample)，此镜像需要前置反向代理，如 [Nginx Proxy Manager](https://nginxproxymanager.com/)、[Traefik](https://traefik.io/traefik/)、[caddy](https://caddyserver.com/) 等。

设置 `/it-tools/` 的反向代理后，即可通过服务器的 `/it-tools/` 访问 it-tools。

运行示例：

```bash
git clone https://github.com/sharevb/it-tools
cd it-tools/docker-subfolder-sample/
docker compose up
```

然后访问 http://localhost:8080/it-tools/

## 使用自定义文件夹构建

1. `BASE_URL="/it-tools/" pnpm build`
2. 将生成的 `dist` 文件夹重命名为 `it-tools`，并部署到 `https://your-domain.com/it-tools`

## 为 GitHub Pages 构建

1. 在你的 fork 仓库中启用 GitHub Pages 构建和部署选项，路径为 **Settings** > **Pages**，然后选择 **GitHub Actions** 作为源。
2. 将以下 GitHub action 添加到你的仓库：https://github.com/sharevb/it-tools/.github/workflows/sharevb-github-pages-publish.yml

## 安装方式

本地安装需先安装：`python3 make g++`

| Docker 镜像                            | 本地安装                                                                                                          |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| GitHub Container Registry: <span title="triple click me!">`ghcr.io/sharevb/it-tools:latest`</span><br/>Docker Hub: <span title="triple click me!">`sharevb/it-tools:latest`</span> | <span title="triple click me!">`sudo apt-get install python3 make g++ && git clone -b chore/all-my-stuffs https://github.com/sharevb/it-tools.git && cd it-tools/ && pnpm i && pnpm dev`</span> |
| 替换你当前的镜像为此镜像 | 复制粘贴一键安装命令（来自 github 仓库） |
| 可能需要清除缓存并强制刷新以加载新功能 | 首次安装依赖包可能需要一些时间，请耐心等待 |

<picture>
    <source srcset="./.github/logo-dark.png" media="(prefers-color-scheme: light)">
    <source srcset="./.github/logo-white.png" media="(prefers-color-scheme: dark)">
    <img src="./.github/logo-dark.png" alt="logo">
</picture>

<details>

为开发者和 IT 从业者提供实用工具。[点此体验！](https://sharevb-it-tools.vercel.app)。

## 功能与路线图

请查看 [issues](https://github.com/sharevb/it-tools/issues) 了解待实现的功能。

有新工具想法？欢迎提交 [功能请求](https://github.com/sharevb/it-tools/issues/new/choose)！

## 自托管

适合你的 homelab 的自托管方案

**Docker Hub 镜像：**

```sh
docker run -d --name it-tools --restart unless-stopped -p 8080:8080 corentinth/it-tools:latest
```

**GitHub Packages 镜像：**

```sh
docker run -d --name it-tools --restart unless-stopped -p 8080:8080 ghcr.io/corentinth/it-tools:latest
```

**其他方案：**

- [Cloudron](https://www.cloudron.io/store/tech.ittools.cloudron.html)
- [Tipi](https://www.runtipi.io/docs/apps-available)
- [Unraid](https://unraid.net/community/apps?q=it-tools)

## 贡献

### 推荐的 IDE 设置

建议使用 [VSCode](https://code.visualstudio.com/) 并安装以下扩展：

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并禁用 Vetur）
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)

推荐设置如下：

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "i18n-ally.localesPaths": ["locales", "src/tools/*/locales"],
  "i18n-ally.keystyle": "nested"
}
```

### `.vue` 文件在 TS 中的类型支持

TypeScript 默认无法处理 `.vue` 导入的类型信息，因此需用 `vue-tsc` 替代 `tsc` 进行类型检查。编辑器中需安装 [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) 以支持 `.vue` 类型。

如果独立 TypeScript 插件速度不够快，Volar 还实现了更高效的 [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)。启用方法：

1. 禁用内置 TypeScript 扩展
   1. 在命令面板运行 `Extensions: Show Built-in Extensions`
   2. 找到 `TypeScript and JavaScript Language Features`，右键选择 `Disable (Workspace)`
2. 在命令面板运行 `Developer: Reload Window` 重载窗口

### 项目初始化

```sh
pnpm install
```

### 开发环境编译与热重载

```sh
pnpm dev
```

### 生产环境类型检查、编译与压缩

```sh
pnpm build
```

### 使用 [Vitest](https://vitest.dev/) 运行单元测试

```sh
pnpm test
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
pnpm lint
```

### 创建新工具

可通过脚本生成新工具模板，命令如下：

```sh
pnpm run script:create:tool my-tool-name
```

会在 `src/tools` 下创建对应目录和文件，并自动导入到 `src/tools/index.ts`。你只需将其添加到合适的分类并开发即可。

## 贡献者

感谢所有已参与贡献的朋友！

[![contributors](https://contrib.rocks/image?repo=corentinth/it-tools&refresh=1)](https://github.com/sharevb/it-tools/graphs/contributors)

## 鸣谢

由 [Corentin Thomasset](https://corentin.tech?utm_source=it-tools&utm_medium=readme) ❤️ 编写。

本项目通过 [vercel.com](https://vercel.com) 持续部署。

贡献者图由 [contrib.rocks](https://contrib.rocks/preview?repo=corentinth/it-tools) 生成。

<a href="https://www.producthunt.com/posts/it-tools?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-it&#0045;tools" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=345793&theme=light" alt="IT&#0032;Tools - Collection&#0032;of&#0032;handy&#0032;online&#0032;tools&#0032;for&#0032;devs&#0044;&#0032;with&#0032;great&#0032;UX | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
<a href="https://www.producthunt.com/posts/it-tools?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-it&#0045;tools" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=345793&theme=light&period=daily" alt="IT&#0032;Tools - Collection&#0032;of&#0032;handy&#0032;online&#0032;tools&#0032;for&#0032;devs&#0044;&#0032;with&#0032;great&#0032;UX | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

## 许可证

本项目采用 [GNU GPLv3](LICENSE) 协议。

</details>
