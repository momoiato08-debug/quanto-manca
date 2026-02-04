
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { countdowns } from './countdowns-db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Genera pagine singole di dettaglio
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
  console.log(`✅ Generato pagina dettaglio: ${fileName}`);
});

// 2. Genera la pagina "Tutti i countdown" (indice)
console.log('📦 Generazione indice "Tutti i countdown"...');
const tuttiTemplatePath = path.join(__dirname, 'tutti-i-countdown-template.html');
const tuttiTemplate = fs.readFileSync(tuttiTemplatePath, 'utf-8');

// Genera le card HTML per ogni countdown nel DB
const cardsHtml = countdowns.map(item => `
      <div class="countdown-card ${item.bgClass}" id="${item.id}" onclick="location.href='/${item.slug}.html'">
        <h2>${item.title.replace('Quanto manca a ', '').replace('Quanto manca alle ', '').replace('Quanto manca all\'uscita di ', '').replace('Quanto manca ad ', '').replace('Quanto manca alla ', '').replace('?', '')}</h2>
        <div class="time" data-countdown="${item.targetDate}">
          <span class="days">00</span> giorni
          <span class="hours">00</span> ore
          <span class="minutes">00</span> min
          <span class="seconds">00</span> sec
        </div>
      </div>`).join('\n');

const tuttiHtml = tuttiTemplate.replace('{{COUNTDOWNS_LIST}}', cardsHtml);
fs.writeFileSync(path.join(__dirname, 'tutti-i-countdown.html'), tuttiHtml);
console.log('✅ Generato indice: tutti-i-countdown.html');

console.log('✨ Generazione completata!');
