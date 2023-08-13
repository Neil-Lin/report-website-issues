// console.log('Hello from the background script!');
// chrome.runtime.onMessage.addListener((msg) => {
//   console.log(msg.text);
// });

// 'use strict';

// chrome.runtime.onInstalled.addListener(function(){
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'twitter.com'},
//       })],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });