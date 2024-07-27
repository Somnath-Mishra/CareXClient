
// function Loading() {
//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//     </div>
//   );
// }

// export default Loading;

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
