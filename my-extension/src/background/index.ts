const getCurrentTime = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    // const currentTime = `${currentHours}:${currentMinutes}`;
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
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
        return { startTime, endTime }
    } catch (error) {
        console.error("Error retrieving storage values:", error);
    }
}
getStorageValues()
export const value = chrome.runtime.onMessage.addListener((data) => {
    chrome.storage.local.set({ isChecked: JSON.stringify(data.data.isChecked) }).then(() => {
        // Do something after the value is set
        // Value is set
    });

    chrome.storage.local.set({ startTime: data.data.startTime }).then(() => {
        // Do something after the value is set
        // Value is set- start time
    });
    chrome.storage.local.set({ endTime: data.data.endTime }).then(() => {
        // Do something after the value is set
        // Value is set- end time
    });


});

const blockFeature = (isCheckedValue: any, currentTabData: any) => {
    try {
        if (isCheckedValue) {

            chrome.scripting.executeScript({
                target: { tabId: currentTabData.id as any },
                files: ['static/js/content.js'],
            });
        } else {
            // need not be blocked
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
            blockFeature(isCheckedValue, currentTabData)
        });


        const range = await getStorageValues();
        let focusTimes;
        const currentTime = getCurrentTime();
        if (range?.startTime <= currentTime && range?.endTime >= currentTime) {
            focusTimes = true;
        } else {
            focusTimes = false;
        }
        blockFeature(focusTimes, currentTabData);
    });
}

chrome.tabs.onActivated.addListener(function (tab) {
    tabActivity(tab.tabId)
});
chrome.tabs.onUpdated.addListener(function (tab, changeInfo) {
    tabActivity(tab)
});





