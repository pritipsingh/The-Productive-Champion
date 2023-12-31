console.log("this is background scriptttt!!!!!")

const getCurrentTime = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
   
    const currentTime = `${currentHours}:${currentMinutes}`;
    console.log("my current time" ,currentTime);
    return currentTime;

}

async function getStorageValues() {
    try {
      const startTimePromise = chrome.storage.local.get(["startTime"]);
      const endTimePromise = chrome.storage.local.get(["endTime"]);
  
      const startTimeResult = await startTimePromise;
      const endTimeResult = await endTimePromise;
  
      const startTime = startTimeResult.startTime;
      const endTime = endTimeResult.endTime;
  
      return {startTime , endTime}
    } catch (error) {
      console.error("Error retrieving storage values:", error);
    }
  }
  getStorageValues()
export const value = chrome.runtime.onMessage.addListener((data) => {
    console.log("data from popup" ,data.data);
    chrome.storage.local.set({ isChecked: JSON.stringify(data.data.isChecked) }).then(() => {
        console.log("Value is set", data.data.isChecked);
      });

      chrome.storage.local.set({ startTime: data.data.startTime }).then(() => {
        console.log("Value is set- start time", data.data.startTime);
      });
      chrome.storage.local.set({ endTime: data.data.endTime }).then(() => {
        console.log("Value is set- end time", data.data.endTime);
      });
      
   
  });

  const blockFeature = (isCheckedValue: any ,  currentTabData: any) => {
    try {
            
        console.log("Value currently is - isChecked", isCheckedValue);

        if (isCheckedValue) {
      
          chrome.scripting.executeScript({
            target: { tabId: currentTabData.id as any},
            files: ['static/js/content.js'],
          });
        } else {
          console.log("need not be blocked");
        }
      } catch (error) {
        console.error("Error parsing isChecked:", error);
      }
  }

  const tabActivity = (tab: any) => {
    chrome.tabs.get(tab, async (currentTabData) => {
      
        chrome.storage.local.get(["isChecked"]).then((result) => {
          const isChecked = result.isChecked;
          
    const isCheckedValue = JSON.parse(isChecked);
    console.log(isCheckedValue);
     blockFeature(isCheckedValue, currentTabData)
          
        });

      
const range =  await getStorageValues();
let focusTimes;
const currentTime = getCurrentTime();
console.log(typeof range?.endTime)
console.log(typeof currentTime);
if(range?.startTime <= currentTime && range?.endTime >= currentTime){
    focusTimes = true;
}else{
    focusTimes = false;
}
console.log("the value I am sending" ,focusTimes);
blockFeature(focusTimes, currentTabData);
       
      });
  }
 
  chrome.tabs.onActivated.addListener(function (tab) {
    console.log(tab);
   tabActivity(tab.tabId)
  });
  chrome.tabs.onUpdated.addListener(function (tab, changeInfo) {
    tabActivity(tab)
    console.log(tab, changeInfo)
   });


   

   
