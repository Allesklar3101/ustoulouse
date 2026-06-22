
(function(){
  var nav=document.getElementById("nav");
  var burger=document.getElementById("burger");
  var overlay=document.getElementById("menuOverlay");
  var closeBtn=document.getElementById("menuClose");
  if(burger&&overlay){
    window.addEventListener("scroll",function(){if(nav) nav.classList.toggle("nav--scrolled",window.scrollY>40);},{passive:true});
    function openMenu(){overlay.classList.add("open");burger.classList.add("open");document.body.style.overflow="hidden";}
    function closeMenu(){overlay.classList.remove("open");burger.classList.remove("open");document.body.style.overflow="";}
    burger.addEventListener("click",openMenu);
    if(closeBtn) closeBtn.addEventListener("click",closeMenu);
    overlay.addEventListener("click",function(e){if(e.target===overlay) closeMenu();});
    document.addEventListener("keydown",function(e){if(e.key==="Escape") closeMenu();});
  }
})();
function copyLink(btn){
  var done=function(){var i=btn.querySelector("i");if(i){i.className="ti ti-check";setTimeout(function(){i.className="ti ti-link";},1500);}};
  if(navigator.clipboard){navigator.clipboard.writeText(window.location.href).then(done,done);}else{done();}
}
function fakeSub(form){var b=form.querySelector("button");var t=b.textContent;b.textContent="Merci !";setTimeout(function(){b.textContent=t;form.reset();},1800);return false;}
function fakeComment(form){var b=form.querySelector("button");b.textContent="Envoyé !";setTimeout(function(){b.textContent="Publier le commentaire";form.reset();},1800);return false;}



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
