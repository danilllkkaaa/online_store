import React from "react";

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="aspect-video bg-black flex items-center justify-center">
        {videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-contain"
            controls
          />
        ) : (
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4"></div>
            <p className="text-white">Video will be added soon</p>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-800">
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default VideoPlayer;
