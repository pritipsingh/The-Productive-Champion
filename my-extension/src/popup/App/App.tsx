import React, { useEffect, useState } from 'react';
import logomain from './logomain1.png'
import { eventNames } from 'process';
import CustomButton from '../../components/CustomButton';
import CustomToggle from '../../components/CustomToggle';
import CustomTimeInput from '../../components/CustomTimeInput';
function App() {

  const [isChecked, setIsChecked] = useState<boolean>(JSON.parse(localStorage.getItem('isChecked')!) || false);
  const [startTime, setStartTime] = useState(localStorage.getItem('startTime') || '');
  const [endTime, setEndTime] = useState(localStorage.getItem('endTime') || '');
  const handleToggle = () => {
    setIsChecked(!isChecked);
    localStorage.setItem('isChecked', JSON.stringify(!isChecked));
  };

  const handleStartTimeChange = (event: any) => {
    setStartTime(event.target.value);
  };

  // Event handler for changes in end time input
  const handleEndTimeChange = (event: any) => {
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

  chrome.runtime.sendMessage({ event: 'onStart', data });

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
        <img src={logomain} className='' alt="logo" />
      </div>
      <div className='flex justify-center items-center mt-[2vh]'>
        <p className='text-[1rem] text-center text-gray-700 underline'>Focus Hours ON until it's on</p>
      </div>

      {/* The toggle for Focs hour */}
      <CustomToggle isChecked={isChecked} handleToggle={handleToggle} />


      {/* The time interval for setting focus hours */}
      <p className='text-[1rem] text-gray-700 flex justify-center items-center underline mt-[8vh]'>Set Your Focus Hours</p>
      <header className="mt-[2vh] flex gap-2 justify-center items-center">
        {/* Set Start Time */}
        <CustomTimeInput label='Start Time' timeValue={startTime} handleTimeChange={handleStartTimeChange}/>
        
        {/* Set End Time */}
        <CustomTimeInput label='End Time' timeValue={endTime} handleTimeChange={handleEndTimeChange}/>

      </header>
      <div className='flex justify-center items-center mt-[5vh]'>
        {/* Save button for focus hours */}
        <CustomButton onClick={handleFocusTime} label='Save Your Focus Hours'/>

        {/* Reset Button for interval */}
        <CustomButton onClick={handleReset} label='Reset Time Interval'/>

      </div>
      <div className='flex justify-center items-center mt-[3vh]'>
        {
          localStorage.getItem('startTime')?.trim().length! > 0 && localStorage.getItem('endTime')?.trim().length! > 0 ?
            (startTime <= currentTime && endTime >= currentTime) ? <p className='text-[0.5rem]'>You're in focus mode currently</p> : <p className='text-[0.5rem]'>Focus Mode Starting soon...</p>
            : null
        }
      </div>

      {/* Footer */}

      <div className='absolute bottom-0 flex text-center mx-auto px-auto mb-[5vh] justify-center items-center flex-col'>
        <p>Focus mode ON means, blocking distracting websites. <a target="_blank" href='https://github.com/pritipsingh/The-Productive-Champion'><span> Click here</span> to read about which websites are blocked or to add more websites.</a></p>
        <a target="_blank" href='https://github.com/pritipsingh/The-Productive-Champion' className='mt-[2vh] underline'>Leave a ⭐️ on GitHub</a>
      </div>
    </div>
  );
}

export default App;
