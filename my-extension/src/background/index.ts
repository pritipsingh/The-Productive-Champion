const getCurrentTime = () => {
    const now = new Date();
  
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    return currentTime;
}

async function getStorageValues() {
    try {
        const startTimePromise = chrome.storage.local.get(["startTime"]);
        const endTimePromise = chrome.storage.local.get(["endTime"]);
        const customWebsitesvToBlockPromise= chrome.storage.local.get(["websitesToBlock"])
        
        const startTimeResult = await startTimePromise;
        const endTimeResult = await endTimePromise;
        const customWebsitesvToBlockResult: any = await customWebsitesvToBlockPromise;
        const startTime = startTimeResult.startTime;
        const endTime = endTimeResult.endTime;
        const customWebsitesvToBlock= customWebsitesvToBlockResult.websitesToBlock

        return { startTime, endTime, customWebsitesvToBlock}
    } catch (error) {
        console.error("Error retrieving storage values:", error);
    }
}
getStorageValues()
export const value = chrome.runtime.onMessage.addListener((data) => {

  
    if(data.event === "onStart"){
        chrome.storage.local.set({ isChecked: JSON.stringify(data.data.isChecked) }).then(() => {
        // console.log("Value is set", data.data.isChecked);
    });

    chrome.storage.local.set({ startTime: data.data.startTime }).then(() => {
        // Do something after the value is set
        // Value is set- start time
    });
    chrome.storage.local.set({ endTime: data.data.endTime }).then(() => {
        console.log("Value is set- end time", data.data.endTime);
    });
    }
    if(data.event === "websitesToBlock"){
        chrome.storage.local.set({ websitesToBlock: data.data }).then(() => {
        console.log("websitesToBlock 2,3,4", data.data);
    });
    }
    
    


});

const blockFeature = async(isCheckedValue: any, currentTabData: any) => {
    try {
        const storageValues=  await getStorageValues()


        console.log("Value currently is - isChecked", isCheckedValue);

        if (isCheckedValue){
        
            chrome.scripting.executeScript({
                target: { tabId: currentTabData.id as any },
                files: ['static/js/content.js'],
            });
    return 1;
    } else {
            console.log("need not be blocked");
            
        }
    } catch (error) {
        console.error("Error parsing isChecked:", error);
    }
}

const tabActivity = (tab: any) => {
    chrome.tabs.get(tab, async (currentTabData) => {
const range = await getStorageValues();
        chrome.storage.local.get(["isChecked"]).then((result) => {
            const isChecked = result.isChecked;
            
            const isCheckedValue = JSON.parse(isChecked);
            if(isCheckedValue === true){
                console.log("timeeee",isCheckedValue);
             blockFeature(isCheckedValue, currentTabData)
             return;
            }
            
            console.log("at the fn", range)
            let focusTimes;
            const currentTime = getCurrentTime();
      
            if (range?.startTime <= currentTime && range?.endTime >= currentTime) {
                console.log("hereeeee-111")
                focusTimes = true;
            } else {
                console.log("hereeeee-222")
                focusTimes = false;
            }
            console.log("the value I am sending", focusTimes);
            blockFeature(focusTimes, currentTabData);
            
        });




    });
}

chrome.tabs.onActivated.addListener(function (tab) {
    tabActivity(tab.tabId)
});
chrome.tabs.onUpdated.addListener(function (tab, changeInfo) {
    tabActivity(tab)
});





