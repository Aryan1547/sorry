
(function(){
  const pages = ['page1','page2','page3','page4','page5'];
  function show(id){ pages.forEach(p=>document.getElementById(p).style.display = (p===id?'block':'none')); }

  document.getElementById('continueBtn').addEventListener('click', ()=>{ clickBeep(); show('page2'); });
  document.getElementById('nextBtn').addEventListener('click', ()=>{ clickBeep(); show('page3'); });
  document.getElementById('toHeartBtn').addEventListener('click', ()=>{ clickBeep(); show('page4'); });
  document.getElementById('finalBtn').addEventListener('click', ()=>{ clickBeep(); show('page5'); });

  ['pill1','pill2','pill3'].forEach(id=>{
    const el = document.getElementById(id);
    el.addEventListener('click', ()=>{
      const text = el.dataset.text;
      const reveal = document.getElementById('reveal');
      reveal.classList.remove('pulse');
      setTimeout(()=>{ reveal.textContent = text; reveal.classList.add('pulse'); }, 80);
      el.animate([{transform:'scale(1)'},{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:220});
      clickBeep();
    });
  });

  document.getElementById('cat1').addEventListener('click', ()=>{ document.getElementById('heartReveal').textContent = "From me to you: I'm sorry and I love you."; clickBeep(); });
  document.getElementById('cat2').addEventListener('click', ()=>{ document.getElementById('heartReveal').textContent = "I never wanted to make you sad. Please forgive me."; clickBeep(); });

  function dblClickConfetti(el){ let last=0; el.addEventListener('click', ()=>{ const now=Date.now(); if(now-last<300){ launchConfetti(120); } last=now; }); }
  dblClickConfetti(document.getElementById('cat1'));
  dblClickConfetti(document.getElementById('cat2'));

  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position='fixed'; confettiCanvas.style.left=0; confettiCanvas.style.top=0; confettiCanvas.style.pointerEvents='none'; confettiCanvas.style.zIndex=9999;
  document.body.appendChild(confettiCanvas);
  const ctx = confettiCanvas.getContext('2d');
  function resize(){ confettiCanvas.width = innerWidth; confettiCanvas.height = innerHeight; }
  window.addEventListener('resize', resize); resize();
  function launchConfetti(count=100){ const pieces=[]; for(let i=0;i<count;i++) pieces.push({x:Math.random()*confettiCanvas.width,y:-20-Math.random()*200,r:4+Math.random()*8,vx:Math.random()*2-1,vy:2+Math.random()*4,color:['#ff6b6b','#ffd6d6','#ff9a9a','#d8b4ff','#ffd6e0'][Math.floor(Math.random()*5)]}); let t=0; function frame(){ t++; ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height); for(const p of pieces){ p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; ctx.fillStyle=p.color; ctx.beginPath(); ctx.ellipse(p.x,p.y,p.r,p.r*0.6,0,0,Math.PI*2); ctx.fill(); } if(t<260) requestAnimationFrame(frame); else ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height); } requestAnimationFrame(frame); }

  let audioCtx = null;
  function clickBeep(){ try{ if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); o.type = 'sine'; o.frequency.value = 880; g.gain.value = 0.0001; o.connect(g); g.connect(audioCtx.destination); const now = audioCtx.currentTime; g.gain.exponentialRampToValueAtTime(0.12, now + 0.01); o.start(now); g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12); o.stop(now + 0.13); }catch(e){} }

  document.getElementById('hero1img').addEventListener('click', ()=>{ const url = prompt('Paste direct image URL for page 1 (pink)'); if(url) document.getElementById('hero1img').src = url; });
  document.getElementById('hero2img').addEventListener('click', ()=>{ const url = prompt('Paste direct image URL for page 2 (purple)'); if(url) document.getElementById('hero2img').src = url; });
  document.addEventListener('keydown', e=>{ if(e.key==='ArrowRight'){ const cur = pages.find(p=>document.getElementById(p).style.display!=='none'); const idx = pages.indexOf(cur); if(idx < pages.length-1) show(pages[idx+1]); } });

  show('page1');
})();
