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

function isTimeInRange(startHour, startMinute, endHour, endMinute) {
    const now = new Date();
    const startTime = new Date();
    const endTime = new Date();

    startTime.setHours(startHour, startMinute, 0, 0);
    endTime.setHours(endHour, endMinute, 0, 0);

    return now >= startTime && now <= endTime;
}

const blockDistractingSites = async () => {
    let myFocusTime = true;
    // Add your logic to get start and end times from storage
    // myFocusTime = isTimeInRange(startHour, startMinute, endHour, endMinute);
   
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
            align-items: center;">get back to work : )</div>`;
            document.body.style.overflow = "hidden";
            document.body.appendChild(newNode);
        }
    }
};

blockDistractingSites(); // Call the function to execute the blocking logic
