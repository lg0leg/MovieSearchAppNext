import React, { useState } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AspectRatio, Button, Image, Modal } from '@mantine/core';
import './youtube-container.scss';

export default function YoutubeContainer({ obj }) {
  const [click, setClick] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handler = () => {
    setClick(true);
    open();
  };

  return click ? (
    <>
      <AspectRatio ratio={16 / 9} maw={288}>
        <iframe
          className="new-trailers-trailer"
          src={`https://www.youtube.com/embed/${obj.url}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </AspectRatio>
      <Modal
        styles={{
          body: {
            backgroundColor: '#1b1a1aff',
          },
        }}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="auto"
        p={0}
        fullScreen={isMobile}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <AspectRatio ratio={16 / 9} miw={'70vw'}>
          <iframe
            src={`https://www.youtube.com/embed/${obj.url}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </AspectRatio>
        {isMobile && (
          <Button variant="subtle" onClick={close}>
            Close
          </Button>
        )}
      </Modal>
    </>
  ) : (
    <div className="yt-trailer-container" onClick={handler}>
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
