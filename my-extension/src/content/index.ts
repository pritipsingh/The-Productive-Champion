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
console.log("I am the ocntent scripttttt!!!")
// chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
//     console.log("what is wrong with youuuuuuu?????-cont" ,message);
    
//     sendResponse({ success: true });
//     return true
// })

// export const blockDistractingSites = async () => {
   
// //     console.log("if this is my focus time", myFocusTime, myCheckTime);
// // //    if(myFocusTime || myCheckTime){
    
// //    }

    for (const name of websitesToBlock) {
        if (window.location.hostname.includes(name)) {
            
            let newNode = document.createElement("div");
            newNode.id = `newid${Date.now()}`; // Unique ID based on timestamp
            newNode.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 9999;
                background: black;
                top:0;
                left:0;
                display:flex; 
                justify-content: center;align-items: center;
            `;
            newNode.innerHTML = `<div style="color: white; display:flex; justify-content: center;
            align-items: center;">it's your focus time. get back to work Now!!!!!!!!!!! : )</div>`;
            document.body.style.overflow = "hidden";
            document.body.appendChild(newNode);
        }
    }

export {}

// // document.body.innerHTML = "helloooo - how are youuuuuu!!!"
// if (window.location.){
//     let newNode = document.createElement("div");
//             // newNode.id = `newid${Date.now()}`;
//             newNode.innerHTML = `<div style="color: white; display:flex; justify-content: center;
//             align-items: center;">it's your focus time. get back to work Now!!!!!!!!!!! : )</div>`;
//             document.body.style.overflow = "hidden";
//             newNode.style.cssText = `
//             position: absolute;
//             width: 100%;
//             height: 100%;
//             z-index: 9999;
//             background: black;
//             top:0;
//             left:0;
//             display:flex; 
//             justify-content: center;align-items: center;
//         `;
//             document.body.appendChild(newNode);
// }
            
 // Call the function to execute the blocking logic
