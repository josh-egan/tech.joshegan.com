(function () {
  "use strict";

  var translucentClass = " translucent";
  var sideBarScrollCheckpoint = 300;

  window.addEventListener('scroll', scrollEventHandler);

  function scrollEventHandler() {
    var body = document.getElementById("body");
    var sidebar = document.getElementById("sidebar");
    if (!body || !sidebar || sidebar.style.display === 'none') return;

    if (body.scrollTop < sideBarScrollCheckpoint) {
      if (sidebar.className.indexOf(translucentClass) !== -1) {
        sidebar.className = sidebar.className.replace(translucentClass, '');
      }
    } else {
      if (sidebar.className.indexOf(translucentClass) === -1) {
        sidebar.className += translucentClass;
      }
    }
  }
})();
