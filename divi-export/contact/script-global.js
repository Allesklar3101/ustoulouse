
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

window.sendContact = function(e){
  e.preventDefault();
  var hp=document.getElementById('hp-contact');
  if(hp&&hp.value) return;
  var nom=document.getElementById('ct-nom').value.trim();
  var email=document.getElementById('ct-email').value.trim();
  var msg=document.getElementById('ct-msg').value.trim();
  var errEl=document.getElementById('contact-error');
  var okEl=document.getElementById('contact-success');
  if(!nom||!email||!msg){
    errEl.textContent='Merci de remplir les champs obligatoires (*).';
    errEl.style.display='block';
    return;
  }
  errEl.style.display='none';
  var btn=document.getElementById('btn-contact');
  btn.textContent='Envoi en cours...';btn.disabled=true;
  var data=new FormData();
  data.append('action','ust_contact');
  data.append('nom',nom);
  data.append('prenom',document.getElementById('ct-prenom').value.trim());
  data.append('email',email);
  data.append('tel',document.getElementById('ct-tel').value.trim());
  data.append('motif',document.getElementById('ct-motif').value);
  data.append('message',msg);
  fetch('/wp-admin/admin-ajax.php',{method:'POST',body:data})
    .then(function(r){return r.json();})
    .catch(function(){return{success:true};})
    .finally(function(){
      btn.innerHTML='<i class="ti ti-send" style="font-size:16px"></i>Envoyer le message';
      btn.disabled=false;
      okEl.style.display='block';
      document.getElementById('contactForm').reset();
    });
};

window.openPartPopup = function(id){
  document.querySelectorAll('.part-popup-overlay').forEach(function(p){p.classList.remove('open');});
  var p=document.getElementById('popup-'+id);
  if(p){p.classList.add('open');document.body.style.overflow='hidden';}
};
window.closePartPopup = function(){
  document.querySelectorAll('.part-popup-overlay').forEach(function(p){p.classList.remove('open');});
  document.body.style.overflow='';
};
document.querySelectorAll('.part-popup-overlay').forEach(function(p){
  p.addEventListener('click',function(e){if(e.target===p) window.closePartPopup();});
});

document.querySelectorAll('.faq-col').forEach(function(col){
  var items = col.querySelectorAll('.faq-item');
  items.forEach(function(item){
    item.querySelector('.faq-question').addEventListener('click',function(){
      var wasOpen = item.classList.contains('open');
      items.forEach(function(i){i.classList.remove('open');});
      if(!wasOpen) item.classList.add('open');
    });
  });
});



(function(){
  var prev=document.getElementById('m2Preview');
  if(!prev) return;
  var rows=document.querySelectorAll('.m2__row');
  var ico=prev.querySelector('.m2__pv-ico i');
  var ttl=prev.querySelector('.m2__pv-title');
  var dsc=prev.querySelector('.m2__pv-desc');
  function set(r){
    rows.forEach(function(x){x.classList.remove('active');});
    r.classList.add('active');
    ico.className='ti '+r.getAttribute('data-ico');
    ttl.textContent=r.getAttribute('data-title');
    dsc.textContent=r.getAttribute('data-desc');
    prev.classList.remove('m2__preview--in');void prev.offsetWidth;prev.classList.add('m2__preview--in');
  }
  rows.forEach(function(r){
    r.addEventListener('mouseenter',function(){set(r);});
    r.addEventListener('focus',function(){set(r);});
  });
  if(rows[0]) rows[0].classList.add('active');
})();



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
