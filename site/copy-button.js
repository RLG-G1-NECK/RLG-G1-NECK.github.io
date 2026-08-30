// implements a copy code button for code blocks
// vibecoded; I don't know how this works lmao

(function () {
  "use strict";

  function getCodeText(pre) {
    var code = pre.querySelector("code");
    var text = (code || pre).innerText;
    // Strip a single trailing newline that most highlighters emit.
    return text.replace(/\n$/, "");
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for browsers without the async Clipboard API.
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  function addCopyButtons() {
    var blocks = document.querySelectorAll(".rst-content pre");
    blocks.forEach(function (pre) {
      if (pre.dataset.copyButtonAdded) {
        return;
      }
      pre.dataset.copyButtonAdded = "true";
      pre.classList.add("copy-button-wrapper");

      var button = document.createElement("button");
      button.type = "button";
      button.className = "copy-button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code to clipboard");

      button.addEventListener("click", function () {
        copyText(getCodeText(pre))
          .then(function () {
            button.textContent = "Copied!";
            button.classList.add("copy-button-success");
          })
          .catch(function () {
            button.textContent = "Failed";
            button.classList.add("copy-button-error");
          })
          .finally(function () {
            setTimeout(function () {
              button.textContent = "Copy";
              button.classList.remove("copy-button-success", "copy-button-error");
            }, 1500);
          });
      });

      pre.appendChild(button);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addCopyButtons);
  } else {
    addCopyButtons();
  }
})();
