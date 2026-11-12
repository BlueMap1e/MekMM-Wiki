import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Starlight 的文档集合:src/content/docs/ 下的所有 .md/.mdx 都走这里,
// frontmatter 会经过 docsSchema 校验,写错字段名构建时直接报错。
export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
