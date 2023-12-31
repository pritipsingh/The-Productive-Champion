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

