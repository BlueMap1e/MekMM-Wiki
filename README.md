# MekMM Wiki

「通用机械:更多机器(Mekanism: More Machine)」的中文百科,基于 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 构建,部署在 Cloudflare Pages。

- 在线地址:https://mekmm-wiki.pages.dev
- 模组仓库:[lostmyself8/Mekanism-MoreMachine](https://github.com/lostmyself8/Mekanism-MoreMachine)
- 本站源码:https://github.com/BlueMap1e/MekMM-Wiki

## 本地开发

环境要求:Node.js ≥ 18.17(推荐 22 LTS,仓库内有 `.nvmrc`)、Git。

```bash
npm install      # 安装依赖(首次)
npm run dev      # 开发服务器 → http://localhost:4321,热更新
npm run build    # 构建到 dist/,发布前先跑一遍验证
npm run preview  # 本地预览构建产物
```

> Hexo 用户速查:`hexo server` ≈ `npm run dev`;`hexo generate` ≈ `npm run build`;`hexo deploy` ≈ `git push`(云端自动构建,不再需要部署命令)。

## 目录结构

```
├── astro.config.mjs         # 站点配置:标题、侧边栏、主题、编辑链接
├── src/
│   ├── content.config.ts    # 内容集合定义(frontmatter 在这里校验)
│   ├── content/docs/        # ★ 所有条目都在这里,文件路径 = 链接路径
│   │   ├── index.mdx        # 首页
│   │   ├── guides/          # 指南类条目
│   │   └── machines/        # 机器条目
│   ├── components/          # 自定义组件(条目里 import 即用,文件需 .mdx)
│   └── styles/custom.css    # 主题色等样式覆盖
└── public/                  # 静态资源(favicon 等)
```

## 如何写条目

在 `src/content/docs/` 下创建 `.md`(纯 Markdown)或 `.mdx`(需要用组件时)文件。frontmatter 常用字段:

```md
---
title: 条目标题(侧边栏与页面大标题)
description: 一句话简介,进搜索索引与 meta 描述
---
```

侧边栏由 `astro.config.mjs` 里的 `sidebar` 按目录自动生成(`autogenerate`),新建文件即自动上架,不用登记。

### 好用的语法

- 提示框:`:::note[标题] … :::`(还有 `tip` / `caution` / `danger`)
- 代码块带复制按钮、表格、脚注均开箱即用
- 中文搜索:内建 Pagefind,构建时自动生成索引,无需配置

### 修改主题

- 全站强调色:`src/styles/custom.css`,覆盖 `--sl-color-accent*` 变量
- 新组件:放 `src/components/`,条目顶部 `import` 后直接当 HTML 标签用

## 部署与日常运维(Cloudflare Pages)

原理:GitHub 仓库 `main` 分支有任何 push → Cloudflare 自动执行 `npm run build` → 产物发布到全球 CDN。本地不需要任何部署命令。

- 生产分支:`main`
- 构建命令:`npm run build`(面板选框架预设 Astro 自动填)
- 输出目录:`dist`

### 日常发布

```bash
git add -A && git commit -m "说明改动" && git push
```

一两分钟后自动上线。发布前的保险:本地先跑 `npm run build`,能过基本就不会挂。

### 预览部署

push 到**非 main 分支**会得到独立的预览 URL,不影响正式站;把分支合进 main 才会更新线上。适合大改动、拿不准的排版先开分支试。

### 构建日志与回滚

Cloudflare Dashboard → Workers & Pages → MekMM-Wiki → **Deployments**:

- 点任意一次部署可看完整构建日志,报错都在这里
- 历史部署右侧菜单 **Rollback** 可一键回滚线上版本(不回滚代码,修好 bug 再 push 即可)

### 构建失败怎么办

1. 本地 `npm run build` 复现报错;
2. 常见原因:frontmatter 字段拼错、`.mdx` 里把 `<`、`{}` 当正文写(MDX 会当组件/表达式解析,普通写法请用 `.md`);
3. 构建失败不会影响线上旧版本,放心修。

### 绑定自定义域名(可选)

Pages 项目 → **Custom domains** → 添加域名,按提示在 DNS 加 CNAME;完成后把 `astro.config.mjs` 的 `site` 改成新域名。

## 进阶方向(挖坑区)

- **数据同步**:写 `scripts/sync-mod.mjs` 从模组仓库同步 `zh_cn.json` / 配方 JSON,批量生成条目骨架(Astro Content Layer 可以直接读 JSON,几百个条目不用手搓)
- **结构化条目**:给机器条目定义 Zod schema,frontmatter 写能耗、配方等字段,统一渲染成信息框,漏填字段构建直接报错
- **多语言**:模组本身有 8 种语言文件,Starlight 内置 i18n 路由,想开英文版加个目录就行
