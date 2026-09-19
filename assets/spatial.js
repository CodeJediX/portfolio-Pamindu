(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');
  document.querySelectorAll('[data-deck]').forEach(deck => {
    const track=deck.querySelector('.deck-track'), cards=[...track.children];
    const controls=deck.querySelector('.deck-controls');
    let active=0, startX=null;
    const render=() => {
      cards.forEach((card,i) => {
        let offset=(i-active+cards.length)%cards.length;
        if(offset>cards.length/2) offset-=cards.length;
        card.style.setProperty('--offset',Math.max(-2,Math.min(2,offset)));
        card.dataset.position=offset===0?'active':offset===1?'next':offset===-1?'previous':'away';
        card.inert=offset!==0;
        card.setAttribute('aria-hidden',String(offset!==0));
      });
      controls.querySelector('.deck-status').textContent=`${String(active+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
    };
    const move=delta=>{active=(active+delta+cards.length)%cards.length;render();};
    deck.dataset.enhanced=''; controls.hidden=false; render();
    deck.querySelector('.deck-prev').addEventListener('click',()=>move(-1));
    deck.querySelector('.deck-next').addEventListener('click',()=>move(1));
    deck.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
      event.preventDefault();
      // Keep focus on a stable control when a card becomes inactive.
      (event.key==='ArrowRight'?deck.querySelector('.deck-next'):deck.querySelector('.deck-prev')).focus();
      move(event.key==='ArrowRight'?1:-1);
    });
    track.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse')startX=event.clientX;});
    track.addEventListener('pointerup',event=>{
      if(startX!==null&&Math.abs(event.clientX-startX)>45)move(event.clientX<startX?1:-1);
      startX=null;
    });
    track.addEventListener('pointercancel',()=>{startX=null;});
  });

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
