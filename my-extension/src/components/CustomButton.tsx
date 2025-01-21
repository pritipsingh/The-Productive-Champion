interface CustomButtonProps {
  label: string;
  onClick: () => void;
  style?: {
    width: string;
    height: string;
  };
  size?: string;
}

const CustomButton = ({ label, onClick, style = { width: "15rem", height: "3rem" }, size }: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{ width: style.width, height: style.height }}
      className={`text-white ${
        size === "small" && "text-sm"
      } bg-gradient-to-r text-wrap from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800  rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out transform hover:scale-105`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
