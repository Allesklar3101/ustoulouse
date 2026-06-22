
/* nav + hamburger menu */
(function(){
  var nav=document.getElementById('nav');
  var burger=document.getElementById('burger');
  var overlay=document.getElementById('menuOverlay');
  var closeBtn=document.getElementById('menuClose');
  if(nav) window.addEventListener('scroll',function(){nav.classList.toggle('nav--scrolled',window.scrollY>40);},{passive:true});
  if(!burger||!overlay) return;
  function openMenu(){overlay.classList.add('open');burger.classList.add('open');document.body.style.overflow='hidden';}
  function closeMenu(){overlay.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';}
  burger.addEventListener('click',openMenu);
  if(closeBtn) closeBtn.addEventListener('click',closeMenu);
  overlay.addEventListener('click',function(e){if(e.target===overlay) closeMenu();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') closeMenu();});
})();
/* m2 preview */
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



/* ===== BOUTIQUE ===== */
var SVG_SHIRT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4l5 2-1.5 4-2-1v9h-9V9l-2 1L4 6l5-2"/><path d="M9 4a3 3 0 0 0 6 0"/></svg>';
var SVG_JACKET='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4l4 2-1 4-2-1v11H7V9L5 10 4 6l4-2"/><path d="M12 4v15"/><path d="M10.5 9h3"/></svg>';
var SVG_BAG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1 11H5L4 8z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M9 8h6"/></svg>';
var SVG_CAP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16a9 9 0 0 1 18 0"/><path d="M3 16h18a2 2 0 0 1 0 4H3z"/><path d="M12 7v9"/></svg>';
var SVG_PANTS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l.5 18h-4L12 9l-1.5 12h-4z"/><path d="M7 3h10"/></svg>';
var SVG_SOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h6v8l3.5 3.5a3.5 3.5 0 0 1-5 5L8 16V3z"/><path d="M8 3v0"/></svg>';
var products=[
  {id:0,name:'Sac Joueur Trolley',price:'79,99',brand:'Joma',collection:'Sport',cat:'Accessoires',
   desc:"Sac de sport Trolley Joma avec roues et poignée télescopique. Grande capacité, poche à chaussures séparée, bandoulière réglable. Idéal pour transporter tout votre équipement en déplacement.",
   colors:['Noir','Marine'],sizes:[],color:'#1a1a2e'},
  {id:1,name:'Maillot Joma Entraînement Manche Longue',price:'24,99',brand:'Joma',collection:'Sport',cat:'Maillot',
   desc:"Maillot d'entraînement manches longues Joma aux couleurs de l'UST Toulouse. Tissu léger et respirant, coupe semi-ajustée. Technologie Dry-Control pour une évacuation optimale de l'humidité.",
   colors:['Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#064e89'},
  {id:2,name:'Maillot Joma Entraînement Manches Courtes',price:'21,99',brand:'Joma',collection:'Sport',cat:'Maillot',
   desc:"Maillot d'entraînement manches courtes Joma aux couleurs de l'UST Toulouse. Matière légère et respirante avec technologie Dry-Control. Coupe semi-ajustée pour une liberté de mouvement totale.",
   colors:['Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#064e89'},
  {id:3,name:'Maillot Nike Entraînement Manches Courtes',price:'22,00',brand:'Nike',collection:'Sport',cat:'Maillot',
   desc:"Maillot d'entraînement Nike Dri-FIT aux couleurs du club. Tissu Dri-FIT qui évacue la transpiration pour rester au sec. Coupe droite confortable, idéale pour tous les entraînements.",
   colors:['Marine','Noir'],sizes:['XS','S','M','L','XL','XXL'],color:'#064e89'},
  {id:4,name:'Short Nike Entraînement',price:'14,99',brand:'Nike',collection:'Sport',cat:'Short',
   desc:"Short d'entraînement Nike Dri-FIT léger et confortable. Taille élastique avec cordon de serrage, poches latérales. Tissu respirant pour une pratique sportive optimale.",
   colors:['Marine','Noir'],sizes:['XS','S','M','L','XL','XXL'],color:'#064e89'},
  {id:5,name:'Chaussettes Nike Entraînement',price:'16,99',brand:'Nike',collection:'Sport',cat:'Chaussettes',
   desc:"Lot de chaussettes Nike performance aux couleurs de l'UST Toulouse. Amorti ciblé sous le pied, renfort au talon et à la pointe. Technologie Dri-FIT pour garder les pieds au sec.",
   colors:['Marine'],sizes:['36-40','41-45'],color:'#064e89'},
  {id:6,name:'Pantalon Nike Entraînement',price:'34,99',brand:'Nike',collection:'Sport',cat:'Pantalon',
   desc:"Pantalon d'entraînement Nike Dri-FIT avec technologie d'évacuation de l'humidité. Taille élastique avec cordon, poches à fermeture éclair, bas de jambe zippé. Confort et liberté de mouvement.",
   colors:['Marine','Noir'],sizes:['XS','S','M','L','XL','XXL'],color:'#1a1a2e'},
  {id:7,name:'Veste Nike Entraînement',price:'33,99',brand:'Nike',collection:'Sport',cat:'Veste',
   desc:"Veste d'entraînement Nike légère et résistante à l'eau. Capuche intégrée, fermeture zippée intégrale, poches latérales zippées. Parfaite pour l'échauffement et les jours pluvieux.",
   colors:['Marine','Noir'],sizes:['XS','S','M','L','XL','XXL'],color:'#1a1a2e'},
  {id:8,name:'Polo Nike Entraînement',price:'29,90',brand:'Nike',collection:'Sport',cat:'Polo',
   desc:"Polo Nike Dri-FIT aux couleurs de l'UST Toulouse. Tissu piqué respirant, col boutonné, coupe droite. Polyvalent, il peut se porter aussi bien à l'entraînement qu'en dehors du terrain.",
   colors:['Marine','Blanc'],sizes:['XS','S','M','L','XL','XXL'],color:'#064e89'},
  {id:9,name:'Short Joma Entraînement',price:'16,30',brand:'Joma',collection:'Sport',cat:'Short',
   desc:"Short d'entraînement Joma confortable et léger. Taille élastique avec cordon de serrage, poches latérales. Tissu Dry-Control pour une bonne gestion de la transpiration pendant l'effort.",
   colors:['Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#064e89'},
  {id:10,name:'Casquette Joma',price:'13,90',brand:'Joma',collection:'Sport',cat:'Accessoires',
   desc:"Casquette Joma aux couleurs de l'UST Toulouse. Visière courbe, fermeture réglable au dos. Tissu léger et respirant, protection solaire pendant les entraînements et matchs en plein air.",
   colors:['Marine','Noir'],sizes:['Taille unique'],color:'#064e89'},
  {id:11,name:'Survêtement Joma',price:'69,99',brand:'Joma',collection:'Sport',cat:'Survêtement',
   desc:"Survêtement complet Joma (veste + pantalon) aux couleurs de l'UST Toulouse. Tissu doux et confortable, coupe droite. Idéal pour l'échauffement, les déplacements et un usage quotidien.",
   colors:['Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#064e89'},
  {id:12,name:'Sac Joueur',price:'49,99',brand:'Joma',collection:'Sport',cat:'Accessoires',
   desc:"Sac de sport Joma grande capacité aux couleurs du club. Double compartiment principal, poche à chaussures ventilée, bandoulière réglable. Robuste et pratique pour tous vos équipements.",
   colors:['Marine','Noir'],sizes:[],color:'#1a1a2e'},
  {id:13,name:'Maillot Nike Entraînement Manches Longues',price:'24,99',brand:'Nike',collection:'Sport',cat:'Maillot',
   desc:"Maillot d'entraînement Nike manches longues avec technologie Dri-FIT. Tissu respirant qui évacue la transpiration. Idéal pour les entraînements par temps frais, coupe semi-ajustée.",
   colors:['Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#064e89'},
  {id:14,name:'Polo Nike Mode',price:'38,99',brand:'Nike',collection:'Mode',cat:'Polo',
   desc:"Polo Nike Dri-FIT design premium pour un look sport-chic. Tissu piqué stretch, col côtelé, micro-logo brodé. Parfait pour le quotidien ou les sorties club en dehors du terrain.",
   colors:['Gris','Marine','Blanc'],sizes:['XS','S','M','L','XL','XXL'],color:'#6b7280'},
  {id:15,name:'Short Nike Mode',price:'24,99',brand:'Nike',collection:'Mode',cat:'Short',
   desc:"Short Nike sportswear au style décontracté. Tissu French Terry léger et confortable, poches latérales, taille élastique avec cordon. Parfait pour le quotidien.",
   colors:['Gris','Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#6b7280'},
  {id:16,name:'Pantalon Nike Mode',price:'44,99',brand:'Nike',collection:'Mode',cat:'Pantalon',
   desc:"Pantalon Nike sportswear coupe slim. Tissu French Terry confortable, taille élastique, poches avant et arrière. Style casual-sport pour un look moderne au quotidien.",
   colors:['Gris','Marine','Noir'],sizes:['XS','S','M','L','XL','XXL'],color:'#6b7280'},
  {id:17,name:'Sweatshirt Nike Mode',price:'63,99',brand:'Nike',collection:'Mode',cat:'Survêtement',
   desc:"Sweatshirt Nike Club Fleece au style premium. Tissu molletonné intérieur doux et chaud, coupe ample, col ras du cou. Incontournable du vestiaire casual.",
   colors:['Gris','Marine','Noir'],sizes:['XS','S','M','L','XL','XXL'],color:'#6b7280'},
  {id:18,name:'Doudoune 3 en 1 Nike',price:'159,99',brand:'Nike',collection:'Mode',cat:'Manteau',
   desc:"Veste 3 en 1 Nike Storm-FIT : doudoune intérieure + veste imperméable portables séparément ou combinées. Isolation légère, résistance au vent et à la pluie. Idéale pour affronter toutes les conditions météo.",
   colors:['Noir','Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#1a1a2e'},
  {id:19,name:'Veste de Pluie Nike',price:'58,99',brand:'Nike',collection:'Sport',cat:'Veste',
   desc:"Coupe-vent/veste de pluie Nike léger et compactable. Tissu imperméable et coupe-vent, capuche ajustable, coutures soudées. Se range dans sa propre poche, parfait pour les jours de match imprévisibles.",
   colors:['Noir','Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#1a1a2e'},
  {id:20,name:'Manteau 3/4 Joma',price:'117,10',brand:'Joma',collection:'Sport',cat:'Manteau',
   desc:"Manteau 3/4 Joma pour staff et dirigeants. Longueur trois-quarts pour une protection maximale, fermeture zippée intégrale, poches à fermeture. Isolant et imperméable pour rester au chaud sur le bord du terrain.",
   colors:['Marine','Noir'],sizes:['XS','S','M','L','XL','XXL'],color:'#1a1a2e'},
  {id:21,name:'Manteau Bomber Joma',price:'73,50',brand:'Joma',collection:'Mode',cat:'Manteau',
   desc:"Veste Bomber Joma Urban IV au style classique. Fermeture éclair avec col montant, capuche amovible et ajustable, poches latérales et poche intérieure. Tissu 100% Polyester résistant et durable.",
   colors:['Noir','Marine'],sizes:['XS','S','M','L','XL','XXL'],color:'#1a1a2e'},
  {id:22,name:'Gants Nike',price:'25,00',brand:'Nike',collection:'Sport',cat:'Accessoires',
   desc:"Gants d'entraînement Nike pour temps froids. Tissu technique respirant avec grip sur la paume, poignets ajustables. Compatibles écran tactile pour garder vos mains au chaud sans quitter vos appareils.",
   colors:['Noir'],sizes:['S','M','L','XL'],color:'#1a1a2e'},
  {id:23,name:'Bonnet Nike',price:'19,99',brand:'Nike',collection:'Sport',cat:'Accessoires',
   desc:"Bonnet Nike Fleece ajusté pour l'hiver. Tissu molletonné chaud et confortable, revers replié, logo brodé. Maintient la chaleur pendant les entraînements et matchs par temps froid.",
   colors:['Noir','Marine'],sizes:['Taille unique'],color:'#1a1a2e'}
];
var cart=[];
var currentProduct=null, qty=1;
var selectedSize=null, selectedColor=null, currentPhotos=[], currentPhotoIdx=0;
var COLOR_MAP={'Marine':'#0b2240','Noir':'#1a1a1a','Blanc':'#f8f8f6',
  'Gris':'#9ca3af','Bleu':'#064e89','Rouge':'#dc2626','Brun':'#8b664b'};

/* Codes promo (à synchroniser avec WooCommerce) : type 'percent' ou 'fixed' */
var PROMO_CODES={
  'UST10':{type:'percent',value:10,label:'Code UST10 (-10%)'},
  'BIENVENUE':{type:'fixed',value:5,label:'Code BIENVENUE (-5 €)'},
  'CLUB15':{type:'percent',value:15,label:'Code CLUB15 (-15%)'}
};
var appliedPromo=null;

function applyPromo(){
  var input=document.getElementById('ck-promo');
  var msg=document.getElementById('promo-msg');
  if(!input) return;
  var code=input.value.trim().toUpperCase();
  if(!code){ if(msg){msg.textContent='Entrez un code promo.';msg.className='promo-msg err';} return; }
  if(PROMO_CODES[code]){
    appliedPromo=Object.assign({code:code},PROMO_CODES[code]);
    if(msg){msg.textContent='✓ '+appliedPromo.label+' appliqué.';msg.className='promo-msg ok';}
  } else {
    appliedPromo=null;
    if(msg){msg.textContent='Code promo invalide.';msg.className='promo-msg err';}
  }
  updateCkTotals();
}

function toggleSameAddress(){
  var same=document.getElementById('ck-same-adresse');
  var fields=document.getElementById('adresse-fields');
  if(fields) fields.style.display=(same&&same.checked)?'none':'';
}

function updateDelivery(){
  var v=document.querySelector('input[name="livraison"]:checked');
  var wrap=document.getElementById('adresse-wrap');
  var ckShip=document.getElementById('ckShipping');
  if(!v) return;
  if(v.value==='livraison'){if(wrap)wrap.style.display='';if(ckShip)ckShip.textContent='10,00 €';}
  else{if(wrap)wrap.style.display='none';if(ckShip)ckShip.textContent='Gratuit';}
  updateCkTotals();
}
function updateCkTotals(){
  var sub=cartTotal();
  var ship=0;
  var v=document.querySelector('input[name="livraison"]:checked');
  if(v&&v.value==='livraison') ship=10;
  // remise promo
  var discount=0;
  if(appliedPromo){
    discount=appliedPromo.type==='percent'?sub*appliedPromo.value/100:appliedPromo.value;
    if(discount>sub) discount=sub;
  }
  var s=document.getElementById('ckSubtotal');if(s)s.textContent=formatEuro(sub);
  var dRow=document.getElementById('ck-discount-row');
  var dEl=document.getElementById('ckDiscount');
  var dLabel=document.getElementById('ck-discount-label');
  if(discount>0){
    if(dRow)dRow.style.display='';
    if(dEl)dEl.textContent='-'+formatEuro(discount);
    if(dLabel)dLabel.textContent='Remise'+(appliedPromo?' ('+appliedPromo.code+')':'');
  } else if(dRow){ dRow.style.display='none'; }
  var t=document.getElementById('ckTotal');if(t)t.textContent=formatEuro(sub-discount+ship);
}

/* --- Icône SVG selon la catégorie --- */
function catIcon(cat){
  switch(cat){
    case 'Maillot': case 'Polo': return SVG_SHIRT;
    case 'Veste': case 'Manteau': case 'Survêtement': return SVG_JACKET;
    case 'Pantalon': case 'Short': return SVG_PANTS;
    case 'Chaussettes': return SVG_SOCK;
    default: return SVG_BAG; /* Accessoires */
  }
}

/* --- Utilitaires prix --- */
function unitPrice(p){return parseFloat(String(p.price).replace(',','.'))||0;}
function formatEuro(n){return n.toFixed(2).replace('.',',')+' €';}
function cartTotal(){return cart.reduce(function(s,i){return s+i.unitPrice*i.qty;},0);}

/* ===== FILTRES "AJAX" (100% client) ===== */
var filterState={search:'', cats:new Set(), brands:new Set()};

(function buildFilters(){
  var cats=Array.from(new Set(products.map(function(p){return p.cat;}))).sort();
  var brands=Array.from(new Set(products.map(function(p){return p.brand;}))).sort();
  var cBox=document.getElementById('catFilters');
  var bBox=document.getElementById('brandFilters');
  if(cBox) cBox.innerHTML=cats.map(function(c,i){
    return '<div class="filter-check"><input type="checkbox" id="cat-'+i+'" value="'+c+'" onchange="toggleFilter(\'cats\',this)"><label for="cat-'+i+'">'+c+'</label></div>';
  }).join('');
  if(bBox) bBox.innerHTML=brands.map(function(b,i){
    return '<div class="filter-check"><input type="checkbox" id="brand-'+i+'" value="'+b+'" onchange="toggleFilter(\'brands\',this)"><label for="brand-'+i+'">'+b+'</label></div>';
  }).join('');
})();

function toggleFilter(group,el){
  if(el.checked) filterState[group].add(el.value); else filterState[group].delete(el.value);
  applyFilters();
}
var _searchTimer=null;
function onSearchInput(){
  clearTimeout(_searchTimer);
  _searchTimer=setTimeout(function(){
    filterState.search=document.getElementById('searchInput').value.trim().toLowerCase();
    applyFilters();
  },150);
}
function applyFilters(){
  var q=filterState.search;
  var list=products.filter(function(p){
    var matchSearch=!q || (p.name+' '+(p.desc||'')).toLowerCase().indexOf(q)>-1;
    var matchCat=filterState.cats.size===0 || filterState.cats.has(p.cat);
    var matchBrand=filterState.brands.size===0 || filterState.brands.has(p.brand);
    return matchSearch && matchCat && matchBrand;
  });
  renderProducts(list);
  var rc=document.getElementById('resultCount');
  if(rc) rc.textContent=list.length+' article'+(list.length>1?'s':'');
}
function clearFilters(){
  filterState={search:'', cats:new Set(), brands:new Set()};
  var si=document.getElementById('searchInput'); if(si) si.value='';
  document.querySelectorAll('.shop-sidebar input[type=checkbox]').forEach(function(c){c.checked=false;});
  applyFilters();
}
function toggleFilterGroup(id){
  if(window.innerWidth>768) return;
  var el=document.getElementById(id);
  if(el) el.classList.toggle('filter-open');
}

/* ===== GRILLE PRODUITS ===== */
function renderProducts(list){
  var grid=document.getElementById('productGrid');
  if(!grid) return;
  if(!list.length){grid.innerHTML='<p class="shop-empty">Aucun article ne correspond à votre recherche.</p>';return;}
  grid.innerHTML=list.map(function(p){
    return '<div class="product-card" onclick="openProduct('+p.id+')">'
      /* Placeholder image : déposer un vrai <img src="..."> ici plus tard (voir data-img) */
      +'<div class="product-card__img" data-img="" style="background:'+p.color+'">'
        +'<span class="product-card__badge badge--'+p.collection+'">'+p.collection+'</span>'
        +catIcon(p.cat)
      +'</div>'
      +'<div class="product-card__body">'
        +'<span class="product-card__cat">'+p.cat+'</span>'
        +'<span class="product-card__name">'+p.name+'</span>'
        +'<span class="product-card__price">'+p.price+' €</span>'
      +'</div></div>';
  }).join('');
}

/* ===== MODALE PRODUIT ===== */
function openProduct(id){
  currentProduct=products[id]; qty=1; selectedSize=null; selectedColor=null;
  currentPhotos=currentProduct.photos&&currentProduct.photos.length?currentProduct.photos:[{src:''}];
  currentPhotoIdx=0;
  // Right-side body
  var body=document.getElementById('productModalBody');
  if(!body) return;
  var colorHtml='';
  if(currentProduct.colors&&currentProduct.colors.length){
    colorHtml='<p class="pm-label" style="margin-bottom:6px;font-size:12px;font-weight:700;letter-spacing:.5px">Couleur</p>'
      +'<div class="swatch-row" id="swatchRow">'
      +currentProduct.colors.map(function(c){
        var hex=COLOR_MAP[c]||'#999';
        return '<span class="swatch'+(c==='Blanc'?' swatch--blanc':'')+'" data-color="'+c+'" style="background:'+hex+'" title="'+c+'" onclick="selectSwatch(this,\''+c+'\')"></span>';
      }).join('')+'</div>';
  }
  var sizeHtml='';
  if(currentProduct.sizes&&currentProduct.sizes.length){
    sizeHtml='<div class="pm-select-row"><label>Taille</label>'
      +'<select id="selSize" onchange="selectedSize=this.value"><option value="" disabled selected>Choisir une taille</option>'
      +currentProduct.sizes.map(function(s){return '<option>'+s+'</option>';}).join('')
      +'</select></div>';
  }
  body.innerHTML=''
    +'<p class="product-card__cat">'+currentProduct.cat+'</p>'
    +'<h3 style="font-size:20px;font-weight:900;text-transform:uppercase;color:var(--bleu);margin-bottom:8px">'+currentProduct.name+'</h3>'
    +'<p style="font-size:26px;font-weight:800;color:var(--bleu);margin-bottom:14px">'+currentProduct.price+' €</p>'
    +'<p style="font-size:14px;color:var(--gris-muted);line-height:1.7;margin-bottom:20px">'+currentProduct.desc+'</p>'
    +colorHtml+sizeHtml
    +'<div class="pm-qty-add">'
    +'<div class="qty-row"><button class="qty-btn" onclick="changeQty(-1)">&minus;</button>'
    +'<span id="qtyVal" class="qty-val">1</span>'
    +'<button class="qty-btn" onclick="changeQty(1)">+</button></div>'
    +'<button class="btn btn--brun" onclick="addToCart()" style="flex:1;justify-content:center">Ajouter au panier</button>'
    +'</div>'
    +'<p style="font-size:12px;color:var(--gris-muted);margin-top:12px;text-align:center"><i class="ti ti-truck-delivery"></i> Livraison offerte dès 60 € d\'achat</p>';
  renderModalPhoto(0);
  openModal('productModal');
}
function selectSwatch(el,colorName){
  document.querySelectorAll('#swatchRow .swatch').forEach(function(s){s.classList.remove('active');});
  el.classList.add('active'); selectedColor=colorName;
}
function renderModalPhoto(idx){
  var main=document.getElementById('pmMainPhoto');
  var thumbsEl=document.getElementById('pmThumbs');
  if(!main) return;
  var ph=currentPhotos[idx];
  if(ph&&ph.src){
    main.innerHTML='<img src="'+ph.src+'" alt="" style="width:100%;height:100%;object-fit:contain">';
  } else {
    main.innerHTML='<div style="width:100%;height:100%;min-height:320px;display:flex;align-items:center;justify-content:center;background:'+currentProduct.color+';font-size:80px;color:rgba(255,255,255,.4)">'+catIcon(currentProduct.cat)+'</div>';
  }
  if(thumbsEl){
    thumbsEl.innerHTML=currentPhotos.map(function(ph2,i){
      if(ph2.src) return '<img class="pm-thumb'+(i===idx?' active':'')+'" src="'+ph2.src+'" onclick="setPhoto('+i+')">';
      return '<div class="pm-thumb pm-thumb--placeholder'+(i===idx?' active':'')+'" onclick="setPhoto('+i+')" style="background:'+currentProduct.color+'80">'+catIcon(currentProduct.cat)+'</div>';
    }).join('');
    thumbsEl.style.display=currentPhotos.length>1?'flex':'none';
  }
  var prev=document.querySelector('.pm-carousel__nav--prev');
  var next=document.querySelector('.pm-carousel__nav--next');
  if(prev) prev.classList.toggle('visible',currentPhotos.length>1);
  if(next) next.classList.toggle('visible',currentPhotos.length>1);
  currentPhotoIdx=idx;
}
function setPhoto(i){renderModalPhoto(i);}
function photoNav(d){renderModalPhoto((currentPhotoIdx+d+currentPhotos.length)%currentPhotos.length);}
function closeProduct(){closeModal('productModal');}
function changeQty(d){qty=Math.max(1,qty+d);var el=document.getElementById('qty');if(el)el.textContent=qty;}

/* ===== AJOUT AU PANIER ===== */
function addToCart(){
  if(!currentProduct) return;
  if(currentProduct.colors&&currentProduct.colors.length&&!selectedColor){
    alert('Merci de choisir une couleur.');return;
  }
  if(currentProduct.sizes&&currentProduct.sizes.length){
    var ss=document.getElementById('selSize');
    selectedSize=ss?ss.value:'';
    if(!selectedSize){alert('Merci de choisir une taille.');return;}
  }
  cart.push({id:currentProduct.id,name:currentProduct.name,price:currentProduct.price,
    color:selectedColor,size:selectedSize||'',qty:qty,
    cat:currentProduct.cat,colorHex:currentProduct.color,
    img:(currentProduct.photos&&currentProduct.photos[0])||'',
    unitPrice:parseFloat(currentProduct.price.replace(',','.'))});
  updateCartBadge();
  toast('Article ajouté au panier ✓');
  closeProduct();
}

/* ===== BADGES PANIER ===== */
function updateCartBadge(){
  var n=cart.reduce(function(s,i){return s+i.qty;},0);
  var fc=document.getElementById('floatCartCount');
  if(fc){fc.textContent=n;fc.style.display=n>0?'flex':'none';}
  var nc=document.getElementById('cartCount');
  if(nc){nc.textContent=n;nc.style.display=n>0?'flex':'none';}
}
function changeCartQty(i,d){cart[i].qty=Math.max(1,cart[i].qty+d);updateCartBadge();renderRecap();}
function removeFromCart(i){cart.splice(i,1);updateCartBadge();renderRecap();}

/* ===== MINIATURE PRODUIT (photo si dispo, sinon placeholder coloré) ===== */
function cartThumb(it){
  if(it.img){
    return '<div class="cart-line__thumb" style="background:#f0f0f0"><img src="'+it.img+'" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px"></div>';
  }
  var bg=it.colorHex||'#999';
  return '<div class="cart-line__thumb" style="background:'+bg+'">'+catIcon(it.cat)+'</div>';
}

/* ===== POPUP RÉCAP ===== */
function renderRecap(){
  var box=document.getElementById('recapItems');
  if(!cart.length){box.innerHTML='<p class="cart-empty">Votre panier est vide</p>';}
  else{
    box.innerHTML=cart.map(function(it,idx){
      var meta=[];
      if(it.size) meta.push('Taille: '+it.size);
      if(it.color) meta.push('Couleur: '+it.color);
      return '<div class="cart-line" style="display:flex;align-items:center;gap:10px">'
        +cartThumb(it)
        +'<div class="cart-line__info" style="flex:1;min-width:0">'
          +'<div class="cart-line__name">'+it.name+'</div>'
          +'<div class="cart-line__meta">'+(meta.join(' · ')||'&nbsp;')+'</div>'
          +'<div class="cart-line__ctrl"><button onclick="changeCartQty('+idx+',-1)">&minus;</button><span>'+it.qty+'</span><button onclick="changeCartQty('+idx+',1)">+</button></div>'
        +'</div>'
        +'<div style="text-align:right;flex-shrink:0"><div class="cart-line__price">'+formatEuro(it.unitPrice*it.qty)+'</div><button class="cart-line__rm" onclick="removeFromCart('+idx+')">&times;</button></div>'
      +'</div>';
    }).join('');
  }
  document.getElementById('recapTotal').textContent=formatEuro(cartTotal());
  var btn=document.getElementById('recapCheckoutBtn');
  if(btn) btn.style.display=cart.length?'inline-flex':'none';
}
function openCartRecap(){renderRecap();openModal('cartRecap');}
function closeCartRecap(){closeModal('cartRecap');}

/* ===== POPUP CHECKOUT ===== */
function renderCheckoutSummary(){
  var box=document.getElementById('checkoutSummary');
  var lines=cart.length?cart.map(function(it){
    return '<div class="os-line">'
      +cartThumb(it)
      +'<span class="os-line__name">'+it.name+(it.size?' ('+it.size+')':'')+' ×'+it.qty+'</span>'
      +'<span class="os-line__price">'+formatEuro(it.unitPrice*it.qty)+'</span>'
    +'</div>';
  }).join(''):'<p class="cart-empty">Votre panier est vide</p>';
  box.innerHTML=lines+'<div class="os-total"><span>Total</span><span>'+formatEuro(cartTotal())+'</span></div>';
}
function openCheckout(){
  updateCkTotals();
  if(!cart.length){alert('Votre panier est vide');return;}
  closeCartRecap();
  renderCheckoutSummary();
  openModal('checkoutModal');
}
function closeCheckout(){closeModal('checkoutModal');}

function handleStripeCheckout(){
  if(!cart.length){alert('Votre panier est vide.');return;}
  var email=(document.getElementById('ck-email')||{}).value||'';
  var nom=(document.getElementById('ck-nom')||{}).value||'';
  if(!email.trim()||!nom.trim()){alert('Merci de renseigner votre prénom, nom et email.');return;}
  // adresse de facturation obligatoire
  var fAdr=(document.getElementById('ck-fact-adresse')||{}).value||'';
  var fCp=(document.getElementById('ck-fact-cp')||{}).value||'';
  var fVille=(document.getElementById('ck-fact-ville')||{}).value||'';
  if(!fAdr.trim()||!fCp.trim()||!fVille.trim()){alert('Merci de renseigner votre adresse de facturation.');return;}
  // adresse de livraison si différente
  var v=document.querySelector('input[name="livraison"]:checked');
  if(v&&v.value==='livraison'){
    var same=document.getElementById('ck-same-adresse');
    if(!same||!same.checked){
      var adr=(document.getElementById('ck-adresse')||{}).value||'';
      var cp=(document.getElementById('ck-cp')||{}).value||'';
      if(!adr.trim()||!cp.trim()){alert('Merci de renseigner votre adresse de livraison.');return;}
    }
  }
  alert('Redirection vers le paiement sécurisé Stripe...');
}

/* ===== GESTION MODALES ===== */
function openModal(id){var m=document.getElementById(id);if(m){m.classList.add('open');document.body.style.overflow='hidden';}}
function closeModal(id){var m=document.getElementById(id);if(m){m.classList.remove('open');}if(!document.querySelector('.product-modal.open,.shop-pop.open')){document.body.style.overflow='';}}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    ['productModal','cartRecap','checkoutModal'].forEach(function(id){
      var m=document.getElementById(id);
      if(m&&m.classList.contains('open')) closeModal(id);
    });
  }
});

/* ===== TOAST ===== */
function toast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._tm);
  t._tm=setTimeout(function(){t.classList.remove('show');},2500);
}

/* ===== INIT ===== */
applyFilters();
updateCartBadge();



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
