import{readFile,access}from'node:fs/promises';
import{resolve,dirname}from'node:path';
const pages=['index.html','formacion/index.html','formaciones/index.html','legal/index.html'];
const local=async(url,path)=>{
 if(/^(https?:|mailto:|data:)/.test(url))return;
 if(url.startsWith('/'))throw Error(`Root-relative asset breaks project Pages: ${url} in ${path}`);
 const[file,hash]=url.split('#');let target=resolve(dirname(path),file||'.');
 if(!file)target=resolve(path);else if(file.endsWith('/'))target=resolve(target,'index.html');
 await access(target);
 if(hash){const text=await readFile(target,'utf8');if(!text.includes(`id="${hash}"`))throw Error(`Broken anchor ${url} in ${path}`);}
};
for(const path of pages){
 const html=await readFile(path,'utf8');
 if(!html.includes('lang="es"'))throw Error(`Missing language: ${path}`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)throw Error(`Duplicate IDs: ${path}`);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g))await local(match[1],path);
 for(const match of html.matchAll(/srcset="([^"]+)"/g))for(const candidate of match[1].split(','))await local(candidate.trim().split(/\s+/)[0],path);
}
const css=await readFile('src/styles.css','utf8');
for(const match of css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g))await local(match[1],'src/styles.css');
const dates=JSON.parse(await readFile('data/formaciones.json','utf8'));
if(!Array.isArray(dates))throw Error('Invalid convocatorias');
console.log('4 pages checked: links, anchors, language, unique IDs, responsive images, local fonts/CSS assets and convocatorias.');
