'use client';

import { Avatar, Container, FileInput, Flex, Modal, Space, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [username, setUsername] = useState('username');
  const [opened, { open, close }] = useDisclosure(false);

  const setAvatarHandler = (file) => {
    setAvatarFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      localStorage.setItem('avatar', JSON.stringify(url));
    }
  };

  useEffect(() => {
    const un = localStorage.getItem('usernickname');
    if (un) {
      setUsername(JSON.parse(un));
    }
    const av = localStorage.getItem('avatar');
    if (av) {
      setAvatarUrl(JSON.parse(av));
    }
  }, []);

  useEffect(() => {
    if (username != 'username') {
      localStorage.setItem('usernickname', JSON.stringify(username));
    }
  }, [username]);

  return (
    <Container fluid style={{ width: 980, paddingTop: 40, paddingBottom: 40 }}>
      <Title order={1}>Profile</Title>
      <Space h={50} />
      <Flex gap="30" wrap={'wrap'}>
        <Flex direction={'column'} align="center" gap={30} w={200}>
          <Avatar src={avatarUrl} alt="it's me" w={200} h={200} />
          <FileInput
            placeholder="select file"
            value={avatarFile}
            onChange={setAvatarHandler}
            w={100}
            styles={{
              input: {
                backgroundColor: '#f8f9fa',
                border: '2px dashed #dee2e6',
                borderRadius: '15px',
              },
            }}
          />
        </Flex>
        <Text size="30px" mt={80}>
          Hello{' '}
          {
            <Text fw={500} component="span" onClick={open} style={{ cursor: 'pointer' }}>
              {username}
            </Text>
          }
          !
        </Text>
      </Flex>
      <Modal opened={opened} onClose={close} title="What is your name?" centered>
        <TextInput
          placeholder="Enter your name or nickname"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </Modal>
    </Container>
  );
}
