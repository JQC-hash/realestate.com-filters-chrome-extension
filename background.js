let extensionOn = true;

let realestateRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostSuffix: '.realestate.com.au', schemes: ['https'] },
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

function executeContentScript(tab){
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js']
  });
}

function resetRERule(){
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([realestateRule]);
  });
}