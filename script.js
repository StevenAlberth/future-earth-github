let score = 50;

function updateEarth(type) {
  const earth = document.getElementById("earth");
  const text = document.getElementById("futureText");
  const scoreText = document.getElementById("score");
  const bar = document.getElementById("impactProgress");
  const status = document.getElementById("scoreStatus");

  if (type === "good") {
    score += 10;
  } else {
    score -= 10;
  }

  if (score > 100) score = 100;
  if (score < 0) score = 0;


  if (typeof updateSimGlobe === 'function') updateSimGlobe(score);

  scoreText.innerText = score;
  bar.style.width = score + "%";

  if (score >= 60) {
    earth.classList.remove("bad");
    earth.classList.add("good");
    text.innerText = "🌿 Sustainable choices are helping Earth recover and ecosystems thrive.";
    if (status) {
      status.innerText = "✅ Positive Future — keep making good choices!";
      status.className = "score-status good";
    }
    bar.style.background = "linear-gradient(90deg, #1565c0, #00e676)";
  } else if (score <= 40) {
    earth.classList.remove("good");
    earth.classList.add("bad");
    text.innerText = "🔥 Environmental damage is accelerating. The planet is entering a climate crisis.";
    if (status) {
      status.innerText = "⚠️ Crisis Path — switch to sustainable choices!";
      status.className = "score-status bad";
    }
    bar.style.background = "linear-gradient(90deg, #7f1d1d, #e53935)";
  } else {
    if (status) {
      status.innerText = "⚡ Uncertain Future — your choices matter!";
      status.className = "score-status neutral";
    }
    bar.style.background = "linear-gradient(90deg, #1565c0, #00e676)";
    text.innerText = "⚖️ The future of Earth is uncertain. Our actions today will determine what happens next.";
  }
}


/* ═══════════════════════════════════════════════════
   CINEMATIC TIMELINE — Interactive Logic
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var MILESTONES = [
    { year: '1988', index: 0 },
    { year: '1997', index: 1 },
    { year: '2006', index: 2 },
    { year: '2015', index: 3 },
    { year: '2018', index: 4 },
    { year: '2023', index: 5 }
  ];
  var TOTAL = MILESTONES.length;

  var track = document.getElementById('ctTrack');
  var crossfade = document.getElementById('ctCrossfade');
  var barYear = document.getElementById('ctBarYear');
  var roadFill = document.getElementById('ctRoadFill');
  var nodesWrap = document.getElementById('ctNodes');
  var prevBtn = document.getElementById('ctPrev');
  var nextBtn = document.getElementById('ctNext');
  var counter = document.getElementById('ctCounter');
  var viewport = document.getElementById('ctViewport');

  if (!track) return; // Guard: only run on the about page

  var current = 0;
  var isAnimating = false;
  var nodeEls = [];

  MILESTONES.forEach(function (m, i) {
    var n = document.createElement('div');
    n.className = 'ct-node' + (i === 0 ? ' ct-node-active' : '');
    n.setAttribute('data-year', m.year);
    n.addEventListener('click', function () { goTo(i); });
    nodesWrap.appendChild(n);
    nodeEls.push(n);
  });

  function updateUI(idx) {
    barYear.textContent = MILESTONES[idx].year;
    counter.textContent = (idx + 1) + ' / ' + TOTAL;
    var pct = TOTAL === 1 ? 100 : (idx / (TOTAL - 1)) * 100;
    roadFill.style.width = pct + '%';
    nodeEls.forEach(function (n, i) {
      n.classList.toggle('ct-node-active', i === idx);
      n.classList.toggle('ct-node-done', i < idx);
    });
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === TOTAL - 1;
  }

  function goTo(idx) {
    if (idx === current || isAnimating) return;
    if (idx < 0 || idx >= TOTAL) return;
    isAnimating = true;
    var slides = document.querySelectorAll('.ct-slide');
    crossfade.classList.add('ct-flash');
    setTimeout(function () {
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      slides.forEach(function (s, i) { s.classList.toggle('ct-active', i === idx); });
      current = idx;
      updateUI(idx);
      setTimeout(function () {
        crossfade.classList.remove('ct-flash');
        isAnimating = false;
      }, 350);
    }, 140);
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  document.addEventListener('keydown', function (e) {
    var r = viewport.getBoundingClientRect();
    if (r.top >= window.innerHeight || r.bottom <= 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goTo(current + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(current - 1); }
  });

  var dragStart = null;
  function onDown(e) { dragStart = e.clientX || (e.touches && e.touches[0].clientX); viewport.style.cursor = 'grabbing'; }
  function onUp(e) {
    if (dragStart === null) return;
    var end = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || dragStart;
    var delta = end - dragStart;
    if (Math.abs(delta) > 60) { delta < 0 ? goTo(current + 1) : goTo(current - 1); }
    dragStart = null;
    viewport.style.cursor = 'grab';
  }
  viewport.addEventListener('mousedown', onDown);
  viewport.addEventListener('mouseup', onUp);
  viewport.addEventListener('touchstart', onDown, { passive: true });
  viewport.addEventListener('touchend', onUp);
  viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });

  updateUI(0);
  prevBtn.disabled = true;
})();

/* ═══════════════════════════════════════════════════
   TRASH SORTING GAME (TSG) — Enhanced
═══════════════════════════════════════════════════ */
const TSG_ITEMS = [
  // ORGANIC
  { icon: '🍎', label: 'Apple core',      type: 'organic' },
  { icon: '🍌', label: 'Banana peel',     type: 'organic' },
  { icon: '🥦', label: 'Veggie scraps',   type: 'organic' },
  { icon: '🍃', label: 'Fallen leaves',   type: 'organic' },
  { icon: '☕', label: 'Coffee grounds',  type: 'organic' },
  { icon: '🥚', label: 'Eggshells',       type: 'organic' },
  // PAPER
  { icon: '📰', label: 'Newspaper',       type: 'paper' },
  { icon: '📦', label: 'Cardboard box',   type: 'paper' },
  { icon: '📜', label: 'Paper roll',      type: 'paper' },
  { icon: '✉️', label: 'Envelope',        type: 'paper' },
  { icon: '📚', label: 'Old magazine',    type: 'paper' },
  { icon: '🗒️', label: 'Notepad',         type: 'paper' },
  // PLASTIC
  { icon: '🥤', label: 'Plastic cup',     type: 'plastic' },
  { icon: '🛍️', label: 'Plastic bag',     type: 'plastic' },
  { icon: '🧴', label: 'Shampoo bottle',  type: 'plastic' },
  { icon: '🍼', label: 'Baby bottle',     type: 'plastic' },
  { icon: '🪥', label: 'Toothbrush',      type: 'plastic' },
  { icon: '💊', label: 'Pill container',  type: 'plastic' },
  // METAL
  { icon: '🥫', label: 'Tin can',         type: 'metal' },
  { icon: '🔋', label: 'Battery',         type: 'metal' },
  { icon: '🍴', label: 'Metal fork',      type: 'metal' },
  { icon: '📎', label: 'Paperclip',       type: 'metal' },
  { icon: '🪙', label: 'Coin',            type: 'metal' },
  { icon: '🔩', label: 'Bolt',            type: 'metal' },
];

