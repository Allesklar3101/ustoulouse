
function doLogin(){
  var u=document.getElementById('loginUser').value.trim();
  var p=document.getElementById('loginPass').value;
  var err=document.getElementById('errorMsg');
  document.getElementById('loginUser').classList.remove('error');
  document.getElementById('loginPass').classList.remove('error');
  err.classList.remove('show');
  if(!u||!p){
    if(!u) document.getElementById('loginUser').classList.add('error');
    if(!p) document.getElementById('loginPass').classList.add('error');
    err.innerHTML='<i class="ti ti-alert-circle" style="font-size:14px;margin-right:6px;vertical-align:middle"></i>Veuillez remplir tous les champs.';
    err.classList.add('show');
    return;
  }
  document.body.classList.add('logged');
  window.scrollTo(0,0);
}
function doLogout(){
  document.body.classList.remove('logged');
  window.scrollTo(0,0);
  document.getElementById('loginPass').value='';
  document.getElementById('loginPass').classList.remove('error');
  document.getElementById('errorMsg').classList.remove('show');
  window.scrollTo(0,0);
}
function showTab(name){
  var items=document.querySelectorAll('.dash-nav__item');
  for(var i=0;i<items.length;i++) items[i].classList.toggle('active',items[i].getAttribute('data-tab')===name);
  var panels=document.querySelectorAll('.dash-panel');
  for(var j=0;j<panels.length;j++) panels[j].classList.remove('active');
  document.getElementById('panel-'+name).classList.add('active');
  if(name==='sport') renderCal();
}
function showSportTab(panel,sport){
  var container=document.getElementById('panel-'+panel);
  var tabs=container.querySelectorAll('.sport-tab');
  var panels=container.querySelectorAll('.sport-panel');
  for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('active');
  for(var j=0;j<panels.length;j++) panels[j].classList.remove('active');
  var idx=sport==='football'?0:1;
  tabs[idx].classList.add('active');
  document.getElementById(panel+'-'+sport).classList.add('active');
}
function toggleEdit(){
  var f=document.getElementById('profile-form');
  f.style.display=f.style.display==='none'||f.style.display===''?'block':'none';
}
function fakeSave(btn){
  var old=btn.innerHTML;
  btn.innerHTML='<i class="ti ti-check"></i> Enregistré';
  setTimeout(function(){btn.innerHTML=old;},1800);
}
function rsvpClick(btn,ans){
  var pill=btn.closest('.rsvp');
  if(!pill) return;
  var already=pill.classList.contains('answered-'+ans);
  pill.classList.remove('answered-yes','answered-no');
  if(!already) pill.classList.add('answered-'+ans);
}
function cycleRsvp(btn){rsvpClick(btn,'yes');}
function setPresence(btn){rsvpClick(btn,'yes');}
function previewPhoto(input){
  if(input.files&&input.files[0]){
    var reader=new FileReader();
    reader.onload=function(e){
      var url=e.target.result;
      // Mise à jour du preview dans Mon compte
      var preview=document.getElementById('photo-preview');
      preview.style.backgroundImage='url('+url+')';
      preview.style.backgroundSize='cover';
      preview.style.backgroundPosition='center';
      preview.innerText='';
      // Mise à jour de l'avatar dans la sidebar
      var avatar=document.querySelector('.dash-avatar');
      if(avatar){
        avatar.style.backgroundImage='url('+url+')';
        avatar.style.backgroundSize='cover';
        avatar.style.backgroundPosition='center';
        avatar.innerText='';
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&!document.body.classList.contains('logged'))doLogin();});

/* Nav scroll */
(function(){
  var nav=document.getElementById('nav');
  var burger=document.getElementById('burger');
  var overlay=document.getElementById('menuOverlay');
  var closeBtn=document.getElementById('menuClose');
  if(!burger||!overlay) return;
  window.addEventListener('scroll',function(){if(nav) nav.classList.toggle('nav--scrolled',window.scrollY>40);},{passive:true});
  function openMenu(){overlay.classList.add('open');burger.classList.add('open');document.body.style.overflow='hidden';}
  function closeMenu(){overlay.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';}
  burger.addEventListener('click',openMenu);
  if(closeBtn) closeBtn.addEventListener('click',closeMenu);
  overlay.addEventListener('click',function(e){if(e.target===overlay) closeMenu();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') closeMenu();});
})();
var calState={year:2026,month:5,selected:null};
var calEvents={
  '2026-06-03':[{type:'hebdo',title:'Entraînement Football',time:'19h00',lieu:'Terrain B, La Ramée',coach:'M. Bertrand',description:'Séance technique + tactique. Tenue complète requise.'}],
  '2026-06-10':[{type:'hebdo',title:'Entraînement Football',time:'19h00',lieu:'Terrain B, La Ramée',coach:'M. Bertrand',description:'Séance technique + tactique. Tenue complète requise.'},{type:'sortie',title:'Randonnée Pyrénées',time:'08h00',lieu:'Col du Tourmalet',distance:'18 km',denivele:'+1 240 m',description:'Départ depuis le parking du club à 07h30. Prévoir eau + repas. Niveau intermédiaire.'}],
  '2026-06-14':[{type:'match',title:'UST vs FC Mirail',time:'15h00',lieu:'Stade Ernest-Wallon',adversaire:'FC Mirail',competition:'Championnat Régional — Poule A',description:'Convocation à 13h30. Tenue domicile.'}],
  '2026-06-17':[{type:'hebdo',title:'Entraînement Football',time:'19h00',lieu:'Terrain B, La Ramée',coach:'M. Bertrand',description:'Séance technique + tactique. Tenue complète requise.'}],
  '2026-06-21':[{type:'sortie',title:'Rando découverte Ariège',time:'07h30',lieu:'Foix',distance:'14 km',denivele:'+680 m',description:'Circuit balisé GR10. Retour prévu vers 17h00. Inscription obligatoire avant le 18 juin.'}],
  '2026-06-24':[{type:'hebdo',title:'Entraînement Football',time:'19h00',lieu:'Terrain B, La Ramée',coach:'M. Bertrand'},{type:'match',title:'UST vs Blagnac SC',time:'18h00',lieu:'Stade Blagnac',adversaire:'Blagnac SC',competition:'Coupe Occitanie — Quart de finale',description:'Convocation à 16h30. Tenue extérieur.'}],
  '2026-07-01':[{type:'hebdo',title:'Entraînement Football',time:'19h00',lieu:'Terrain B, La Ramée',coach:'M. Bertrand'}],
  '2026-07-08':[{type:'hebdo',title:'Entraînement Football',time:'19h00',lieu:'Terrain B, La Ramée',coach:'M. Bertrand'}],
  '2026-07-12':[{type:'match',title:'Tournoi d\'été UST',time:'09h00',lieu:'Complexe sportif La Ramée',adversaire:'Équipes invitées',competition:'Tournoi amical inter-clubs',description:'Journée complète. Plusieurs équipes engagées. Buvette sur place.'}]
};
var MONTHS_FR=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
function renderCal(){
  var y=calState.year,m=calState.month;
  document.getElementById('cal-month-label').textContent=MONTHS_FR[m]+' '+y;
  var grid=document.getElementById('cal-grid');
  // keep DOW headers (first 7 children)
  while(grid.children.length>7) grid.removeChild(grid.lastChild);
  var firstDay=new Date(y,m,1).getDay();
  var daysInMonth=new Date(y,m+1,0).getDate();
  var daysInPrev=new Date(y,m,0).getDate();
  // Monday-first: 0=Sun→6, shift
  var startOffset=(firstDay===0)?6:firstDay-1;
  for(var i=0;i<startOffset;i++){
    var d=document.createElement('div');
    d.className='cal-day other-month';
    var n=document.createElement('div');n.className='cal-day-num';n.textContent=daysInPrev-startOffset+1+i;
    d.appendChild(n);grid.appendChild(d);
  }
  var today=new Date();
  for(var day=1;day<=daysInMonth;day++){
    var d=document.createElement('div');d.className='cal-day';
    var key=y+'-'+(String(m+1).padStart(2,'0'))+'-'+(String(day).padStart(2,'0'));
    d.dataset.date=key;
    if(today.getFullYear()===y&&today.getMonth()===m&&today.getDate()===day) d.classList.add('today');
    if(calState.selected===key) d.classList.add('selected');
    var n=document.createElement('div');n.className='cal-day-num';n.textContent=day;
    d.appendChild(n);
    if(calEvents[key]){
      var dotsWrap=document.createElement('div');dotsWrap.style.cssText='display:flex;gap:3px;flex-wrap:wrap;justify-content:center;margin-top:2px';
      calEvents[key].forEach(function(ev){
        var dot=document.createElement('div');dot.className='cal-dot cal-dot--'+ev.type;dotsWrap.appendChild(dot);
      });
      d.appendChild(dotsWrap);
    }
    d.onclick=function(){selectDay(this.dataset.date);};
    grid.appendChild(d);
  }
  // fill remaining cells
  var total=startOffset+daysInMonth;
  var rem=(Math.ceil(total/7)*7)-total;
  for(var i=1;i<=rem;i++){
    var d=document.createElement('div');d.className='cal-day other-month';
    var n=document.createElement('div');n.className='cal-day-num';n.textContent=i;
    d.appendChild(n);grid.appendChild(d);
  }
}
function calNav(dir){calState.month+=dir;if(calState.month>11){calState.month=0;calState.year++;}if(calState.month<0){calState.month=11;calState.year--;}renderCal();}
function selectDay(date){
  calState.selected=date;renderCal();
  var evs=calEvents[date];
  if(!evs||evs.length===0) return;
  var parts=date.split('-');
  var dayNames=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  var d=new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2]));
  var MONTHS_FR2=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  document.getElementById('cal-modal-title').textContent=dayNames[d.getDay()]+' '+parseInt(parts[2])+' '+MONTHS_FR2[parseInt(parts[1])-1]+' '+parts[0];
  var html='';
  evs.forEach(function(ev,idx){
    var typeLabel={hebdo:'Entraînement',match:'Match',sortie:'Sortie',event:'Événement'}[ev.type]||ev.type;
    var typeIcon={hebdo:'ti-ball-football',match:'ti-trophy',sortie:'ti-mountain',event:'ti-calendar-event'}[ev.type]||'ti-calendar-event';
    html+='<div class="cme-item'+(idx>0?' cme-item--sep':'')+'">';
    html+='<div class="cme-row">';
    html+='<div class="cme-icon cme-icon--'+ev.type+'"><i class="ti '+typeIcon+'"></i></div>';
    html+='<div class="cme-body">';
    html+='<div class="cme-title">'+ev.title+'</div>';
    html+='<div class="cme-meta">';
    html+='<span class="cme-meta__item"><i class="ti ti-clock"></i>'+ev.time+'</span>';
    html+='<span class="cme-meta__item"><i class="ti ti-map-pin"></i>'+ev.lieu+'</span>';
    if(ev.adversaire) html+='<span class="cme-meta__item"><i class="ti ti-shield"></i>vs '+ev.adversaire+'</span>';
    if(ev.coach) html+='<span class="cme-meta__item"><i class="ti ti-user"></i>'+ev.coach+'</span>';
    if(ev.competition) html+='<span class="cme-meta__item"><i class="ti ti-tournament"></i>'+ev.competition+'</span>';
    if(ev.distance) html+='<span class="cme-meta__item"><i class="ti ti-route"></i>'+ev.distance+'</span>';
    if(ev.denivele) html+='<span class="cme-meta__item"><i class="ti ti-trending-up"></i>'+ev.denivele+'</span>';
    html+='</div>';
    if(ev.description) html+='<div class="cme-desc cme-desc--'+ev.type+'">'+ev.description+'</div>';
    html+='<div class="cme-footer">';
    html+='<span class="cme-tag">'+typeLabel+'</span>';
    html+='<div class="rsvp" id="rsvp-'+date+'-'+idx+'"><button type="button" class="rsvp__btn rsvp__btn--yes" onclick="rsvpClick(this,\'yes\')" title="Présent"><i class="ti ti-check"></i></button><button type="button" class="rsvp__btn rsvp__btn--no" onclick="rsvpClick(this,\'no\')" title="Absent"><i class="ti ti-x"></i></button></div>';
    html+='</div>';
    html+='</div></div></div>';
  });
  document.getElementById('cal-modal-body').innerHTML=html;
  document.getElementById('cal-modal-overlay').style.display='block';
  document.getElementById('cal-modal').style.display='block';
}
function closeCalModal(){
  document.getElementById('cal-modal-overlay').style.display='none';
  document.getElementById('cal-modal').style.display='none';
}
function uploadCertif(input){
  if(input.files&&input.files[0]){
    document.getElementById('certif-name').textContent=input.files[0].name;
    document.getElementById('certif-status').style.display='block';
    document.getElementById('certif-valid-row').style.display='flex';
  }
}
function validateCertif(){
  var row=document.getElementById('certif-valid-row');
  row.innerHTML='<span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:100px;background:#dcfce7;color:#15803d;border:1px solid #86efac"><i class="ti ti-circle-check" style="margin-right:4px"></i>Validé par le club</span>';
}



(function(){
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('ustMenu');
  var closeBtn = document.getElementById('menuClose');
  if(!burger || !menu) return;

  // Nav scroll
  window.addEventListener('scroll', function(){
    if(nav) nav.classList.toggle('ust-nav--scrolled', window.scrollY > 40);
  }, {passive:true});

  function openMenu(){
    menu.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openMenu);
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);
  menu.addEventListener('click', function(e){ if(e.target === menu) closeMenu(); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  // Sous-menus
  window.toggleSub = function(btn){
    var isOpen = btn.getAttribute('aria-expanded') === 'true';
    // Ferme tous les autres
    document.querySelectorAll('.ust-menu__link[aria-expanded="true"]').forEach(function(b){
      if(b !== btn){
        b.setAttribute('aria-expanded','false');
        var s = b.parentElement.querySelector('.ust-menu__sub');
        if(s) s.classList.remove('open');
      }
    });
    // Toggle celui-ci
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    var sub = btn.parentElement.querySelector('.ust-menu__sub');
    if(sub) sub.classList.toggle('open', !isOpen);
  };
})();
