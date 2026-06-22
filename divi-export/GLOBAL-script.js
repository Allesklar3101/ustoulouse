(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── MENU HAMBURGER ── */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('ustMenu');
  var closeBtn = document.getElementById('menuClose');

  function openMenu() {
    if (!menu || !burger) return;
    menu.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger) burger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menu) menu.addEventListener('click', function (e) { if (e.target === menu) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ── MENU PREVIEW (survol items) ── */
  var m2Preview = document.getElementById('m2Preview');
  if (m2Preview) {
    var rows = document.querySelectorAll('.m2__row');
    var ico = m2Preview.querySelector('.m2__pv-ico i');
    var ttl = m2Preview.querySelector('.m2__pv-title');
    var dsc = m2Preview.querySelector('.m2__pv-desc');
    function setPreview(r) {
      rows.forEach(function (x) { x.classList.remove('active'); });
      r.classList.add('active');
      if (ico) ico.className = 'ti ' + r.getAttribute('data-ico');
      if (ttl) ttl.textContent = r.getAttribute('data-title');
      if (dsc) dsc.textContent = r.getAttribute('data-desc');
      m2Preview.classList.remove('m2__preview--in');
      void m2Preview.offsetWidth;
      m2Preview.classList.add('m2__preview--in');
    }
    rows.forEach(function (r) {
      r.addEventListener('mouseenter', function () { setPreview(r); });
      r.addEventListener('focus', function () { setPreview(r); });
    });
    if (rows[0]) rows[0].classList.add('active');
  }

  /* ── DRAG SCROLL HORIZONTAL ── */
  function makeDrag(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var down = false, sx, sl;
    el.addEventListener('mousedown', function (e) {
      down = true; el.classList.add('dragging'); sx = e.pageX; sl = el.scrollLeft;
    });
    document.addEventListener('mouseup', function () {
      down = false; el.classList.remove('dragging');
    });
    el.addEventListener('mousemove', function (e) {
      if (!down) return;
      e.preventDefault();
      el.scrollLeft = sl - (e.pageX - sx) * 1.6;
    });
    el.addEventListener('touchstart', function (e) {
      sx = e.touches[0].pageX; sl = el.scrollLeft;
    }, { passive: true });
    el.addEventListener('touchmove', function (e) {
      el.scrollLeft = sl - (e.touches[0].pageX - sx) * 1.6;
    }, { passive: true });
  }
  makeDrag('partTrack');
  makeDrag('tl');

  /* ── POPUP INSCRIPTION ── */
  function openPopup() {
    var p = document.getElementById('inscriptionPopup');
    if (!p) return;
    p.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closePopup() {
    var p = document.getElementById('inscriptionPopup');
    if (!p) return;
    p.classList.remove('open');
    document.body.style.overflow = '';
  }
  var po = document.getElementById('inscriptionPopup');
  if (po) po.addEventListener('click', function (e) { if (e.target === po) closePopup(); });
  // expose globalement pour les boutons onclick="openPopup()"
  window.openPopup = openPopup;
  window.closePopup = closePopup;

  /* ── ESPACE MEMBRE : LOGIN / TABS ── */
  window.doLogin = function () {
    var u = document.getElementById('loginUser');
    var p = document.getElementById('loginPass');
    var err = document.getElementById('errorMsg');
    if (!u || !p) return;
    u.classList.remove('error'); p.classList.remove('error');
    if (err) err.classList.remove('show');
    if (!u.value.trim() || !p.value) {
      if (!u.value.trim()) u.classList.add('error');
      if (!p.value) p.classList.add('error');
      if (err) {
        err.innerHTML = '<i class="ti ti-alert-circle" style="font-size:14px;margin-right:6px;vertical-align:middle"></i>Veuillez remplir tous les champs.';
        err.classList.add('show');
      }
      return;
    }
    document.body.classList.add('logged');
    window.scrollTo(0, 0);
  };
  window.doLogout = function () {
    document.body.classList.remove('logged');
    window.scrollTo(0, 0);
    var p = document.getElementById('loginPass');
    var err = document.getElementById('errorMsg');
    if (p) { p.value = ''; p.classList.remove('error'); }
    if (err) err.classList.remove('show');
  };
  window.showTab = function (name) {
    document.querySelectorAll('.dash-nav__item').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-tab') === name);
    });
    document.querySelectorAll('.dash-panel').forEach(function (el) {
      el.classList.remove('active');
    });
    var panel = document.getElementById('panel-' + name);
    if (panel) panel.classList.add('active');
    if (name === 'sport' && typeof renderCal === 'function') renderCal();
  };
  window.showSportTab = function (panel, sport) {
    var container = document.getElementById('panel-' + panel);
    if (!container) return;
    var tabs = container.querySelectorAll('.sport-tab');
    var panels = container.querySelectorAll('.sport-panel');
    tabs.forEach(function (t) { t.classList.remove('active'); });
    panels.forEach(function (p) { p.classList.remove('active'); });
    var idx = sport === 'football' ? 0 : 1;
    if (tabs[idx]) tabs[idx].classList.add('active');
    var target = document.getElementById(panel + '-' + sport);
    if (target) target.classList.add('active');
  };
  window.toggleEdit = function () {
    var f = document.getElementById('profile-form');
    if (!f) return;
    f.style.display = (f.style.display === 'none' || f.style.display === '') ? 'block' : 'none';
  };
  window.fakeSave = function (btn) {
    var old = btn.innerHTML;
    btn.innerHTML = '<i class="ti ti-check"></i> Enregistré';
    setTimeout(function () { btn.innerHTML = old; }, 1800);
  };
  window.rsvpClick = function (btn, ans) {
    var pill = btn.closest('.rsvp');
    if (!pill) return;
    var already = pill.classList.contains('answered-' + ans);
    pill.classList.remove('answered-yes', 'answered-no');
    if (!already) pill.classList.add('answered-' + ans);
  };
  window.previewPhoto = function (input) {
    if (!input.files || !input.files[0]) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      var url = e.target.result;
      var preview = document.getElementById('photo-preview');
      if (preview) { preview.style.backgroundImage = 'url(' + url + ')'; preview.style.backgroundSize = 'cover'; preview.style.backgroundPosition = 'center'; preview.innerText = ''; }
      var avatar = document.querySelector('.dash-avatar');
      if (avatar) { avatar.style.backgroundImage = 'url(' + url + ')'; avatar.style.backgroundSize = 'cover'; avatar.style.backgroundPosition = 'center'; avatar.innerText = ''; }
    };
    reader.readAsDataURL(input.files[0]);
  };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !document.body.classList.contains('logged')) {
      if (typeof window.doLogin === 'function') window.doLogin();
    }
  });

})();
