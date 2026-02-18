document.getElementById('toggleBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    // Try to send a message
    await chrome.tabs.sendMessage(tab.id, { action: "clean" });
  } catch (err) {
    // If it fails, the content script isn't there. Let's force-inject it.
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, () => {
      // After injection, try sending the message again
      chrome.tabs.sendMessage(tab.id, { action: "clean" });
    });
  }
});