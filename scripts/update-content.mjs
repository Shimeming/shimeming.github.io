import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mergeOrder } from '../src/lib/order.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function readCuratedSlugs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/^\s*'([^']+)'\s*,?\s*$/gm)];
  return matches.map((m) => m[1]);
}

function writeDataFile(filePath, varName, slugs) {
  const lines = slugs.map((s) => `  '${s}',`).join('\n');
  const content = `const ${varName} = [\n${lines}\n];\nexport default ${varName};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Written: ${filePath}`);
}

// Projects
const projectsFile = path.join(root, 'src/data/projects.ts');
const projectsDir = path.join(root, 'public/projects');
const curatedProjects = readCuratedSlugs(projectsFile);
const discoveredProjects = fs
  .readdirSync(projectsDir)
  .filter((name) => !name.startsWith('_'))
  .sort();
const mergedProjects = mergeOrder(curatedProjects, discoveredProjects);
writeDataFile(projectsFile, 'projects', mergedProjects);

// Articles
const articlesFile = path.join(root, 'src/data/articles.ts');
const articlesDir = path.join(root, 'public/articles');
const curatedArticles = readCuratedSlugs(articlesFile);
const discoveredArticles = fs
  .readdirSync(articlesDir)
  .filter((name) => !name.startsWith('_') && name.endsWith('.md'))
  .map((name) => path.basename(name, '.md'))
  .sort();
const mergedArticles = mergeOrder(curatedArticles, discoveredArticles);
writeDataFile(articlesFile, 'articles', mergedArticles);
