// Globale Bestenliste über die Supabase-REST-API (ohne Zusatz-Library).
window.Board = (function () {
  "use strict";
  const cfg = window.BAUKO_CONFIG || {};
  const url = (cfg.supabaseUrl || "").replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
  const key = cfg.supabaseKey || "";
  const enabled = !!(url && key);
  const headers = { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json" };

  async function submit(entry) {
    if (!enabled) throw new Error("Bestenliste ist nicht eingerichtet.");
    const res = await fetch(url + "/rest/v1/scores", {
      method: "POST",
      headers: Object.assign({ Prefer: "return=minimal" }, headers),
      body: JSON.stringify({
        name: entry.name, correct: entry.correct, total: entry.total, percent: entry.percent
      })
    });
    if (!res.ok) throw new Error("Speichern fehlgeschlagen (" + res.status + ")");
  }

  async function top(limit) {
    if (!enabled) return [];
    const res = await fetch(
      url + "/rest/v1/scores?select=name,correct,total,percent,created_at" +
      "&order=correct.desc,percent.desc,created_at.asc&limit=" + (limit || 50),
      { headers: headers }
    );
    if (!res.ok) throw new Error("Laden fehlgeschlagen (" + res.status + ")");
    return await res.json();
  }

  return { enabled: enabled, submit: submit, top: top };
})();
