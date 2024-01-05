import React from "react";

interface CustomToggleProps {
  isChecked: boolean;
  handleToggle: () => void;
}

const CustomToggle = ({isChecked, handleToggle}: CustomToggleProps) => {
  return (
    <div className="flex justify-center items-center mt-[2vh]">
      <label htmlFor="toggle" className="cursor-pointer align-middle">
        <div className="relative">
          {/* Input */}
          <input
            type="checkbox"
            id="toggle"
            className="sr-only"
            checked={isChecked}
            onChange={handleToggle}
          />
          {/* Track */}
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          {/* Thumb */}
          <div
            className={`${
              isChecked ? "translate-x-6 bg-pink-500" : "translate-x-0 bg-white"
            } absolute left-0 top-0 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300`}
          ></div>
        </div>
      </label>
      <span className="ml-2 text-sm font-semibold">
        {isChecked ? "On" : "Off"}
      </span>
    </div>
  );
};

export default CustomToggle;
