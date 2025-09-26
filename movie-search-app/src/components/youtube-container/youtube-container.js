import React, { useState } from 'react';
import { AspectRatio, Image } from '@mantine/core';
import './youtube-container.scss';

export default function YoutubeContainer({ obj }) {
  const [click, setClick] = useState(false);

  return click ? (
    <AspectRatio ratio={16 / 9} maw={288}>
      <iframe
        className="new-trailers-trailer"
        src={`https://www.youtube.com/embed/${obj.url}?autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </AspectRatio>
  ) : (
    <div className="yt-trailer-container" onClick={() => setClick(true)}>
      <Image
        className="new-trailers-poster"
        src={` https://img.youtube.com/vi/${obj.url}/hqdefault.jpg`} //width 480
        fallbackSrc="/noPoster.png"
        alt={`${obj.url} poster`}
      />
      <Image className="new-trailers-youtube-logo" w={100} src={`/youtube.svg`} alt={`youtube logo`} />
    </div>
  );
}
