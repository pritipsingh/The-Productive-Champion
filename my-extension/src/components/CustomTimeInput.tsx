interface CustomTimeInputProps {
  label: string;
  timeValue: string;
  handleTimeChange: (value: string) => void;
}

const CustomTimeInput = ({ label, timeValue, handleTimeChange }: CustomTimeInputProps) => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <label className="block text-md font-semibold uppercase text-gray-800">{label}</label>
      <input
        type="time"
        value={timeValue}
        id={label}
        onChange={(e) => handleTimeChange(e.target.value)}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default CustomTimeInput;
