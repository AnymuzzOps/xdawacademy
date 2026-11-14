import{mkdir,cp,rm}from'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const entry of ['index.html','src','formacion','formaciones','legal','data','.nojekyll'])await cp(entry,`dist/${entry}`,{recursive:true});
console.log('Static site built in dist/');
