import React, {useEffect, useState} from 'react';
import logomain from './logomain1.png'
import { eventNames } from 'process';
function App() {

  const [isChecked, setIsChecked] = useState<boolean>(JSON.parse(localStorage.getItem('isChecked')!) || false);
  const [startTime, setStartTime] = useState(localStorage.getItem('startTime') || '');
  const [endTime, setEndTime] = useState(localStorage.getItem('endTime') || '');
  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log("value of check" , isChecked);
   
    localStorage.setItem('isChecked', JSON.stringify(!isChecked));
  };

  const handleStartTimeChange = (event : any) => {
   
    setStartTime(event.target.value);
  };

  // Event handler for changes in end time input
  const handleEndTimeChange = (event : any) => {

    setEndTime(event.target.value);
  };

  const handleFocusTime = () => {
   
     localStorage.setItem('startTime', startTime);
    localStorage.setItem('endTime', endTime);
 

  }
  const data = {

    startTime,
    endTime,
    isChecked
  }
  chrome.runtime.sendMessage({event: 'onStart', data});


const handleReset = () => {

  setStartTime('');
  setEndTime('');
  localStorage.setItem('startTime', '');
    localStorage.setItem('endTime', '');
  
}

const now = new Date();
const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  return (
    <div className="h-[100vh] relative mx-auto px-auto">
   <div className='mx-auto flex justify-center items-center w-[32%] text-center h-[15%]'>
        <img src={logomain} className='' alt="logo"/>
   </div>
   <div className='flex justify-center items-center mt-[2vh]'>
      <p className='text-[1rem] text-center text-gray-700 underline'>Focus Hours ON until it's on</p>
    </div>

{/* 
The toggle for Focs hour */}

   <div className='flex justify-center items-center mt-[2vh]'>
    
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
              isChecked ? 'translate-x-6 bg-pink-500' : 'translate-x-0 bg-white'
            } absolute left-0 top-0 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300`}
          ></div>
        </div>
      </label>
      <span className="ml-2 text-sm font-semibold">{isChecked ? 'On' : 'Off'}</span>
   </div>

   {/*  */}
  

  {/* The time interval for setting focus hours */}
   <p className='text-[1rem] text-gray-700 flex justify-center items-center underline mt-[8vh]'>Set Your Focus Hours</p>
      <header className="mt-[2vh] flex gap-2 justify-center items-center">

    
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
    <input type="time" value={startTime} id="startTime" onChange={(e) => handleStartTimeChange(e)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

    
  </div>

  <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">End Time</label>
    <input type="time" id="startTime" value={endTime} onChange={(e) => handleEndTimeChange(e)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

    
  </div>
      </header>
      <div className='flex justify-center items-center mt-[5vh]'>
    
      <button onClick={handleFocusTime} type="button" className="text-white w-[40vw] bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2">Save Your Focus Hours</button>


      {/* Reset Button for interval */}
      <button onClick={handleReset} type="button" className="text-white w-[40vw] bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2">Reset Time Interval</button>

      </div>
      <div className='flex justify-center items-center mt-[3vh]'>
        {
          localStorage.getItem('startTime')?.trim().length! >0 && localStorage.getItem('endTime')?.trim().length!  > 0 ?
           (startTime <= currentTime && endTime >= currentTime) ? <p className='text-[0.5rem]'>You're in focus mode currently</p>  : <p className='text-[0.5rem]'>Focus Mode Starting soon...</p>
           : null
        }
   
   </div>




    {/* Footer */}



      <div className='absolute bottom-0 flex text-center mx-auto px-auto mb-[5vh] justify-center items-center flex-col'>
  <p>Focus mode ON means, blocking distracting websites. <a href='https://github.com/pritipsingh/The-Productive-Champion'><span> Click here</span> to read about which websites are blocked or to add more websites.</a></p>
  <a href='https://github.com/pritipsingh/The-Productive-Champion' className='mt-[2vh] underline'>Leave a ⭐️ on GitHub</a>
</div>
    </div>
  );
}

export default App;