const TSG_DURATION = 45;
let tsgPlaying = false;
let tsgScore    = 0;
let tsgCombo    = 1;
let tsgCorrect  = 0;
let tsgWrong    = 0;
let tsgTimeLeft = TSG_DURATION;
let tsgInterval = null;
let tsgCurrent  = null;
let tsgFbTimer  = null;

function tsgInit() {
  tsgPlaying  = true;
  tsgScore    = 0;
  tsgCombo    = 1;
  tsgCorrect  = 0;
  tsgWrong    = 0;
  tsgTimeLeft = TSG_DURATION;

  // Reset UI
  document.getElementById('tsgScore').textContent  = 0;
  document.getElementById('tsgTimer').textContent  = TSG_DURATION;
  document.getElementById('tsgCombo').textContent  = 'x1';
  document.getElementById('tsgTimerBar').style.width = '100%';
  document.getElementById('tsgTimerBar').style.background = 'linear-gradient(90deg,#00e676,#1565c0)';
  document.getElementById('tsgResult').style.display  = 'none';
  document.getElementById('tsgIdle').style.display    = 'none';
  document.getElementById('tsgItemWrap').style.display = 'flex';
  document.getElementById('tsgItemWrap').style.flexDirection = 'column';
  document.getElementById('tsgItemWrap').style.alignItems = 'center';
  document.getElementById('tsgFeedback').textContent  = '';
  document.getElementById('tsgFeedback').className    = 'tsg-feedback';

  tsgSpawn();

  clearInterval(tsgInterval);
  tsgInterval = setInterval(() => {
    tsgTimeLeft--;
    const pct = (tsgTimeLeft / TSG_DURATION) * 100;
    const bar = document.getElementById('tsgTimerBar');
    bar.style.width = pct + '%';
    if (pct < 30) bar.style.background = 'linear-gradient(90deg,#e53935,#ff8a65)';
    else if (pct < 60) bar.style.background = 'linear-gradient(90deg,#ffca28,#1565c0)';
    document.getElementById('tsgTimer').textContent = tsgTimeLeft;
    if (tsgTimeLeft <= 0) tsgEnd();
  }, 1000);
}

