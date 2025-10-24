// content script: extracts visible text and provides a context menu action via messaging
(function(){
 function extractVisibleText() {
   const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
   let node, text = [];
   while (node = walker.nextNode()) {
     const t = node.nodeValue.trim();
     if (t.length > 30) text.push(t);
   }
   return text.join("\n\n");
 }


 // expose a simple API for the popup to request page text
 chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
   if (msg && msg.type === 'GET_PAGE_TEXT') {
     sendResponse({text: extractVisibleText(), url: location.href});
   }
   // allow other messages
 });
})();
