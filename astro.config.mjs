// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	// Cloudflare Pages 的 pages.dev 域名部署在根路径,无需 base。
	// 如果以后换了项目名或绑定自定义域名,记得同步修改 site。
	site: 'https://mekmm-wiki.pages.dev',
	integrations: [
		starlight({
			title: 'MekMM Wiki',
			description: '通用机械:更多机器(Mekanism: More Machine)中文百科',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/BlueMap1e/MekMM-Wiki',
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
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
