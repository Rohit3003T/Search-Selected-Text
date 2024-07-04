chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "textSelected") {
      searchWithGeminiAI(request.text);
    }
  });
  
  async function searchWithGeminiAI(text) {
    const API_KEY = 'process.env.API_KEY';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze the following text: ${text}`
            }]
          }]
        })
      });
  
      const data = await response.json();
      const result = data.candidates[0].content.parts[0].text;
  
      chrome.storage.local.set({ 'aiResult': result, 'selectedText': text }, () => {
        chrome.runtime.sendMessage({action: "updatePopup"});
      });
    } catch (error) {
      console.error('Error:', error);
      chrome.storage.local.set({ 'aiResult': 'Error: Unable to fetch response from Gemini AI.' }, () => {
        chrome.runtime.sendMessage({action: "updatePopup"});
      });
    }
  }