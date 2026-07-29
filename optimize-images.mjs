import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;

async function getAllImageFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImageFiles(fullPath));
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const relativePath = path.relative(publicDir, filePath);
  
  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    
    // Read and get metadata
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Determine resize options
    const resizeOpts = {};
    if (metadata.width && metadata.width > MAX_WIDTH) {
      resizeOpts.width = MAX_WIDTH;
      resizeOpts.withoutEnlargement = true;
    }
    
    // Process image
    let pipeline = sharp(filePath);
    
    if (resizeOpts.width) {
      pipeline = pipeline.resize(resizeOpts);
    }
    
    // Output as JPEG (even PNG files, for web perf)
    const outputBuffer = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
    
    // If it's a PNG, we'll save it as .jpg extension
    if (ext === '.png') {
      // Write as jpg with same base name
      const newPath = filePath.replace(/\.png$/i, '.jpg');
      fs.writeFileSync(newPath, outputBuffer);
      // Remove old PNG
      fs.unlinkSync(filePath);
      const newSize = outputBuffer.length;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`✅ ${relativePath} → .jpg | ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% saved)`);
    } else {
      // Overwrite in place
      fs.writeFileSync(filePath, outputBuffer);
      const newSize = outputBuffer.length;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`✅ ${relativePath} | ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% saved)`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${relativePath}: ${err.message}`);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function main() {
  console.log('🔍 Scanning for images in public/...\n');
  
  const imageFiles = await getAllImageFiles(publicDir);
  console.log(`Found ${imageFiles.length} images to optimize.\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const file of imageFiles) {
    const originalSize = fs.statSync(file).size;
    totalOriginal += originalSize;
    
    await optimizeImage(file);
    
    // Check new size (handle PNG→JPG rename)
    const ext = path.extname(file).toLowerCase();
    const checkPath = ext === '.png' ? file.replace(/\.png$/i, '.jpg') : file;
    if (fs.existsSync(checkPath)) {
      totalOptimized += fs.statSync(checkPath).size;
    }
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 Total: ${formatBytes(totalOriginal)} → ${formatBytes(totalOptimized)}`);
  console.log(`💾 Saved: ${formatBytes(totalOriginal - totalOptimized)} (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%)`);
  console.log(`${'='.repeat(60)}`);
}

main().catch(console.error);
