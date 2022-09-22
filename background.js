let realestateRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostSuffix: '.realestate.com.au', schemes: ['https'] },
    })
  ],
  actions: [ new chrome.declarativeContent.ShowAction() ]
};

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([realestateRule]);
  });
});