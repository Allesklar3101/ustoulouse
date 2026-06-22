
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

window.openPartPopup=function(id){
  document.querySelectorAll('.part-popup-overlay').forEach(function(p){p.classList.remove('open');});
  var p=document.getElementById('popup-'+id);
  if(p){p.classList.add('open');document.body.style.overflow='hidden';}
};
window.closePartPopup=function(){
  document.querySelectorAll('.part-popup-overlay').forEach(function(p){p.classList.remove('open');});
  document.body.style.overflow='';
};
document.querySelectorAll('.part-popup-overlay').forEach(function(p){
  p.addEventListener('click',function(e){if(e.target===p) window.closePartPopup();});
});
document.addEventListener('keydown',function(e){if(e.key==='Escape') window.closePartPopup();});



window.openDevenirPopup = function() {
  document.getElementById('dpOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeDevenirPopup = function() {
  document.getElementById('dpOverlay').classList.remove('open');
  document.body.style.overflow = '';
};
document.getElementById('dpOverlay').addEventListener('click', function(e) {
  if (e.target === this) window.closeDevenirPopup();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') window.closeDevenirPopup();
});
window.sendDevenirPartenaire = function(e) {
  e.preventDefault();
  var errEl = document.getElementById('dpError');
  var sucEl = document.getElementById('dpSuccess');
  errEl.style.display = 'none';
  sucEl.style.display = 'none';
  if (document.getElementById('dp-hp').value) return;
  var nom     = document.getElementById('dp-nom').value.trim();
  var prenom  = document.getElementById('dp-prenom').value.trim();
  var societe = document.getElementById('dp-societe').value.trim();
  var email   = document.getElementById('dp-email').value.trim();
  var tel     = document.getElementById('dp-tel').value.trim();
  var offre   = document.getElementById('dp-offre').value;
  var msg     = document.getElementById('dp-msg').value.trim();
  if (!nom || !prenom || !societe || !email) {
    errEl.textContent = 'Merci de remplir tous les champs obligatoires.';
    errEl.style.display = 'block';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errEl.textContent = 'Adresse email invalide.';
    errEl.style.display = 'block';
    return;
  }
  var btn = document.querySelector('#dpForm button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Envoi…';
  var fd = new FormData();
  fd.append('action', 'ust_devenir_partenaire');
  fd.append('nom', nom);
  fd.append('prenom', prenom);
  fd.append('societe', societe);
  fd.append('email', email);
  fd.append('tel', tel);
  fd.append('offre', offre);
  fd.append('message', msg);
  fetch('/wp-admin/admin-ajax.php', {method:'POST', body:fd})
    .then(function(r){return r.json();})
    .then(function(data){
      if (data.success) {
        document.getElementById('dpForm').style.display = 'none';
        sucEl.style.display = 'block';
      } else {
        errEl.textContent = (data.data && data.data.message) || 'Une erreur est survenue.';
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.innerHTML = '<i class="ti ti-send"></i> Envoyer ma demande';
      }
    })
    .catch(function(){
      errEl.textContent = 'Erreur réseau, veuillez réessayer.';
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.innerHTML = '<i class="ti ti-send"></i> Envoyer ma demande';
    });
};



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
