(function(){
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s){return document.querySelector(s)};

  var nm=$('#name');
  'Delesto'.split('').forEach(function(c,i){var s=document.createElement('span');s.textContent=c;s.style.setProperty('--i',i);s.setAttribute('aria-hidden','true');nm.appendChild(s)});
  var cc='0,255,135',cc2='16,185,129',root=document.documentElement;
  var ck=$('#clk'),dt=$('#dt'),p2=function(n){return String(n).padStart(2,'0')};
  function tick(){var d=new Date();ck.innerHTML=p2(d.getHours())+'<b>:</b>'+p2(d.getMinutes())+'<small>'+p2(d.getSeconds())+'</small>';dt.textContent=d.toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'});var pc=Math.round((d.getHours()*3600+d.getMinutes()*60+d.getSeconds())/864);$('#dbar').style.width=pc+'%';$('#dpct').textContent='день прошёл на '+pc+'%'}
  tick();setInterval(tick,1000);

  var t='Delesto • заходи • пиши • подписывайся • ';$('#tk').textContent=t.repeat(8);

  var ava=$('#ava');
  addEventListener('pointermove',function(e){
    document.body.style.setProperty('--mx',e.clientX+'px');document.body.style.setProperty('--my',e.clientY+'px');
    mouse.x=e.clientX;mouse.y=e.clientY;
    var r=ava.getBoundingClientRect(),dx=(e.clientX-r.left-r.width/2)/innerWidth,dy=(e.clientY-r.top-r.height/2)/innerHeight;
    ava.style.transform='perspective(800px) rotateY('+dx*22+'deg) rotateX('+(-dy*22)+'deg)';
  });

  document.querySelectorAll('[data-tilt]').forEach(function(c){
    c.addEventListener('pointermove',function(e){
      if(e.pointerType==='touch')return;
      var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      c.classList.add('moving');
      c.style.setProperty('--ry',(x-.5)*14+'deg');c.style.setProperty('--rx',(.5-y)*14+'deg');
      c.style.setProperty('--gx',x*100+'%');c.style.setProperty('--gy',y*100+'%');
    });
    c.addEventListener('pointerleave',function(){c.classList.remove('moving');c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
    c.addEventListener('pointerdown',function(e){
      var r=c.getBoundingClientRect(),d=Math.max(r.width,r.height)*2.2,s=document.createElement('span');
      s.className='ripple';s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
      c.appendChild(s);setTimeout(function(){s.remove()},700);
    });
  });

  var toast=$('#toast'),tm;
  function done(x,y,m){
    toast.lastChild.textContent=m||'Скопировано!';toast.classList.remove('show');void toast.offsetWidth;toast.classList.add('show');
    clearTimeout(tm);tm=setTimeout(function(){toast.classList.remove('show')},1900);
    if(rm)return;
    for(var i=0;i<22;i++){
      var p=document.createElement('i');p.className='pop';p.style.left=x+'px';p.style.top=y+'px';document.body.appendChild(p);
      var a=Math.random()*6.283,d=50+Math.random()*90;
      p.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+Math.cos(a)*d+'px,'+(Math.sin(a)*d+30)+'px) scale(0)',opacity:0}],{duration:700+Math.random()*400,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=p.remove.bind(p);
    }
  }
  function copy(text,x,y,m){
    function fb(){var a=document.createElement('textarea');a.value=text;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove();done(x,y,m)}
    if(navigator.clipboard&&isSecureContext)navigator.clipboard.writeText(text).then(function(){done(x,y,m)},fb);else fb();
  }
  document.querySelectorAll('[data-copy]').forEach(function(el){
    el.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();copy(el.dataset.copy,e.clientX||innerWidth/2,e.clientY||innerHeight/2)});
  });
  var cur=$('#cur'),px=0,py=0,tx=0,ty=0,last=0;
  function shock(x,y){if(rm)return;var s=document.createElement('i');s.className='shock';s.style.left=x+'px';s.style.top=y+'px';document.body.appendChild(s);s.animate([{transform:'scale(1)',opacity:.9},{transform:'scale(9)',opacity:0}],{duration:900,easing:'ease-out'}).onfinish=s.remove.bind(s)}
  addEventListener('pointerdown',function(e){shock(e.clientX,e.clientY)});
  addEventListener('pointermove',function(e){
    tx=e.clientX;ty=e.clientY;cur.classList.add('on');cur.classList.toggle('big',!!e.target.closest('.card,button,a,.ava'));
    var n=performance.now();if(rm||e.pointerType==='touch'||n-last<35)return;last=n;
    var d=document.createElement('i');d.className='trail';d.style.left=tx+'px';d.style.top=ty+'px';document.body.appendChild(d);
    d.animate([{transform:'scale(1)',opacity:.85},{transform:'scale(0) translateY(16px)',opacity:0}],{duration:750}).onfinish=d.remove.bind(d);
  });
  (function f(){px+=(tx-px)*.18;py+=(ty-py)*.18;cur.style.transform='translate('+px+'px,'+py+'px)';requestAnimationFrame(f)})();
  if(!rm)setInterval(function(){var s=document.createElement('i');s.className='star';s.style.left=Math.random()*innerWidth*.8+'px';s.style.top=Math.random()*innerHeight*.45+'px';document.body.appendChild(s);setTimeout(function(){s.remove()},1600)},2400);
  document.querySelectorAll('.user').forEach(function(u){var o=u.textContent,busy=0;
    u.closest('.card').addEventListener('pointerenter',function(){if(busy||rm)return;busy=1;var f=0,ch='abcdefghijklmnopqrstuvwxyz_@0123456789';
      var iv=setInterval(function(){u.textContent=o.split('').map(function(c,i){return i<f/2?c:ch[Math.random()*ch.length|0]}).join('');if(++f>o.length*2){clearInterval(iv);u.textContent=o;busy=0}},35)})});
  var AC=[['#00FF87','#10B981','0,255,135','16,185,129'],['#5EFFC8','#14B8A6','94,255,200','20,184,166'],['#A3FF5C','#22C55E','163,255,92','34,197,94']],sw=document.querySelectorAll('.sw button');
  sw.forEach(function(b,i){b.style.setProperty('--k',AC[i][0]);b.addEventListener('click',function(e){var a=AC[i];
    root.style.setProperty('--g2',a[0]);root.style.setProperty('--g1',a[1]);root.style.setProperty('--c',a[2]);root.style.setProperty('--c2',a[3]);cc=a[2];cc2=a[3];
    sw.forEach(function(x){x.classList.remove('on')});b.classList.add('on');shock(e.clientX,e.clientY)})});
  document.querySelectorAll('.stk').forEach(function(s){var ox,oy,on=0;
    s.addEventListener('pointerdown',function(e){e.stopPropagation();on=1;s.setPointerCapture(e.pointerId);var r=s.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;s.classList.add('grab')});
    s.addEventListener('pointermove',function(e){if(!on)return;s.style.left=(e.clientX-ox)+'px';s.style.top=(e.clientY-oy)+'px';s.style.right='auto'});
    s.addEventListener('pointerup',function(){on=0;s.classList.remove('grab')})});

  var cv=$('#fx'),cx=cv.getContext('2d'),W,H,P=[],mouse={x:-999,y:-999},dpr=Math.min(devicePixelRatio||1,2);
  function size(){W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.min(90,Math.floor(W*H/14000));P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+.6})}
  size();addEventListener('resize',size);
  function draw(){
    cx.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){
      var a=P[i];a.x+=a.vx;a.y+=a.vy;
      if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
      var mx=a.x-mouse.x,my=a.y-mouse.y,md=Math.sqrt(mx*mx+my*my);
      if(md<130){a.x+=mx/md*1.6;a.y+=my/md*1.6}
      cx.beginPath();cx.arc(a.x,a.y,a.r,0,6.283);cx.fillStyle='rgba('+cc+',.7)';cx.fill();
      for(var j=i+1;j<P.length;j++){var b=P[j],dx=a.x-b.x,dy=a.y-b.y,d=dx*dx+dy*dy;
        if(d<14000){cx.strokeStyle='rgba('+cc2+','+(1-d/14000)*.35+')';cx.lineWidth=.7;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}
      if(md<170){cx.strokeStyle='rgba('+cc+','+(1-md/170)*.6+')';cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(mouse.x,mouse.y);cx.stroke()}
    }
    requestAnimationFrame(draw);
  }
  if(!rm)draw();
})();
