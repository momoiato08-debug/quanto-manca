
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { countdowns } from './countdowns-db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leggi il template
const templatePath = path.join(__dirname, 'template-countdown.html');
const template = fs.readFileSync(templatePath, 'utf-8');

console.log('🚀 Inizio generazione pagine countdown...');

countdowns.forEach(item => {
  let html = template;

  // Sostituisci i placeholder
  html = html.replace(/{{SEO_TITLE}}/g, item.seoTitle);
  html = html.replace(/{{SEO_DESCRIPTION}}/g, item.seoDescription);
  html = html.replace(/{{TITLE}}/g, item.title);
  html = html.replace(/{{SUBTITLE}}/g, item.subtitle);
  html = html.replace(/{{BG_CLASS}}/g, item.bgClass);
  html = html.replace(/{{ELAPSED_TITLE}}/g, item.elapsedTitle);
  html = html.replace(/{{COUNTUP_DATE}}/g, item.countupDate);
  html = html.replace(/{{TARGET_DATE}}/g, item.targetDate);

  // Scrivi il file
  const fileName = `${item.slug}.html`;
  const filePath = path.join(__dirname, fileName);
  
  fs.writeFileSync(filePath, html);
  console.log(`✅ Generato: ${fileName}`);
});

console.log('✨ Generazione completata!');
