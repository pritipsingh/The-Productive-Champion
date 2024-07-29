import {
  useCustomWebsitesToBlock,
  useShowWebsiteEditPage,
} from "../zustand/state";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { alreadyBlockedWebsites } from "../content";
import { IoMdArrowDropdown, IoMdArrowBack } from "react-icons/io";

export default function WebsiteEditPage() {
  const { addWebsitesToBlock, customWebsitesToBlock, removeWebsitesToBlock } =
    useCustomWebsitesToBlock((state: any) => state); // zustand state to manage the websites user wants to block.
  const { setShowWebsiteEditPage } = useShowWebsiteEditPage(
    (state: any) => state
  ); // zustand state to check which page user is viewing.

  const [newWebsiteName, setNewWebsiteName] = useState("")
  const [showAlreadyBlockedWebsites, setShowAlreadyBlockedWebsites] = useState<boolean>(true) // websites that are already blocked (eg. reddit, insta etc.)
  const [showCustomBlockedWebsites, setShowCustomBlockedWebsites] = useState<boolean>(true) // websites that are 
  const [alreadyBlockedWebsitesSet, setSlreadyBlockedWebsitesSet] = useState([])
  const [hasOpened, setHasOpened] = useState<boolean | null>(JSON.parse(localStorage.getItem('hasOpened')!) ? JSON.parse(localStorage.getItem('hasOpened')!) : false)

  console.log(hasOpened)

  useEffect(() => {
    // Load saved list from local storage or use the hardcoded list if none is found
    const savedItems = JSON.parse(localStorage.getItem('alreadyBlockedWebsites')!);
    if (savedItems && savedItems.length > 0) {
      setSlreadyBlockedWebsitesSet(savedItems);
    } else {
      // If savedItems is null, empty, or parsing failed
      if (hasOpened) {
        // If the app has been opened before, set to an empty array
        setSlreadyBlockedWebsitesSet([]);
      } else {
        // If the app has not been opened before, use the hardcoded list and mark as opened
        setSlreadyBlockedWebsitesSet(alreadyBlockedWebsites); // Assuming 'alreadyBlockedWebsites' is an array
        setHasOpened(true); // This marks the initial setup as done
      }
    }
  }, []); //this was different from the code in the deployment so copied the deployed code back which caused the edit websites to block to start working again

  useEffect(() => {
    localStorage.setItem('hasOpened', JSON.stringify(true));

  }, [hasOpened])
  useEffect(() => {
    // Save the current list to local storage whenever it changes
    localStorage.setItem('alreadyBlockedWebsites', JSON.stringify(alreadyBlockedWebsitesSet));
  }, [alreadyBlockedWebsitesSet]);

  const deleteItem = (index: number) => {
    const newAlreadyBlockedWebsitesSet = alreadyBlockedWebsitesSet.filter((item, i) => i !== index);
    setSlreadyBlockedWebsitesSet(newAlreadyBlockedWebsitesSet);
  };


  console.log(JSON.parse(localStorage.getItem('websitesToBlock')!))
  let customWebsites = JSON.parse(localStorage.getItem('websitesToBlock')!)
  console.log("new wesbties", customWebsites)
  let data = customWebsites ? [...customWebsites, ...alreadyBlockedWebsites] : [...alreadyBlockedWebsites];
  chrome?.runtime?.sendMessage({ event: 'websitesToBlock', data });
  return (
    <section className="h-[100vh] relative mx-auto px-auto flex flex-col items-center">
      <div className='flex flex-row items-center gap-5 mt-4 justify-center'>
        <IoMdArrowBack onClick={() => {
          setShowWebsiteEditPage(false)
        }} className='-ml-8 cursor-pointer' size={20} />
        <h2 className='underline font-bold'>Websites to block</h2>
      </div>
      <div className='overflow-y-auto max-h-3/4 flex flex-col gap-1 mt-5'>
        <div className={`flex flex-row items-center justify-center gap-2 cursor-pointer underline`} onClick={() => {
          setShowAlreadyBlockedWebsites(!showAlreadyBlockedWebsites)
        }}>
          <span>Already blocked websites</span>
          <IoMdArrowDropdown size={20} className={`${showAlreadyBlockedWebsites ? "rotate-180" : "rotate-0"}`} />
        </div>
        {showAlreadyBlockedWebsites && alreadyBlockedWebsites.map((website: string) => (
          <div className='flex flex-row gap-3 items-center'>
            <div className='w-[20ch]'>
              <p className=''>{website}</p>
            </div>
          </div>
        ))}
        <div className={`flex flex-row items-center justify-center gap-2 cursor-pointer underline`} onClick={() => {
          setShowCustomBlockedWebsites(!showCustomBlockedWebsites)
        }}>
          <span>Custom blocked websites</span>
          <IoMdArrowDropdown size={20} className={`${showCustomBlockedWebsites ? "rotate-180" : "rotate-0"}`} />
        </div>
        {showCustomBlockedWebsites && customWebsitesToBlock.lenght !== 0 && customWebsitesToBlock.map((website: string) => (
          <div className='flex flex-row gap-3 items-center'>
            <div className='w-[20ch]'>
              <p>{website}</p>
            </div>

            <MdDelete
              onClick={() => {
                localStorage.setItem(
                  "websitesToBlock",
                  JSON.stringify(
                    customWebsitesToBlock.filter(
                      (websites: string) => websites !== website
                    )
                  )
                );
                removeWebsitesToBlock(website);
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-3 mt-4">
        <input
          className="px-2 py-2 rounded-md"
          type="text"
          placeholder="Enter website name"
          maxLength={63}
          onChange={(e) => {
            setNewWebsiteName(e.target.value);
          }}
          value={newWebsiteName}
        />
        <button
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
          onClick={() => {
            if (newWebsiteName !== "") {
              localStorage.setItem(
                "websitesToBlock",
                JSON.stringify([...customWebsitesToBlock, newWebsiteName])
              );
              addWebsitesToBlock(newWebsiteName);
              setNewWebsiteName("");
            }
          }}
        >
          Add website name
        </button>
      </div>
    </section>
  );
}

export { };
