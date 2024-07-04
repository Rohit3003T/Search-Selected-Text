document.addEventListener('mouseup', function() {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      chrome.runtime.sendMessage({action: "textSelected", text: selectedText});
    }
  });