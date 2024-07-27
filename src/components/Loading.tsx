
function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24 border-4 border-t-4 border-blue-500 border-opacity-50 rounded-full animate-spin"></div>
        </div>
        <div className="text-white text-xl font-semibold">Loading...</div>
      </div>
    </div>
  );
}

export default Loading;
