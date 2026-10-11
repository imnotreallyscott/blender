// Shows how many checks are ticked per lesson on a unit page.
// Reads the same saved state that each lesson page writes (this browser only).
(function () {
  function ticked(lessonPath) {
    try {
      var state = JSON.parse(localStorage.getItem("blenderLessonProgress:" + lessonPath)) || {};
      var n = 0;
      Object.keys(state).forEach(function (k) { if (state[k]) n++; });
      return n;
    } catch (e) {
      return 0;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var items = document.querySelectorAll("li[data-total]");
    var complete = 0;
    items.forEach(function (li) {
      var link = li.querySelector("a");
      var path = new URL(link.getAttribute("href"), location.href).pathname;
      var total = parseInt(li.getAttribute("data-total"), 10);
      var done = Math.min(ticked(path), total);
      if (done === total) complete++;
      var out = li.querySelector(".prog");
      out.textContent = done === total ? "Complete" : done + " of " + total + " checks done";
      out.classList.toggle("is-complete", done === total);
    });
    var sum = document.querySelector(".unit-progress");
    if (sum) sum.textContent = complete + " of " + items.length + " lessons complete in this browser";
  });
})();
