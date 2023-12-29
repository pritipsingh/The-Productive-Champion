console.log("this is background scriptttt!!!!!")

const websitesToBlock = [
    "reddit",
    "facebook",
    "twitter",
    "roblox",
    "instagram",
    "insta",
    "netflix",
    "amazon",
    "facebook",
    "hbo",

    "hotstar",
    "messenger",
];

export const value = chrome.runtime.onMessage.addListener((data) => {
    console.log("what is wrong with youuuuuuu?????" ,data.data);
    chrome.storage.local.set({ isChecked: JSON.stringify(data.data.isChecked) }).then(() => {
        console.log("Value is set", data.data.isChecked);
      });
      chrome.storage.local.set({ isFocusTime: JSON.stringify(data.data.isFocusTime) }).then(() => {
        console.log("Value is set", data.data.isFocusTime);
      });
      
   
  });

  chrome.tabs.onActivated.addListener(function(tab){ 
    chrome.tabs.get(tab.tabId , (currenTabData) => {
        // console.log(currenTabData)
     

    for (const name of websitesToBlock) {
       
      if (currenTabData.url?.includes(name)) {
        console.log("needto");
      chrome.scripting.executeScript({
        target: { tabId: currenTabData.id as any },
        files: ['static/js/content.js'],
     
        
    })
    
    }else{
        console.log("need not be blocked")
    }

}

  })

})
//   chrome.tabs.onActivated.addListener(function(tab){
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     // chrome.storage.local.get(["isChecked"]).then((result) => {
//     //     console.log("Value currently is " + JSON.parse(result.isChecked));
//     //     chrome.tabs.sendMessage(tabs[0].id as any, { isChecked: JSON.parse(result.isChecked) }, function (response) {
//     //         console.log("Response from content script:", response);
//     //     });
//     //   });
//     // const intervalId = setInterval(() => { 
//         console.log(tabs[0]);
//  chrome.tabs.sendMessage(tabs[0].id as any, { message: "msg from bg" }, function (response) {
//         console.log("Response from content script:", response);

//     });

   

   
    
// }, 60000);
// return () => clearInterval(intervalId);

// });})

//   chrome.storage.local.get(["isFocusTime"]).then((result) => {
//     console.log("Value currently is " + JSON.parse(result.isFocusTime));
//     chrome.runtime.sendMessage({
//         isFocusTime:  JSON.parse(result.isFocusTime)
//     }, (res) => 
    
//     {console.log(res)})
//   });