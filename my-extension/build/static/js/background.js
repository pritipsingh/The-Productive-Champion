(()=>{"use strict";async function e(){try{const e=chrome.storage.local.get(["startTime"]),t=chrome.storage.local.get(["endTime"]),o=chrome.storage.local.get(["websitesToBlock"]),r=await e,s=await t,a=await o,i=r.startTime,c=s.endTime;return{startTime:i,endTime:c,customWebsitesvToBlock:a.websitesToBlock}}catch(e){console.error("Error retrieving storage values:",e)}}e();chrome.runtime.onMessage.addListener((e=>{"onStart"===e.event&&(chrome.storage.local.set({isChecked:JSON.stringify(e.data.isChecked)}).then((()=>{})),chrome.storage.local.set({startTime:e.data.startTime}).then((()=>{})),chrome.storage.local.set({endTime:e.data.endTime}).then((()=>{}))),"websitesToBlock"===e.event&&chrome.storage.local.set({websitesToBlock:e.data}).then((()=>{}))}));const t=async(e,t)=>{try{if(e)return chrome.scripting.executeScript({target:{tabId:t.id},files:["static/js/content.js"]}),1}catch(o){console.error("Error parsing isChecked:",o)}},o=o=>{chrome.tabs.get(o,(async o=>{const r=await e();chrome.storage.local.get(["isChecked"]).then((e=>{const s=e.isChecked,a=JSON.parse(s);if(!0===a)return void t(a,o);let i;const c=(new Date).toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit"});i=(null===r||void 0===r?void 0:r.startTime)<=c&&(null===r||void 0===r?void 0:r.endTime)>=c,t(i,o)}))}))};chrome.tabs.onActivated.addListener((function(e){o(e.tabId)})),chrome.tabs.onUpdated.addListener((function(e,t){o(e)}))})();
//# sourceMappingURL=background.js.map