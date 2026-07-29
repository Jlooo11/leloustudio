import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'images.ts');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];

const CATEGORY_MAP = {
  'anniversaire': 'Anniversaire',
  'beaute': 'Beauté',
  'corporate': 'Corporate',
  'diplome': 'Diplôme',
  'dote': 'Dote',
  'famille': 'Famille',
  'grossesse': 'Grossesse',
  'mariage': 'Mariage',
  'nude': 'Nude',
  'produit cosmetique': 'Produit',
  'studio': 'Studio',
  'vedette': 'Vedette',
  'vetement': 'Vêtements'
};

// Images that are misplaced in their folder and should be reassigned
const CATEGORY_OVERRIDES = {
  'nude/8M2A9478.jpeg': 'Corporate',
};

function getCategoryFromPath(relPath) {
  const normalizedPath = relPath.split(path.sep).join('/');
  if (CATEGORY_OVERRIDES[normalizedPath]) {
    return CATEGORY_OVERRIDES[normalizedPath];
  }
  const parts = relPath.split(path.sep);
  if (parts.length > 1) {
    const folder = parts[0].toLowerCase();
    return CATEGORY_MAP[folder] || folder.charAt(0).toUpperCase() + folder.slice(1);
  }
  return 'Studio';
}

function scanDir(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file.startsWith('.')) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanDir(fullPath, baseDir));
    } else {
      const ext = path.extname(file);
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const relPath = path.relative(baseDir, fullPath);
        const cleanPath = '/' + relPath.split(path.sep).join('/');
        const category = getCategoryFromPath(relPath);
        results.push({ id: results.length + 1, src: cleanPath, category, filename: file });
      }
    }
  }
  return results;
}

const images = scanDir(publicDir);

const sizes = ['small', 'medium', 'small', 'large', 'small', 'medium'];
images.forEach((img, idx) => {
  img.id = idx + 1;
  img.size = sizes[idx % sizes.length];
});

const uniqueCategories = [...new Set(images.map(img => img.category))].sort();

const content = `export interface ImageItem {
  id: number;
  src: string;
  category: string;
  filename: string;
  size?: 'small' | 'medium' | 'large';
}

export const CATEGORIES = [
  "Tout",
${uniqueCategories.map(c => `  "${c}"`).join(',\n')}
] as const;

export const ALL_IMAGES: ImageItem[] = ${JSON.stringify(images, null, 2)};
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, content, 'utf-8');

console.log('\n📊 Image Catalog Generated');
console.log('='.repeat(50));
console.log(`Total images: ${images.length}`);
console.log('\nPer category:');
uniqueCategories.forEach(cat => {
  const count = images.filter(i => i.category === cat).length;
  console.log(`  ${cat}: ${count} photos`);
});
console.log('='.repeat(50));
console.log(`Output: ${outputFile}`);
