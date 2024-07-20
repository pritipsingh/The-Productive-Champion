import ReactDOM from "react-dom";
import Restrict from "../components/Restrict";

export interface defaultBlockedSites {
  alreadyBlockedWebsites:string[]
}
// added an interface for the already blocked sites
export const alreadyBlockedWebsites:defaultBlockedSites['alreadyBlockedWebsites'] = [
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

chrome.storage.local.get(["websitesToBlock"], function (result) {
  console.log("star-1");
  const currentWebsite = window.location.hostname; // or any other method to get the current website

  const websitesList = result.websitesToBlock || [];
  console.log("from cotent", result.websitesToBlock);

  const restricExist = websitesList.some((item: string) =>
    currentWebsite.toLowerCase().includes(item.toLowerCase())
  );

  if (restricExist) {
    const div = document.createElement("div");
    document.body.style.overflow = "hidden";
    document.body.appendChild(div);
    ReactDOM.render(<Restrict />, div);
  }
});
