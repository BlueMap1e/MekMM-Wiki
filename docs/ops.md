# 运维手册

面向站点维护者。日常只接触 GitHub 与 Cloudflare 两个平台,本地只需要 Node 与 Git。

## 本地开发

环境要求:Node.js ≥ 22.23(仓库内有 `.nvmrc`,当前为 24)、Git。

```bash
npm install      # 安装依赖(首次)
npm run dev      # 开发服务器,热更新
npm run build    # 构建到 dist/,发布前先跑一遍验证
npm run preview  # 本地预览构建产物
```

> Hexo 用户速查:`hexo server` ≈ `npm run dev`;`hexo generate` ≈ `npm run build`;`hexo deploy` ≈ `git push`(云端自动构建,不再需要部署命令)。

## 部署原理

GitHub 仓库 `main` 分支有任何 push → Cloudflare 自动执行 `npm run build` → 产物发布到全球 CDN。本地不需要任何部署命令。

- 生产分支:`main`
- 构建命令:`npm run build`(面板选框架预设 Astro 自动填)
- 输出目录:`dist`
- Node 版本:由仓库根目录 `.nvmrc` 控制

## 日常发布

```bash
git add -A && git commit -m "说明改动" && git push
```

一两分钟后自动上线。发布前的保险:本地先跑 `npm run build`,能过基本就不会挂。

## 预览部署

push 到**非 main 分支**会得到独立的预览 URL,不影响正式站;把分支合进 main 才会更新线上。适合大改动、拿不准的排版先开分支试。

## 构建日志与回滚

Cloudflare Dashboard → Workers & Pages → MekMM-Wiki → **Deployments**:

- 点任意一次部署可看完整构建日志,报错都在这里
- 历史部署右侧菜单 **Rollback** 可一键回滚线上版本(不回滚代码,修好 bug 再 push 即可)

## 构建失败怎么办

1. 本地 `npm run build` 复现报错;
2. 常见原因:frontmatter 字段拼错、`.mdx` 里把 `<`、`{}` 当正文写(MDX 会当组件/表达式解析,普通写法请用 `.md`);
3. 构建失败不会影响线上旧版本,放心修。
4. 已知案例(2026-11-12):Cloudflare 上 `npm ci` 报 `Missing @pagefind/linux-arm64@1.6.0`。根因是 pagefind@1.6.0 上游漏发了两个平台包(npm 注册表里根本没有,任何机器都写不进 lockfile),本地 `npm install` 宽容跳过所以一直是绿的。已在 `package.json` 用 `overrides` 把 pagefind 钉在 1.5.2;上游发布修复版本后可移除该 overrides。

## 绑定自定义域名(可选)

Pages 项目 → **Custom domains** → 添加域名,按提示在 DNS 加 CNAME;完成后把 `astro.config.mjs` 的 `site` 改成新域名。
