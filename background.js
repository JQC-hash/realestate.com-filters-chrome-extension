let extensionOn = true;

let realestateRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      //pageUrl: { hostSuffix: '.realestate.com.au', schemes: ['https'] },
      pageUrl: { urlContains: 'realestate.com.au/buy', schemes: ['https'] },
    })
  ],
  actions: [ new chrome.declarativeContent.ShowAction() ]
};

chrome.runtime.onInstalled.addListener(resetRERule);

chrome.action.onClicked.addListener(
    function(tab) {
      if (extensionOn){
        chrome.declarativeContent.onPageChanged.removeRules(undefined);
        extensionOn = false;
        location.reload();
      }
      else{
        executeContentScript(tab);
        resetRERule();
        extensionOn = true;
      }
});

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        executeContentScript: true,
        tab: tab
      })
    }
  }
);

function executeContentScript(tab){
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['cnotent-script.js']
  });
}

function resetRERule(){
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([realestateRule]);
  });
}