// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// 修复 CommonMark 对 CJK 邻接加粗/斜体的解析缺陷(如 **银矿石(Silver Ore)**是… 显示原始星号)
import remarkCjkFriendly from 'remark-cjk-friendly';

export default defineConfig({
	// Cloudflare Pages 的 pages.dev 域名部署在根路径,无需 base。
	// 如果以后换了项目名或绑定自定义域名,记得同步修改 site。
	site: 'https://mekmm-wiki.pages.dev',
	markdown: {
		syntaxHighlight: 'shiki',
		remarkPlugins: [remarkCjkFriendly],
	},
	integrations: [
		starlight({
			title: 'MekMM Wiki',
			description: '通用机械:更多机器(Mekanism: More Machine)中文百科',
			// 顶栏 logo:模组官方横幅左下角的齿轮(scripts/crop-logo.mjs 裁出)
			logo: { src: './src/assets/logo-gear.png' },
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/lostmyself8/Mekanism-MoreMachine',
				},
			],
			// 单语言站:把根语言设为简体中文,UI 字符串(如"搜索""编辑此页")会自动中文化
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
			},
			// 页脚显示"最后更新于"并附"编辑此页"链接,跳转 GitHub 在线编辑
			lastUpdated: true,
			editLink: {
				base: 'https://github.com/BlueMap1e/MekMM-Wiki/edit/main/',
				label: '编辑此页',
			},
			// 侧边栏按目录自动生成,新增文件无需改配置;条目多了以后只需扩展这个数组
			sidebar: [
				{ label: '指南', items: [{ autogenerate: { directory: 'guides' } }] },
				{ label: '机器', items: [{ autogenerate: { directory: 'machines' } }] },
				{ label: '资源', items: [{ autogenerate: { directory: 'resources' } }] },
			],
			// 组件覆盖(装修梯度④):用自己的组件替换 Starlight 官方组件
			components: {
				Footer: './src/overrides/Footer.astro',
			},
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
