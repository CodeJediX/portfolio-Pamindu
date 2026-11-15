(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');
  const core=document.querySelector('.circuit');
  if(core){
    const stage=core.querySelector('.core-stage'), svg=core.querySelector('.circuit-drawing');
    const trigger=core.querySelector('.core-trigger'), button=core.querySelector('.layer-toggle');
    const tiles=core.querySelector('.core-tiles'), fragments=core.querySelector('.core-fragments');
    let open=false;
    // Each fragment contains a clipped portion of the actual circuit artwork.
    for(let i=0;i<12;i++){
      const piece=document.createElement('div');piece.className='core-piece';
      const copy=svg.cloneNode(true);copy.removeAttribute('class');copy.removeAttribute('aria-labelledby');
      copy.setAttribute('aria-hidden','true');
      copy.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
      copy.querySelector('rect')?.remove();
      piece.append(copy);piece.style.clipPath=`inset(${Math.floor(i/3)*25}% ${100-(i%3+1)*100/3}% ${75-Math.floor(i/3)*25}% ${i%3*100/3}%)`;
      piece.style.setProperty('--piece-x',`${(i%3-1)*140}px`);
      piece.style.setProperty('--piece-y',`${(Math.floor(i/3)-1.5)*85}px`);
      piece.style.setProperty('--piece-r',`${(i%2?1:-1)*22}deg`);
      fragments.append(piece);
    }
    const toggle=()=>{
      open=!open;core.dataset.open=String(open);core.dataset.exploded=String(!open);
      trigger.setAttribute('aria-expanded',String(open));button.setAttribute('aria-expanded',String(open));
      button.setAttribute('aria-pressed',String(open));button.firstChild.textContent=open?'Reassemble the circuit ':'Explore the system ';
      tiles.hidden=!open;trigger.hidden=open;svg.setAttribute('aria-hidden',String(open));
      if(open)button.focus({preventScroll:true});
    };
    trigger.hidden=false;button.hidden=false;
    trigger.addEventListener('click',toggle);button.addEventListener('click',toggle);
    core.addEventListener('keydown',event=>{if(event.key==='Escape'&&open){toggle();trigger.focus();}});
    stage.addEventListener('pointermove',event=>{
      if(motion.matches||!fine.matches||open)return;
      const rect=stage.getBoundingClientRect();
      svg.style.setProperty('--rx',`${-(event.clientY-rect.top-rect.height/2)/rect.height*15}deg`);
      svg.style.setProperty('--ry',`${(event.clientX-rect.left-rect.width/2)/rect.width*18}deg`);
    });
    const reset=()=>{svg.style.removeProperty('--rx');svg.style.removeProperty('--ry');};
    stage.addEventListener('pointerleave',reset);motion.addEventListener('change',reset);
  }
})();
