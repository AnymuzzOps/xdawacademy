import{spawn}from'node:child_process';
const args=process.argv.slice(2);const option=(key,fallback)=>{const i=args.indexOf(key);return i<0?fallback:args[i+1];};
const child=spawn('python3',['-m','http.server',option('--port','3000'),'--bind',option('--host','0.0.0.0')],{stdio:'inherit'});for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));child.on('exit',code=>process.exit(code??0));
