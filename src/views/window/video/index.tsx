import videojs from 'video.js';
import { useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import qs from 'qs';

const Video = () => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const location = useLocation();
  const src = qs.parse(location.search.split('?')[1]);
  // useEffect(() => {
  //   const player = videojs('window-video', {
  //     controls: true,
  //     autoplay: true,
  //   });
  //   player.on('ready', function () {
  //     player.play();
  //   });
  // });
  return (
    <div>
      <video
        width={800}
        height={600}
        id='window-video'
        src={`file://${src.path}`}
        ref={playerRef}
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default Video;
