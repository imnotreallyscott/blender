// Saves checkbox progress in this browser only (localStorage).
// If storage is blocked, the page still works; progress just isn't saved.
(function () {
  var key = "blenderLessonProgress:" + location.pathname;

  function load() {
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch (e) {
      return {};
    }
  }

  function save(state) {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) { /* storage unavailable; ignore */ }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var state = load();
    var boxes = document.querySelectorAll(".checkpoint input[type=checkbox]");
    boxes.forEach(function (box) {
      if (state[box.id]) box.checked = true;
      box.addEventListener("change", function () {
        state[box.id] = box.checked;
        save(state);
      });
    });
  });
})();
