import { Button, Center, Flex, Space, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export default function NotFoundPage() {
  return (
    <Center h="100vh">
      <Flex gap="16" direction="column" align="center">
        <img src="/404.png" alt="404" />
        <Space h="32" />
        <Text size="xl" fw="600">
          We can’t find the page you are looking for
        </Text>
        <Link href="/movies">
          <Button variant="filled" color="#9854f6" radius="md">
            Go home
          </Button>
        </Link>
      </Flex>
    </Center>
  );
}
