import React from "react";

const WaitingForMatch: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center  h-[300px] text-gray-800 p-4">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-4">Finding an Opponent...</h1>

      {/* Subtext */}
      <p className="text-gray-500 mb-8 text-center">
        Please wait while we connect you to another player.
      </p>

      {/* Modern animated loader */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
        <div className="absolute w-10 h-10 bg-blue-500 rounded-full animate-ping"></div>
      </div>

      {/* Optional fun text animation */}
      <div className="flex items-center space-x-2 text-blue-600 font-medium">
        <span className="animate-bounce delay-0">●</span>
        <span className="animate-bounce delay-150">●</span>
        <span className="animate-bounce delay-300">●</span>
      </div>
    </div>
  );
};

export default WaitingForMatch;
