interface LogoProps {
  width?: string; // Optional width prop
  height?: string; // Optional height prop
}

const Logo: React.FC<LogoProps> = ({ width = "100px", height = "100px" }) => {
  return (
    <div
      style={{ width, height }} // Correctly set the width and height
      className="flex items-center justify-center p-2 border border-gray-300 rounded-lg bg-white shadow-sm"
    >
      <span className="text-xl font-bold text-blue-600">Logo</span>
    </div>
  );
};

export default Logo;
