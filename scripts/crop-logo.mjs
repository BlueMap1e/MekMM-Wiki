// 从模组官方横幅 logo(src/assets/banner.png)左下角截出齿轮图标,
// 用作顶栏 logo(src/assets/logo-gear.png,由 astro.config.mjs 引用)。
// 换横幅图后重跑:npm run crop-logo
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const bannerPath = fileURLToPath(new URL('../src/assets/banner.png', import.meta.url));
const outPath = fileURLToPath(new URL('../src/assets/logo-gear.png', import.meta.url));

const { width, height } = await sharp(bannerPath).metadata();
if (!width || !height) throw new Error('无法读取 banner.png 尺寸');
console.log(`banner 尺寸:${width}x${height}`);

// 齿轮大致位于左下角:横向前 18%,纵向后 34%。trim() 去掉四周透明边。
// 注意:sharp 的 extract 与 trim 不能在同一条管线里(trim 会按裁后尺寸重算坐标导致越界),
// 所以先 extract 到 buffer,再单独 trim。
const left = 0;
const top = Math.min(Math.round(height * 0.665), height - 1);
const cropWidth = Math.min(Math.round(width * 0.18), width - left);
const cropHeight = Math.min(Math.round(height * 0.38), height - top);
const cropped = await sharp(bannerPath)
	.extract({ left, top, width: cropWidth, height: cropHeight })
	.png()
	.toBuffer();
const gear = await sharp(cropped).trim().png().toFile(outPath);

console.log(`齿轮 logo 已生成:${gear.width}x${gear.height}`);
