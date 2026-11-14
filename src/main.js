document.body.classList.add('js');
const toggle=document.querySelector('.menu'),nav=document.querySelector('#nav');
const closeMenu=(focus=false)=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');nav.classList.remove('open');if(focus)toggle.focus();};
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open);});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
window.matchMedia('(min-width:701px)').addEventListener('change',()=>closeMenu());
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window){
 const targets=document.querySelectorAll('.method-copy,.method-photo,.method-pillars li,.section-heading,.journey-steps li,.formation-panel,.community-photo,.community-copy,.contact-copy');
 const observer=new IntersectionObserver(entries=>{let index=0;entries.forEach(entry=>{if(!entry.isIntersecting)return;observer.unobserve(entry.target);if(!motion.matches&&entry.target.animate)entry.target.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:650,delay:Math.min(index++,3)*90,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});});},{threshold:.08});
 targets.forEach(el=>observer.observe(el));motion.addEventListener('change',()=>{if(motion.matches)document.getAnimations().forEach(a=>a.cancel());});
}
const form=document.querySelector('#interest-form');
if(form){form.setAttribute('aria-describedby','form-notice');form.querySelector('[type=submit]').disabled=false;}
if(form){form.addEventListener('submit',event=>{event.preventDefault();for(const input of form.querySelectorAll('input[required]')){input.setCustomValidity(input.value.trim()?'':'Completa este campo.');input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});}if(!form.reportValidity())return;const values=new FormData(form);const draft=`Consulta XDAW Academy\n\nNombre: ${values.get('nombre').trim()}\nCorreo: ${values.get('correo').trim()}\nTeléfono: ${values.get('telefono').trim()||'No indicado'}\nCiudad: ${values.get('ciudad').trim()}\nInterés: ${values.get('formacion')}\nMensaje: ${values.get('mensaje').trim()||'Sin mensaje adicional'}`;document.querySelector('#draft-text').value=draft;document.querySelector('#draft').hidden=false;document.querySelector('#form-status').textContent='Consulta preparada en este navegador. No se ha enviado ni guardado. Puedes copiarla y enviarla al correo de contacto.';document.querySelector('#draft-text').focus();});document.querySelector('#copy').addEventListener('click',async()=>{const field=document.querySelector('#draft-text');try{await navigator.clipboard.writeText(field.value);document.querySelector('#form-status').textContent='Consulta copiada. Aún no se ha enviado.';}catch{field.focus();field.select();document.querySelector('#form-status').textContent='Selecciona y copia el texto manualmente. No se ha enviado.';}});}
