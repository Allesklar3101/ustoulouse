// External script: https://js.stripe.com/v3/


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

var UST_CONFIG={
  stripePublicKey:'pk_live_VOTRE_CLE_STRIPE_PUBLIQUE',
  paymentIntentUrl:'/wp-json/ust/v1/create-payment-intent',
  inscriptionUrl:'/wp-admin/admin-ajax.php',
};
var stripeInstance=null,stripeElements=null;

function showStep(n){
  [1,2,3].forEach(function(i){
    var s=document.getElementById('popup-step-'+i);
    var num=document.getElementById('step-num-'+i);
    if(s) s.style.display=(i===n)?'block':'none';
    if(num) num.classList.toggle('active-step',i===n);
  });
  if(n===2) initStripePayment();
}
window.openPopup=function(){
  document.getElementById('inscriptionPopup').classList.add('open');
  document.body.style.overflow='hidden';
  showStep(1);
};
window.closePopup=function(){
  document.getElementById('inscriptionPopup').classList.remove('open');
  document.body.style.overflow='';
  setTimeout(function(){
    showStep(1);
    var f=document.getElementById('inscriptionForm');if(f) f.reset();
    var err=document.getElementById('form-error');if(err) err.style.display='none';
    stripeElements=null;stripeInstance=null;
  },400);
};
window.goStep2=function(e){
  if(e) e.preventDefault();
  var hp=document.getElementById('hp-website');if(hp&&hp.value) return;
  var nom=document.getElementById('insc-nom').value.trim();
  var prenom=document.getElementById('insc-prenom').value.trim();
  var email=document.getElementById('insc-email').value.trim();
  var tel=document.getElementById('insc-tel').value.trim();
  var errEl=document.getElementById('form-error');
  if(!nom||!prenom||!email||!tel){errEl.textContent='Merci de remplir tous les champs obligatoires (*)';errEl.style.display='block';return;}
  errEl.style.display='none';
  var data=new FormData();
  data.append('action','ust_inscription_padel');
  data.append('nom',nom);data.append('prenom',prenom);
  data.append('email',email);data.append('tel',tel);
  data.append('naissance',document.getElementById('insc-ddn').value);
  data.append('niveau',document.getElementById('insc-niveau').value);
  data.append('message',document.getElementById('insc-msg').value);
  var btn=document.getElementById('btn-step1');
  btn.textContent='Envoi en cours...';btn.disabled=true;
  fetch(UST_CONFIG.inscriptionUrl,{method:'POST',body:data})
    .then(function(r){return r.json();})
    .catch(function(){return{success:true};})
    .finally(function(){btn.textContent='Envoyer ma demande →';btn.disabled=false;showStep(2);});
};
function initStripePayment(){
  var el=document.getElementById('payment-element');
  var loading=document.getElementById('stripe-loading');
  var btnPay=document.getElementById('btn-pay');
  if(!el||stripeElements) return;
  fetch(UST_CONFIG.paymentIntentUrl,{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({amount:10000,currency:'eur',description:'Cotisation Padel UST 2025/2026',email:document.getElementById('insc-email').value})
  })
  .then(function(r){return r.json();})
  .then(function(data){
    if(!data.clientSecret) throw new Error('No clientSecret');
    stripeInstance=Stripe(UST_CONFIG.stripePublicKey);
    stripeElements=stripeInstance.elements({clientSecret:data.clientSecret,locale:'fr'});
    var payEl=stripeElements.create('payment',{layout:'tabs',defaultValues:{billingDetails:{email:document.getElementById('insc-email').value}}});
    payEl.mount('#payment-element');
    payEl.on('ready',function(){loading.style.display='none';el.style.display='block';btnPay.style.display='block';});
  })
  .catch(function(){
    loading.innerHTML='<p style="color:#dc2626;font-size:13px">⚠️ Erreur chargement paiement. <a href="https://boutique.ustoulouse.com/produit/cotisation-padel" target="_blank" style="color:var(--bleu)">Payer via la boutique →</a></p>';
  });
}
window.confirmPayment=function(){
  if(!stripeInstance||!stripeElements) return;
  var btn=document.getElementById('btn-pay');
  btn.textContent='Traitement...';btn.disabled=true;
  stripeInstance.confirmPayment({elements:stripeElements,redirect:'if_required',
    confirmParams:{return_url:window.location.href,payment_method_data:{billing_details:{email:document.getElementById('insc-email').value}}}
  }).then(function(result){
    if(result.error){
      var errEl=document.getElementById('payment-error');
      errEl.textContent=result.error.message;errEl.style.display='block';
      btn.textContent='Payer 100€ en sécurisé';btn.disabled=false;
    } else {showStep(3);}
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
