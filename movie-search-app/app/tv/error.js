'use client';

import { Button, Flex, Title } from '@mantine/core';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex h="90vh" justify="center" align="center" direction="column" p="16" ta="center">
      <Title c="purple.3">Something is not right...</Title>
      <Button size="md" mt="xl" color="purple.4" onClick={() => reset()}>
        Reset
      </Button>
    </Flex>
  );
}
