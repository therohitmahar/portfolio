export async function copyText(text: string) {
  try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch {}
  const focused = document.activeElement;
  const field = document.createElement("textarea");
  field.value=text; field.readOnly=true;
  Object.assign(field.style,{position:"fixed",opacity:"0",fontSize:"16px",top:"0",left:"0"});
  document.body.append(field);
  let copied=false;
  try { field.focus({preventScroll:true});field.select();copied=document.execCommand("copy"); } catch {} finally {field.remove();if(focused instanceof HTMLElement)focused.focus({preventScroll:true});}
  return copied;
}
