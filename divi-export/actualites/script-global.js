
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

function toggleFilter(id){
  if(window.innerWidth>1024) return;
  var body=document.getElementById(id);
  var btn=body.previousElementSibling;
  var open=body.style.display!=="none"&&body.style.display!=="";
  body.style.display=open?"none":"block";
  btn.classList.toggle("acc-open",!open);
}
function initFilters(){
  var w=window.innerWidth;
  document.querySelectorAll(".filter-body").forEach(function(b){
    b.style.display=w<=1024?"none":"block";
    var btn=b.previousElementSibling;
    if(btn) btn.classList.remove("acc-open");
  });
}
window.addEventListener("resize",initFilters);
initFilters();

function getChecked(cls){var out=[];document.querySelectorAll("."+cls+":checked").forEach(function(c){out.push(c.value);});return out;}
function applyFilters(){
  var types=getChecked("f-type"),themes=getChecked("f-theme"),years=getChecked("f-year");
  var cards=document.querySelectorAll(".actu-card");var shown=0;
  cards.forEach(function(card){
    var t=card.getAttribute("data-type"),th=card.getAttribute("data-theme"),y=card.getAttribute("data-year");
    var show=(types.length===0||types.indexOf(t)!==-1)&&(themes.length===0||themes.indexOf(th)!==-1)&&(years.length===0||years.indexOf(y)!==-1);
    card.style.display=show?"flex":"none";if(show) shown++;
  });
  document.getElementById("actu-count").textContent=shown;
  document.getElementById("actu-empty").style.display=shown===0?"block":"none";
}
function resetFilters(){document.querySelectorAll(".actu-side input[type=checkbox]").forEach(function(c){c.checked=false;});applyFilters();}
document.querySelectorAll(".actu-side input[type=checkbox]").forEach(function(c){c.addEventListener("change",applyFilters);});
function fakeSub(form){var btn=form.querySelector(".newsletter__btn");btn.textContent="Merci !";setTimeout(function(){btn.textContent="S'abonner";form.reset();},1800);return false;}



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
