/* app.js — reads config.js, loads the chosen theme, builds the page. No need to edit. */
(function () {
  var C = window.LINKTREE || {}, P = C.profile || {}, K = C.contact || {}, F = C.features || {};
  var n = 0, root = document.documentElement;

  /* ---- theme ---- */
  var theme = (new URLSearchParams(location.search).get("theme") || C.theme || "starter").replace(/[^\w-]/g, "");
  root.setAttribute("data-linktree", theme);
  var link = document.getElementById("theme-css");
  var show = function () { root.classList.add("ready"); };
  link.onload = link.onerror = show; setTimeout(show, 1500);
  link.href = "themes/" + theme + ".css";

  /* ---- tiny DOM helper (text is always inserted as text: no HTML injection) ---- */
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) { var v = attrs[k]; if (v == null || v === false) continue;
      if (k === "class") e.className = v; else if (k === "text") e.textContent = v; else e.setAttribute(k, v === true ? "" : v); }
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function L(e) { e.classList.add("line"); e.style.setProperty("--i", n++); return e; }
  /* optional picture: returns null when no path is given; drops itself if the file can't load */
  function pic(src, cls, alt) {
    if (!src) return null;
    var i = h("img", { "class": cls, src: src, alt: alt || "", loading: "lazy", decoding: "async" });
    i.addEventListener("error", function () { i.remove(); });
    return i;
  }
  function ext(href) { return /^https?:/.test(href) ? { target: "_blank", rel: "noopener" } : {}; }
  var $ = function (id) { return document.getElementById(id); };

  /* ---- build ---- */
  var card = h("article", { "class": "card" }), main = $("app");
  if (C.stamp) card.appendChild(h("div", { "class": "stamp", "aria-hidden": "true" }, [h("div", {}, [C.stamp.top || "", h("b", { text: C.stamp.main || "" }), C.stamp.bottom || ""])]));

  var name = P.name || "", hl = P.highlight || "";
  var logo = h("h1", { "class": "logo" }, hl && name.indexOf(hl) === 0 ? [h("span", { text: hl }), name.slice(hl.length)] : [name]);
  card.appendChild(L(h("header", { "class": "top" }, [pic(P.avatar, "avatar", P.owner || P.name), logo, P.tagline && h("p", { "class": "sub", text: P.tagline })])));

  var M = C.meta || {}, ml = M.lines || [];
  var d = new Date(), p2 = function (x) { return String(x).padStart(2, "0"); };
  if (M.ref) card.appendChild(L(h("div", { "class": "meta" }, [
    h("span", { text: M.ref + " #" + String((d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % 10000).padStart(4, "0") }),
    h("span", { text: p2(d.getDate()) + "/" + p2(d.getMonth() + 1) + "/" + d.getFullYear() + " " + p2(d.getHours()) + ":" + p2(d.getMinutes()) })])));
  if (ml.length) card.appendChild(L(h("div", { "class": "meta meta2" }, ml.map(function (t) { return h("span", { text: t }); }))));

  var rule = function () { card.appendChild(L(h("hr", { "class": "rule" }))); };
  rule();
  if (P.intro) { card.appendChild(L(h("p", { "class": "intro", text: P.intro }))); rule(); }

  (C.links || []).forEach(function (it, i) {
    var a = h("a", Object.assign({ "class": "item", href: it.url }, ext(it.url)), [
      h("span", { "class": "row" }, [h("span", { "class": "n", text: p2(i + 1) }), h("span", { "class": "name", text: it.title }),
        h("span", { "class": "dots" }), it.tag && h("span", { "class": "tag", text: it.tag })]),
      it.desc && h("span", { "class": "d", text: it.desc }),
      pic(it.image, "thumb", it.imageAlt || it.title + " preview"),
      it.cta && h("span", { "class": "go", text: it.cta })]);
    if (it.color) a.style.setProperty("--c", it.color);   /* themes read it as var(--c) */
    card.appendChild(L(a));
  });

  if ((C.summary || C.total)) rule();
  var st = h("div", { "class": "stats" });
  (C.summary || []).forEach(function (s) { st.appendChild(L(h("div", { "class": "sum" }, [h("span", { text: s.label }), h("span", { text: s.value })]))); });
  if (st.children.length) card.appendChild(st);
  if (C.total) { card.appendChild(L(h("div", { "class": "total" }, [h("span", { text: C.total.label }), h("span", { text: C.total.value })]))); rule(); }

  var cn = C.connect || {};
  if (cn.intro) card.appendChild(L(h("p", { "class": "intro", text: cn.intro })));
  if ((cn.socials || []).length) card.appendChild(L(h("div", { "class": "pay" }, cn.socials.map(function (s) { return h("a", Object.assign({ href: s.url }, ext(s.url)), [s.label]); }))));
  card.appendChild(L(h("div", { "class": "bar", "aria-hidden": "true" })));
  if (C.thanks) card.appendChild(L(h("p", { "class": "thanks" }, [h("b", { text: C.thanks.title }), C.thanks.text || ""])));

  /* contact (tear strip + form) */
  var tear = null, wrap = null, nm, msg, btns, copy;
  if (K.whatsapp || K.email || K.dm) {
    var tw = L(h("div", { "class": "tearwrap" }));
    if (F.tear) tear = h("button", { "class": "tear", id: "tear", type: "button", "aria-expanded": "false", "aria-controls": "slipwrap" },
      [h("span", { "class": "perf" }), h("span", { "class": "tl" }, [h("i", { "aria-hidden": "true", text: "✂" }), "TEAR HERE ", h("em", { text: "· drag or tap to say hello" })]), h("span", { "class": "perf" })]);
    if (tear) tw.appendChild(tear);
    nm = h("input", { id: "nm", name: "name", autocomplete: "name", maxlength: "60" });
    msg = h("textarea", { id: "msg", name: "message", rows: "3", maxlength: "500" });
    copy = h("button", { type: "button", text: "Copy message" });
    btns = h("div", { "class": "btns" }, [copy, K.dm && h("a", Object.assign({ href: K.dm.url }, ext(K.dm.url)), [K.dm.label])]);
    var form = h("form", { "class": "slip", id: "slip" }, [h("h2", { text: K.heading || "Say hello." }), K.blurb && h("p", { text: K.blurb }),
      h("label", { "for": "nm", text: "YOUR NAME" }), nm, h("label", { "for": "msg", text: "MESSAGE" }), msg, btns,
      K.stub && h("div", { "class": "stub", text: K.stub })]);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    wrap = h("div", { "class": "slipwrap" + (tear ? "" : " open"), id: "slipwrap" }, [h("div", {}, [form])]);
    if (tear) wrap.setAttribute("inert", "");
    tw.appendChild(wrap); card.appendChild(tw);
  }

  main.appendChild(card);
  if (C.footer) main.appendChild(h("p", { "class": "foot", text: C.footer }));
  if (F.picker && C.themes) main.appendChild(h("nav", { "class": "picker", "aria-label": "Themes" }, C.themes.map(function (t) {
    return h("a", { href: "?theme=" + t, "aria-current": t === theme ? "true" : null, text: t }); })));

  /* ---- contact behaviour ---- */
  if (!wrap) return;
  function text() {
    return "Hi " + (K.recipient || P.owner || "there") + ", it’s " + (nm.value.trim() || "someone") + ". " +
      (msg.value.trim() || "I’d like to talk about a project.") + " (via " + (P.name || "your page") + ")";
  }
  function addBtn(label, href) { var a = h("a", { href: "#", target: "_blank", rel: "noopener", text: label });
    a.addEventListener("click", function () { a.href = href(); }); btns.insertBefore(a, copy); }
  if (K.whatsapp) addBtn("WhatsApp ↗", function () { return "https://wa.me/" + K.whatsapp + "?text=" + encodeURIComponent(text()); });
  if (K.email) addBtn("Email ↗", function () { return "mailto:" + K.email + "?subject=" + encodeURIComponent("Hello from " + (P.name || "your page")) + "&body=" + encodeURIComponent(text()); });
  copy.addEventListener("click", function () {
    var done = function () { copy.textContent = "Copied ✓"; setTimeout(function () { copy.textContent = "Copy message"; }, 1600); };
    try { navigator.clipboard.writeText(text()).then(done, done); } catch (e) { done(); }
  });
  /* groups of 3 buttons: let the last one span the row */
  if (btns.children.length % 2) btns.lastElementChild.style.gridColumn = "1 / -1";

  if (!tear) return;
  var torn = false, sx = 0, dx = 0, moving = false;
  function rip(dir) {
    if (torn) return; torn = true;
    tear.style.transform = ""; tear.style.setProperty("--dx", dir || 1);
    tear.classList.add("gone"); tear.setAttribute("aria-expanded", "true");
    wrap.classList.add("open"); wrap.removeAttribute("inert");
    var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    var fin = function () { tear.style.display = "none"; };
    if (reduce) fin(); else tear.addEventListener("animationend", function (e) { if (e.animationName === "fall") fin(); });
    setTimeout(function () { try { nm.focus({ preventScroll: true }); wrap.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "end" }); } catch (e) {} }, 700);
  }
  tear.addEventListener("pointerdown", function (e) { if (torn) return; moving = true; sx = e.clientX; dx = 0; tear.classList.remove("back"); try { tear.setPointerCapture(e.pointerId); } catch (_) {} });
  tear.addEventListener("pointermove", function (e) { if (!moving) return; dx = e.clientX - sx; tear.style.transform = "translateX(" + dx + "px) rotate(" + dx / 45 + "deg)"; });
  tear.addEventListener("pointerup", function () {
    if (!moving) return; moving = false;
    if (Math.abs(dx) > 70 || Math.abs(dx) < 6) rip(dx < 0 ? -1 : 1); else { tear.classList.add("back"); tear.style.transform = ""; }
  });
  tear.addEventListener("pointercancel", function () { moving = false; tear.classList.add("back"); tear.style.transform = ""; });
  tear.addEventListener("click", function (e) { if (e.detail === 0) rip(1); });
})();
