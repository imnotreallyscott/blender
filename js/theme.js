// Light/dark switch. Loaded in <head> so the saved theme applies before first paint.
// Storage is wrapped in try/catch: if the browser blocks it, the switch still works for the current page.
(function () {
  var KEY = "blenderTheme";

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function remember(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* ignore */ }
  }

  var initial = saved();
  if (initial === "light" || initial === "dark") {
    document.documentElement.setAttribute("data-theme", initial);
  }

  function currentTheme() {
    var set = document.documentElement.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function label(btn) {
    var now = currentTheme();
    btn.textContent = now === "dark" ? "Switch to light mode" : "Switch to dark mode";
    btn.setAttribute("aria-label", btn.textContent);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    label(btn);
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      remember(next);
      label(btn);
    });
  });
})();
