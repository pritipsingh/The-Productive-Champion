export const alreadyBlockedWebsites = [
  "reddit",
  "facebook",
  "twitter",
  "roblox",
  "instagram",
  "insta",
  "netflix",
  "amazon",
  "hbo",
  "hotstar",
  "messenger",
];
console.log("I am the content scripttttt!!!");


chrome.storage.local.get(['websitesToBlock'], function(result) {
  console.log("star-1")
  const currentWebsite = window.location.hostname; // or any other method to get the current website
  const websitesList = result.websitesToBlock || [];
  console.log("from cotent", result.websitesToBlock);

  for (const name of websitesList) {
    if (window.location.hostname.includes(name)) {
      createOverlay();
  }}
});

function createOverlay() {
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
      justify-content: center;
      align-items: center;
  `;
  newNode.innerHTML = `<div style="color: white; display:flex; justify-content: center;
      align-items: center;">it's your focus time. get back to work Now!!!!!!!!!!! : )</div>`;
  document.body.style.overflow = "hidden";
  document.body.appendChild(newNode);
}





export {};
