'use client';

import React from 'react';
import { Alert, Badge, Space } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function NoAccessAlert() {
  const [visibleAlert, setVisibleAlert] = useState(true);

  const hideAlert = () => {
    localStorage.setItem('visibleAlertLS', 'hidden');
    setVisibleAlert(false);
  };

  useEffect(() => {
    if (localStorage.getItem('visibleAlertLS')) {
      setVisibleAlert(false);
    }
  }, []);

  return (
    <Alert
      mt={'auto'}
      variant="light"
      color="blue"
      withCloseButton
      closeButtonLabel="Dismiss"
      title="Список фильмов пустой?"
      hidden={!visibleAlert}
      onClose={() => setVisibleAlert(false)}
      data-testid="no-acc-alert"
    >
      Сервис TMDB может быть недоступен в некоторых регионах. Может быть, стоит попробовать открыть сайт по-другому?🤔
      <Space h="10" />
      <Badge
        style={{ cursor: 'pointer' }}
        variant="light"
        fullWidth
        size="sm"
        radius="sm"
        onClick={hideAlert}
        data-testid="hide-alert"
      >
        Больше не показывать
      </Badge>
    </Alert>
  );
}
