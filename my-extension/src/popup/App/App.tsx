import { useState } from "react";
import Logo from "./Assets/ExtensionLogo.png";
import WebsiteEditPage from "../../components/WebsiteEditPage";
import { useShowWebsiteEditPage } from "../../zustand/state";
import CustomButton from "../../components/CustomButton";
import CustomToggle from "../../components/CustomToggle";
import CustomTimeInput from "../../components/CustomTimeInput";

function App() {
  const { showWebsiteEditPage, setShowWebsiteEditPage } = useShowWebsiteEditPage((state: any) => state); // zustand state for showing WebsiteEditPage
  const [isChecked, setIsChecked] = useState<boolean>(JSON.parse(localStorage.getItem("isChecked")!) || false);
  const [startTime, setStartTime] = useState(localStorage.getItem("startTime") || "");
  const [endTime, setEndTime] = useState(localStorage.getItem("endTime") || "");
  const [isFocusModeStarted, setIsFousModeStarted] = useState<boolean>(false);

  //#region Variables
  const now = new Date();
  const currentTime = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
  //#endregion Variables

  //#region Event Handlers
  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
  };

  const handleReset = () => {
    setStartTime("");
    setEndTime("");
  };

  //#endregion Event Handlers

  const data = {
    startTime,
    endTime,
    isChecked,
  };

  //sending the data to background.js
  chrome?.runtime?.sendMessage({ event: "onStart", data });

  return showWebsiteEditPage ? (
    <WebsiteEditPage />
  ) : (
    <div className="h-screen flex  flex-col items-center">
      <div className=" w-1/2  text-center  rounded-lg mt-4">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex justify-center items-center mt-2">
        <p className="text-[1rem] text-center text-gray-800 text-xl font-sans font-bold ">Toggle to dive into FOCUS Mode</p>
      </div>

      {/* The toggle for Focus hour */}
      <CustomToggle isChecked={isChecked} handleToggle={handleToggle} />

      <div className="w-full flex justify-center items-center mt-5">
        <CustomButton label="Edit Websites to block" onClick={() => setShowWebsiteEditPage(true)} />
      </div>

      {/* The time interval for setting focus hours */}
      <p className="text-[1rem] text-gray-800 flex justify-center  font-sans font-semibold mt-3">Set Your Focus Hours</p>
      <header className="mt-5 flex gap-2 justify-center items-center">
        {/* Set Start Time */}
        <CustomTimeInput label="Start Time" timeValue={startTime} handleTimeChange={handleStartTimeChange} />

        {/* Set End Time */}
        <CustomTimeInput label="End Time" timeValue={endTime} handleTimeChange={handleEndTimeChange} />
      </header>
      <div className="flex justify-center items-center mt-5">
        {/* Save button for focus hours */}
        <CustomButton
          onClick={() => setIsFousModeStarted(true)}
          label="Save Your Focus Hours"
          size="small"
          style={{ width: "10rem", height: "3rem" }}
        />

        {/* Reset Button for interval */}
        <CustomButton onClick={handleReset} label="Reset Time Interval" size="small" style={{ width: "10rem", height: "3rem" }} />
      </div>
      <div className="flex justify-center items-center mt-1">
        {isFocusModeStarted && startTime && endTime && startTime <= currentTime && endTime >= currentTime ? (
          <p className="text-sm">
            You're in <span className="font-semibold">focus mode</span> currently
          </p>
        ) : (
          <p className="text-sm">
            <span className="font-semibold">Focus Mode</span> starting soon...
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-2  flex text-center mx-auto px-auto  justify-center items-center flex-col">
        <p className="font-sans  text-gray-800">
          Focus mode <span className="font-bold">ON</span> means, blocking distracting websites.{" "}
          <a target="_blank" rel="noreferrer" href="https://github.com/pritipsingh/The-Productive-Champion">
            <span className="underline italic"> Click here</span>
          </a>{" "}
          to read about which websites are blocked or to add more websites.
        </p>
        <a target="_blank" rel="noreferrer" href="https://github.com/pritipsingh/The-Productive-Champion" className="mt-[2vh] underline">
          Leave a ⭐️ on GitHub
        </a>
      </div>
    </div>
  );
}

export default App;
