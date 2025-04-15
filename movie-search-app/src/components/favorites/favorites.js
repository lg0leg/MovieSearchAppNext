'use client';

import './favorites.scss';
import { Button, Modal, Rating, Space } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import { FavContext } from '../../state/state';
import Star from '../star/star';

export default function Favorites({ info }) {
  const favContext = useContext(FavContext);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  const isMobile = useMediaQuery('(max-width: 500px)');

  const checkFavorites = () => {
    if (favContext.favState.favoritesId.includes(info.id)) {
      setFavorite(true);
      setRating(favContext.favState.favoritesRating.find((el) => el.itemId === info.id).itemRating);
    }
  };

  useEffect(checkFavorites, [info]);

  const addItemToFavorites = () => {
    const rt = { itemId: info.id, itemRating: rating };
    if (!favContext.favState.favoritesId.includes(info.id)) {
      setFavorite(true);
      favContext.favDispatch({ type: 'ADD_ID_TO_FAVORITES', payload: info.id });
      favContext.favDispatch({ type: 'ADD_ITEM_TO_FAVORITES', payload: info });
      favContext.favDispatch({ type: 'SET_RATING_FOR_ITEM', payload: rt });
    } else {
      //обновление уже существующей оценки
      favContext.favDispatch({ type: 'REMOVE_RATING_FROM_ITEM', payload: info.id });
      favContext.favDispatch({ type: 'SET_RATING_FOR_ITEM', payload: rt });
    }
  };

  const removeItemFromFavorites = () => {
    setFavorite(false);
    setRating(0);
    favContext.favDispatch({ type: 'REMOVE_ID_FROM_FAVORITES', payload: info.id });
    favContext.favDispatch({ type: 'REMOVE_ITEM_FROM_FAVORITES', payload: info.id });
    favContext.favDispatch({ type: 'REMOVE_RATING_FROM_ITEM', payload: info.id });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        onClick={(e) => {
          e.stopPropagation();
        }}
        title="Your rating"
        radius="md"
        size="md"
        centered
      >
        <hr color="#eaebed" />
        <h3>{info.original_title}</h3>
        <Rating className="movie-stars-gap" value={rating} onChange={setRating} count="10" size={isMobile ? 'md' : 'xl'} />
        <Space h={20} />
        <Button variant="filled" color="#9854f6" onClick={addItemToFavorites}>
          Save
        </Button>
        <Button variant="transparent" color="#9854f6" onClick={removeItemFromFavorites}>
          Remove rating
        </Button>
      </Modal>
      <div
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
      >
        <Star favorite={favorite} />
      </div>
    </>
  );
}
