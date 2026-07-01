/* BauKo II · Lernquiz — Vanilla-JS, offline lauffähig, mit globaler Bestenliste */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const store = {
    key: "bauko_lernquiz_v1",
    load() { try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch (e) { return {}; } },
    save(d) { try { localStorage.setItem(this.key, JSON.stringify(d)); } catch (e) {} }
  };

  /* ---------- Daten ---------- */
  const D = window.BAUKO_DATA || { topics: [], quiz: [], flashcards: [] };
  const M = window.BAUKO_MEDIA || { topicImages: {}, quiz: [], flashcards: [] };
  const TOPICS = D.topics.slice();
  const QUIZ = D.quiz.map((q) => Object.assign({}, q));
  M.quiz.forEach((q, i) => QUIZ.push(Object.assign({ id: "mq" + i }, q)));
  const CARDS = D.flashcards.map((c) => Object.assign({}, c));
  M.flashcards.forEach((c, i) => CARDS.push(Object.assign({ id: "mc" + i }, c)));
  const countBy = (arr, t) => arr.filter((x) => x.topic === t).length;

  /* ---------- Zustand ---------- */
  const state = {
    mode: "quiz",
    topics: new Set(TOPICS),
    length: 20,
    session: null,
    lastWrong: [],
    lastResult: null
  };

  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const show = (id) => {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active"); window.scrollTo(0, 0);
  };
  const poolFor = (mode) => (mode === "quiz" ? QUIZ : CARDS).filter((x) => state.topics.has(x.topic));

  /* ==================================================================
     STARTBILDSCHIRM
  ================================================================== */
  function renderHome() {
    const st = store.load();
    const best = st.quizBestCorrect != null ? `${st.quizBestCorrect}/${st.quizBestTotal}` : "–";
    const known = (st.cardsKnown || []).length;
    $("homeStats").innerHTML =
      `<div class="stat"><b>${best}</b><span>Bester Test</span></div>` +
      `<div class="stat"><b>${known}/${CARDS.length}</b><span>Karten gemeistert</span></div>`;
    renderTopicChips();
    renderLenSeg();
    updateStartHint();
  }

  function renderTopicChips() {
    const box = $("topicChips");
    const all = TOPICS.every((t) => state.topics.has(t));
    const src = state.mode === "quiz" ? QUIZ : CARDS;
    let html = `<button class="chip ${all ? "on" : ""}" data-all="1">Alle</button>`;
    TOPICS.forEach((t) => {
      html += `<button class="chip ${state.topics.has(t) ? "on" : ""}" data-topic="${encodeURIComponent(t)}">${esc(t)}<span class="c-n">${countBy(src, t)}</span></button>`;
    });
    box.innerHTML = html;
    box.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => {
      if (c.dataset.all) {
        if (TOPICS.every((t) => state.topics.has(t))) state.topics.clear();
        else TOPICS.forEach((t) => state.topics.add(t));
      } else {
        const t = decodeURIComponent(c.dataset.topic);
        state.topics.has(t) ? state.topics.delete(t) : state.topics.add(t);
      }
      renderTopicChips(); updateStartHint();
    }));
  }

  function renderLenSeg() {
    const opts = [{ v: 10, l: "10" }, { v: 20, l: "20" }, { v: 30, l: "30" }, { v: 9999, l: "Alle" }];
    $("lenChips").innerHTML = opts.map((o) => `<button class="seg ${state.length === o.v ? "active" : ""}" data-len="${o.v}">${o.l}</button>`).join("");
    $("lenChips").querySelectorAll(".seg").forEach((c) => c.addEventListener("click", () => {
      state.length = +c.dataset.len; renderLenSeg(); updateStartHint();
    }));
  }

  function updateStartHint() {
    const avail = poolFor(state.mode).length;
    const n = Math.min(avail, state.length);
    const word = state.mode === "quiz" ? "Fragen" : "Karten";
    $("startHint").textContent = avail === 0 ? "Bitte mindestens ein Thema wählen."
      : `${n} ${word} in dieser Runde · ${avail} verfügbar`;
    $("startBtn").disabled = avail === 0;
  }

  $("modeToggle").querySelectorAll(".seg").forEach((b) => b.addEventListener("click", () => {
    $("modeToggle").querySelectorAll(".seg").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    state.mode = b.dataset.mode;
    $("startBtn").textContent = state.mode === "quiz" ? "Starten" : "Lernen";
    renderTopicChips(); updateStartHint();
  }));

  $("startBtn").addEventListener("click", () => {
    if (poolFor(state.mode).length === 0) return;
    state.mode === "quiz" ? startQuiz() : startFlash();
  });
  $("resetBtn").addEventListener("click", () => {
    if (confirm("Bestwert und gemeisterte Karten wirklich zurücksetzen?")) {
      const st = store.load(); const name = st.name; store.save(name ? { name } : {}); renderHome();
    }
  });
  $("openBoard").addEventListener("click", () => showBoard());

  /* ==================================================================
     QUIZ
  ================================================================== */
  function buildQuizList(source) {
    let list = shuffle(source);
    if (state.length !== 9999) list = list.slice(0, state.length);
    return list.map((q) => {
      const shuffled = shuffle(q.options.map((text, i) => ({ text, correct: i === q.answer })));
      return {
        ref: q, question: q.q, image: q.image || null, topic: q.topic, explanation: q.explanation || "",
        options: shuffled, answerIdx: shuffled.findIndex((o) => o.correct), chosen: null
      };
    });
  }

  function startQuiz(customList) {
    state.session = { list: customList || buildQuizList(poolFor("quiz")), idx: 0, correct: 0 };
    show("quiz"); renderQuizCard();
  }

  function renderQuizCard() {
    const s = state.session, item = s.list[s.idx];
    $("quizProgress").style.width = (s.idx / s.list.length) * 100 + "%";
    $("quizCounter").textContent = `${pad(s.idx + 1)} / ${pad(s.list.length)}`;
    $("quizTopic").textContent = item.topic;
    $("quizScore").textContent = s.correct;
    const img = $("quizImg");
    if (item.image) { img.src = item.image; img.hidden = false; img.alt = item.topic; }
    else { img.hidden = true; img.removeAttribute("src"); }
    $("quizQuestion").textContent = item.question;
    const box = $("quizOptions"); box.innerHTML = "";
    const keys = ["A", "B", "C", "D", "E", "F"];
    item.options.forEach((o, i) => {
      const btn = document.createElement("button");
      btn.className = "opt";
      btn.innerHTML = `<span class="key">${keys[i]}</span><span>${esc(o.text)}</span>`;
      btn.addEventListener("click", () => answerQuiz(i));
      box.appendChild(btn);
    });
    const ex = $("quizExplain"); ex.hidden = true; ex.className = "explain";
    $("quizNext").hidden = true;
  }

  function answerQuiz(choice) {
    const s = state.session, item = s.list[s.idx];
    if (item.chosen !== null) return;
    item.chosen = choice;
    const ok = item.options[choice].correct;
    if (ok) s.correct++;
    $("quizScore").textContent = s.correct;
    $("quizOptions").querySelectorAll(".opt").forEach((b, i) => {
      b.disabled = true;
      if (item.options[i].correct) b.classList.add("correct");
      else if (i === choice) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    const ex = $("quizExplain");
    ex.hidden = false; ex.className = "explain" + (ok ? "" : " err");
    ex.innerHTML = (ok ? '<b class="ok-badge">Richtig</b>' : `<b>Falsch — richtig: ${esc(item.options[item.answerIdx].text)}</b>`)
      + (item.explanation ? esc(item.explanation) : "");
    $("quizNext").hidden = false;
    $("quizNext").textContent = s.idx + 1 >= s.list.length ? "Ergebnis" : "Weiter";
    $("quizNext").focus();
  }

  $("quizNext").addEventListener("click", () => {
    const s = state.session;
    s.idx + 1 >= s.list.length ? finishQuiz() : (s.idx++, renderQuizCard());
  });
  $("quizBack").addEventListener("click", () => { if (confirm("Runde abbrechen?")) goHome(); });

  function finishQuiz() {
    const s = state.session, total = s.list.length, pct = Math.round((s.correct / total) * 100);
    state.lastResult = { correct: s.correct, total, percent: pct };

    const st = store.load();
    st.quizLast = pct;
    if (s.correct > (st.quizBestCorrect || 0)) { st.quizBestCorrect = s.correct; st.quizBestTotal = total; }
    store.save(st);

    state.lastWrong = s.list.filter((x) => x.chosen !== null && !x.options[x.chosen].correct);

    $("resultPct").textContent = pct + "%";
    $("resultLine").textContent = `${s.correct} von ${total} richtig`;

    // Eintragen-Block (nur wenn Bestenliste eingerichtet)
    const sub = $("submitBlock");
    if (window.Board && window.Board.enabled) {
      sub.hidden = false;
      $("nameInput").value = st.name || "";
      $("submitMsg").textContent = "";
      $("submitScore").disabled = false;
      $("submitScore").textContent = "Eintragen";
    } else { sub.hidden = true; }

    // Aufschlüsselung pro Thema
    const byTopic = {};
    s.list.forEach((x) => { (byTopic[x.topic] = byTopic[x.topic] || { ok: 0, n: 0 }).n++; if (x.chosen !== null && x.options[x.chosen].correct) byTopic[x.topic].ok++; });
    let bd = "<h2>Pro Thema</h2>";
    Object.keys(byTopic).forEach((t) => {
      const o = byTopic[t], p = Math.round((o.ok / o.n) * 100);
      bd += `<div class="bd-row"><span class="lbl">${esc(t)}</span><span class="bar"><i style="width:${p}%"></i></span><span class="num">${o.ok}/${o.n}</span></div>`;
    });
    $("resultBreakdown").innerHTML = bd;

    const wrongBox = $("resultWrong");
    if (state.lastWrong.length) {
      let w = `<h2>Falsch beantwortet · ${state.lastWrong.length}</h2>`;
      state.lastWrong.forEach((x) => {
        w += `<div class="wrong-item"><div class="q">${esc(x.question)}</div>` +
          `<div class="a you">Deine Antwort: ${esc(x.options[x.chosen].text)}</div>` +
          `<div class="a sol">Richtig: ${esc(x.options[x.answerIdx].text)}</div></div>`;
      });
      wrongBox.innerHTML = w; wrongBox.hidden = false;
      $("resultRepeatWrong").hidden = false;
    } else {
      wrongBox.innerHTML = `<p class="ok-badge">Alles richtig. Sauber! 🎉</p>`; wrongBox.hidden = false;
      $("resultRepeatWrong").hidden = true;
    }
    $("resultRestart").hidden = false;
    show("result");
  }

  /* ---------- Score eintragen ---------- */
  $("submitScore").addEventListener("click", async () => {
    const name = $("nameInput").value.trim().slice(0, 24);
    if (name.length < 1) { $("submitMsg").textContent = "Bitte einen Namen eingeben."; return; }
    if (!state.lastResult) return;
    const st = store.load(); st.name = name; store.save(st);
    $("submitScore").disabled = true; $("submitScore").textContent = "…";
    try {
      await window.Board.submit({ name, correct: state.lastResult.correct, total: state.lastResult.total, percent: state.lastResult.percent });
      $("submitMsg").textContent = "Eingetragen! 🏆";
      $("submitScore").textContent = "✓ Drin";
      setTimeout(() => showBoard(name), 600);
    } catch (e) {
      $("submitMsg").textContent = "Fehler: " + e.message;
      $("submitScore").disabled = false; $("submitScore").textContent = "Nochmal";
    }
  });

  /* ==================================================================
     LERNKARTEN
  ================================================================== */
  function startFlash() {
    let list = shuffle(poolFor("flash"));
    if (state.length !== 9999) list = list.slice(0, state.length);
    state.session = { queue: list.slice(), total: list.length, knownIds: new Set(), flipped: false };
    show("flash"); renderFlash();
  }
  function setImg(el, src, alt) { if (src) { el.src = src; el.hidden = false; el.alt = alt || ""; } else { el.hidden = true; el.removeAttribute("src"); } }

  function renderFlash() {
    const s = state.session;
    if (s.queue.length === 0) return finishFlash();
    const card = s.queue[0];
    s.flipped = false; $("flashInner").classList.remove("flipped");
    $("flashTopic").textContent = card.topic;
    $("flashProgress").style.width = (s.knownIds.size / s.total) * 100 + "%";
    $("flashCounter").textContent = `${pad(s.knownIds.size)} / ${pad(s.total)}`;
    $("flashFront").textContent = card.front;
    $("flashBack").textContent = card.back;
    setImg($("flashImgF"), card.image, card.topic);
    setImg($("flashImgB"), card.image, card.topic);
    $("flashAssess").hidden = true; $("flashFlip").hidden = false;
  }
  function flipCard() {
    const s = state.session; if (!s || s.queue.length === 0) return;
    s.flipped = !s.flipped;
    $("flashInner").classList.toggle("flipped", s.flipped);
    $("flashAssess").hidden = !s.flipped; $("flashFlip").hidden = s.flipped;
  }
  $("flashcard").addEventListener("click", flipCard);
  $("flashFlip").addEventListener("click", flipCard);

  function assess(known) {
    const s = state.session, card = s.queue.shift();
    if (known) {
      s.knownIds.add(String(card.id));
      const st = store.load(); const set = new Set(st.cardsKnown || []); set.add(String(card.id));
      st.cardsKnown = Array.from(set); store.save(st);
    } else { s.queue.push(card); }
    renderFlash();
  }
  $("flashYes").addEventListener("click", () => assess(true));
  $("flashNo").addEventListener("click", () => assess(false));
  $("flashClose").addEventListener("click", () => { if (confirm("Runde abbrechen?")) goHome(); });

  function finishFlash() {
    $("resultPct").textContent = "✓";
    $("resultLine").textContent = `Alle ${state.session.total} Karten dieser Runde gemeistert.`;
    $("submitBlock").hidden = true;
    $("resultBreakdown").innerHTML = "";
    const st = store.load();
    $("resultWrong").hidden = false;
    $("resultWrong").innerHTML = `<h2>Fortschritt</h2><p>Insgesamt gemeistert: <b>${(st.cardsKnown || []).length} / ${CARDS.length}</b> Karten.</p>`;
    $("resultRepeatWrong").hidden = true;
    $("resultRestart").hidden = false;
    show("result");
  }

  /* ==================================================================
     BESTENLISTE
  ================================================================== */
  async function showBoard(highlight) {
    show("board");
    const list = $("boardList"), note = $("boardNote");
    const myName = highlight || (store.load().name || "");
    if (!window.Board || !window.Board.enabled) {
      note.textContent = "";
      list.innerHTML = `<div class="board-empty">Die globale Bestenliste ist noch nicht eingerichtet.<br>Trage in <b>js/config.js</b> deine Supabase-Werte ein, dann erscheint sie hier.</div>`;
      return;
    }
    note.textContent = "wird geladen …";
    list.innerHTML = "";
    try {
      const rows = await window.Board.top(50);
      if (!rows.length) { note.textContent = ""; list.innerHTML = `<div class="board-empty">Noch keine Einträge — sei der/die Erste!</div>`; return; }
      note.textContent = "sortiert nach richtigen Antworten";
      list.innerHTML = rows.map((r, i) => {
        const cls = i < 3 ? "top" + (i + 1) : "";
        const me = myName && r.name === myName ? " me" : "";
        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : pad(i + 1);
        return `<div class="board-row ${cls}${me}"><span class="rank">${medal}</span>` +
          `<span class="bname">${esc(r.name)}</span>` +
          `<span class="bscore">${r.correct}/${r.total}</span><span class="bpct">${r.percent}%</span></div>`;
      }).join("");
    } catch (e) {
      note.textContent = ""; list.innerHTML = `<div class="board-empty">Bestenliste konnte nicht geladen werden.<br>${esc(e.message)}</div>`;
    }
  }
  $("boardClose").addEventListener("click", goHome);
  $("boardReload").addEventListener("click", () => showBoard());
  $("resultBoard").addEventListener("click", () => showBoard());

  /* ==================================================================
     ERGEBNIS-AKTIONEN
  ================================================================== */
  $("resultRepeatWrong").addEventListener("click", () => {
    if (!state.lastWrong.length) return;
    const list = state.lastWrong.map((x) => {
      const opts = shuffle(x.options.map((o) => ({ text: o.text, correct: o.correct })));
      return { ref: x.ref, question: x.question, image: x.image, topic: x.topic, explanation: x.explanation, options: opts, answerIdx: opts.findIndex((o) => o.correct), chosen: null };
    });
    startQuiz(list);
  });
  $("resultRestart").addEventListener("click", () => { state.mode === "quiz" ? startQuiz() : startFlash(); });
  $("resultClose").addEventListener("click", goHome);
  $("resultHome").addEventListener("click", goHome);
  function goHome() { state.session = null; show("home"); renderHome(); }

  /* ---------- Tastatur (PC) ---------- */
  document.addEventListener("keydown", (e) => {
    if ($("quiz").classList.contains("active")) {
      if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        const b = $("quizOptions").querySelectorAll(".opt")[+e.key - 1];
        if (b && !b.disabled) b.click();
      } else if ((e.key === "Enter" || e.key === " ") && !$("quizNext").hidden) { e.preventDefault(); $("quizNext").click(); }
    } else if ($("flash").classList.contains("active")) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipCard(); }
      else if (state.session && state.session.flipped) {
        if (e.key.toLowerCase() === "j" || e.key === "ArrowRight") $("flashYes").click();
        else if (e.key.toLowerCase() === "n" || e.key === "ArrowLeft") $("flashNo").click();
      }
    }
  });

  renderHome();
})();
