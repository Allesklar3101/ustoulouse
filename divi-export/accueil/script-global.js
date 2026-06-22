
window.addEventListener('scroll',()=>{document.getElementById('nav').classList.toggle('nav--scrolled',window.scrollY>40)},{passive:true});
const burger=document.getElementById('burger'),overlay=document.getElementById('menuOverlay'),closeBtn=document.getElementById('menuClose');
function openMenu(){overlay.classList.add('open');burger.classList.add('open');document.body.style.overflow='hidden'}
function closeMenu(){overlay.classList.remove('open');burger.classList.remove('open');document.body.style.overflow=''}
burger.addEventListener('click',openMenu);
closeBtn.addEventListener('click',closeMenu);
overlay.addEventListener('click',e=>{if(e.target===overlay)closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
function makeDrag(id){
  const el=document.getElementById(id);if(!el)return;
  let down=false,sx,sl;
  el.addEventListener('mousedown',e=>{down=true;el.classList.add('dragging');sx=e.pageX;sl=el.scrollLeft});
  document.addEventListener('mouseup',()=>{down=false;el.classList.remove('dragging')});
  el.addEventListener('mousemove',e=>{if(!down)return;e.preventDefault();el.scrollLeft=sl-(e.pageX-sx)*1.6});
  el.addEventListener('touchstart',e=>{sx=e.touches[0].pageX;sl=el.scrollLeft},{passive:true});
  el.addEventListener('touchmove',e=>{el.scrollLeft=sl-(e.touches[0].pageX-sx)*1.6},{passive:true});
}
makeDrag('partTrack');makeDrag('tl');
// Popup
function openPopup(){document.getElementById('inscriptionPopup').classList.add('open');document.body.style.overflow='hidden'}
function closePopup(){document.getElementById('inscriptionPopup').classList.remove('open');document.body.style.overflow=''}
const po=document.getElementById('inscriptionPopup');
if(po){po.addEventListener('click',e=>{if(e.target===po)closePopup()})}



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
