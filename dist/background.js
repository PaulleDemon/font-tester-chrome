/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
chrome.runtime.onInstalled.addListener(() => {});
let isContentScriptInjected = false;
chrome.action.onClicked.addListener(tab => {
  // alert("action performed")
  console.log('Extension icon clicked, attempting to inject content.js...', isContentScriptInjected);
  if (!isContentScriptInjected) {
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      files: ['content.js']
    }, injectionResults => {
      // failed to inject script
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        isContentScriptInjected = true;
      }
    });
  } else {
    // Remove the content by re-executing the content script with a toggle function or a cleanup
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      function: toggleContentVisibility
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        isContentScriptInjected = false;
      }
    });
  }
});
function toggleContentVisibility() {
  const injectedElement = document.getElementById('font-selector-root');
  const injectedScript = document.getElementById('font-tester-script');
  if (injectedElement) {
    injectedElement.remove(); // Remove the element if it exists
  }
  if (injectedScript) {
    injectedScript.remove();
  }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // if widget closed from content.js file, by clicking on the close button
  if (message.action === 'widgetClosed') {
    console.log("closed from content.js");
    isContentScriptInjected = false;
  }
});
/******/ })()
;
//# sourceMappingURL=background.js.map