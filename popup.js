function updateResult() {
    chrome.storage.local.get(['aiResult', 'selectedText'], function(data) {
      if (data.selectedText) {
        document.getElementById('selectedText').textContent = data.selectedText;
      }
      if (data.aiResult) {
        document.getElementById('result').textContent = data.aiResult;
      }
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updatePopup") {
      updateResult();
    }
  });
  
  document.addEventListener('DOMContentLoaded', updateResult);