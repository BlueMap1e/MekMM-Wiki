# 条目编写指南

所有条目都是仓库里的 Markdown / MDX 文件,写条目 = 提交文件,不需要碰任何数据库。站点上的[《快速上手》](https://mekmm-wiki.pages.dev/guides/quick-start/)是面向访客的同源精简版。

## 如何写条目

在 `src/content/docs/` 下创建 `.md`(纯 Markdown)或 `.mdx`(需要用组件时)文件,**文件路径就是链接路径**(建议文件名用英文、标题写中文):

```md
---
title: 条目标题(侧边栏与页面大标题)
description: 一句话简介,进搜索索引与 meta 描述
---
```

侧边栏由 `astro.config.mjs` 里的 `sidebar` 按目录自动生成(`autogenerate`),新建文件即自动上架,不用登记。

> **内容红线**:未经作者确认的模组设定(机器等级、版本号、配方数值、方块结构等)不要写进条目与站点文案;数据以游戏内实测或作者确认为准。引用模组版本请查 GitHub Release 页,本地仓库工作副本的 `gradle.properties` 不是发布事实。

## 好用的语法

- 提示框:`:::note[标题] … :::`(还有 `tip` / `caution` / `danger`)
- 代码块带复制按钮、表格、脚注均开箱即用
- 中文搜索:内建 Pagefind,构建时自动生成索引,无需配置

## 自定义组件

放 `src/components/`,条目顶部 `import` 后直接当 HTML 标签用(文件需 `.mdx` 扩展名)。现有示例:

```mdx
import VersionBadge from '../../../components/VersionBadge.astro';

<VersionBadge versions={['x.y.z']} label="数据核对于模组版本" />
```

## 修改主题(装修梯度)

| 梯度 | 手段 | 本站示例 |
| ---- | ---- | -------- |
| ① 配置 | `astro.config.mjs` 改字段 | 顶栏 logo、社交链接、侧边栏 |
| ② 刷漆 | `src/styles/custom.css` 覆盖 `--sl-*` 变量 | 石墨蓝强调色、中文字体栈 |
| ③ 官方组件 | 条目里 import Starlight 自带组件 | 首页 `Card`/`CardGrid`、指南 `Steps` |
| ④ 组件覆盖 | `astro.config.mjs` 的 `components` 挂自己的组件 | 自定义页脚 `src/overrides/Footer.astro` |
| ⑤ 砸墙 | `StarlightPage` 造自定义页面 / 插件系统 | 待玩 |

- 全站强调色与字体:`src/styles/custom.css`,覆盖 `--sl-color-accent*`、`--sl-font*` 变量(字体走系统栈,不加载中文 webfont)
- 页头齿轮 logo 截自模组官方 logo:`npm run crop-logo` 重新生成(`scripts/crop-logo.mjs`)
- 注意:Astro 组件的 `<style>` 是作用域隔离的,`:root` 级别的变量定义必须包 `:global(:root)`,否则匹配不到 `<html>`

## 进阶方向(挖坑区)

- **数据同步**:写 `scripts/sync-mod.mjs` 从模组仓库同步 `zh_cn.json` / 配方 JSON,批量生成条目骨架(Astro Content Layer 可以直接读 JSON,几百个条目不用手搓)
- **结构化条目**:给机器条目定义 Zod schema,frontmatter 写能耗、配方等字段,统一渲染成信息框,漏填字段构建直接报错
- **多语言**:模组本身有 8 种语言文件,Starlight 内置 i18n 路由,想开英文版加个目录就行