function tsgSpawn() {
  if (!tsgPlaying) return;
  const pool = TSG_ITEMS;
  tsgCurrent = pool[Math.floor(Math.random() * pool.length)];
  const el = document.getElementById('tsgItem');
  el.style.transform = 'scale(0) rotate(-15deg)';
  el.style.opacity   = '0';
  setTimeout(() => {
    el.textContent  = tsgCurrent.icon;
    el.style.transition = 'transform .3s cubic-bezier(.34,1.56,.64,1), opacity .2s';
    el.style.transform  = 'scale(1) rotate(0deg)';
    el.style.opacity    = '1';
  }, 80);
  document.getElementById('tsgItemHint').textContent = tsgCurrent.label;

  // Drag support
  el.setAttribute('draggable', 'true');
  el.ondragstart = (e) => {
    e.dataTransfer.setData('text/plain', 'waste');
    // Highlight valid bins
    document.querySelectorAll('.tsg-bin').forEach(b => b.classList.add('highlight'));
  };
  document.querySelectorAll('.tsg-bin').forEach(b => {
    b.ondragend = () => document.querySelectorAll('.tsg-bin').forEach(x => x.classList.remove('highlight'));
  });
}

function tsgDrop(event, type) {
  event.preventDefault();
  document.querySelectorAll('.tsg-bin').forEach(b => b.classList.remove('highlight'));
  tsgEval(type);
}

function tsgClick(type) {
  if (!tsgPlaying || !tsgCurrent) return;
  tsgEval(type);
}

function tsgEval(type) {
  if (!tsgPlaying || !tsgCurrent) return;
  const correct = type === tsgCurrent.type;
  const bin = document.getElementById('bin' + type.charAt(0).toUpperCase() + type.slice(1));

  if (correct) {
    tsgCombo++;
    const pts = 10 * Math.min(tsgCombo - 1 || 1, tsgCombo);
    tsgScore   += pts;
    tsgCorrect++;
    bin.classList.add('correct-flash');
    tsgShowFeedback('✅ +' + pts + (tsgCombo > 2 ? '  COMBO x' + tsgCombo + '!' : ''), 'correct');
  } else {
    tsgCombo = 1;
    tsgScore = Math.max(0, tsgScore - 5);
    tsgWrong++;
    bin.classList.add('wrong-flash');
    tsgShowFeedback('❌ Wrong bin! -5', 'wrong');
  }

  setTimeout(() => bin.classList.remove('correct-flash', 'wrong-flash'), 450);

  const comboEl = document.getElementById('tsgCombo');
  comboEl.textContent = 'x' + tsgCombo;
  comboEl.classList.remove('combo-pop');
  void comboEl.offsetWidth;
  if (tsgCombo > 1) comboEl.classList.add('combo-pop');

  document.getElementById('tsgScore').textContent = tsgScore;
  setTimeout(tsgSpawn, 300);
}

function tsgShowFeedback(msg, cls) {
  clearTimeout(tsgFbTimer);
  const el = document.getElementById('tsgFeedback');
  el.textContent = msg;
  el.className   = 'tsg-feedback ' + cls + ' show';
  tsgFbTimer = setTimeout(() => el.classList.remove('show'), 700);
}

function tsgEnd() {
  clearInterval(tsgInterval);
  tsgPlaying = false;
  tsgCurrent = null;

  document.getElementById('tsgItemWrap').style.display = 'none';
  const result = document.getElementById('tsgResult');

  // Rating
  const acc = tsgCorrect + tsgWrong > 0
    ? Math.round((tsgCorrect / (tsgCorrect + tsgWrong)) * 100) : 0;
  let emoji = '🌱', title = 'Good Start!', sub = 'Keep learning about waste sorting!';
  if (tsgScore >= 200) { emoji = '🏆'; title = 'Eco Champion!';   sub = 'Outstanding! You are a waste-sorting master.'; }
  else if (tsgScore >= 120) { emoji = '🌍'; title = 'Planet Hero!';   sub = 'Great work! You are making the Earth cleaner.'; }
  else if (tsgScore >= 60)  { emoji = '♻️'; title = 'Recycler!';      sub = 'Nice effort! Practice makes perfect.'; }

  document.getElementById('tsgResultEmoji').textContent  = emoji;
  document.getElementById('tsgResultTitle').textContent  = title;
  document.getElementById('tsgResultSub').textContent    = sub + ' (' + acc + '% accuracy)';
  document.getElementById('tsgRScore').textContent   = tsgScore;
  document.getElementById('tsgRCorrect').textContent = tsgCorrect;
  document.getElementById('tsgRWrong').textContent   = tsgWrong;

  result.style.display = 'flex';
}