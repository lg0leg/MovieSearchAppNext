import { Center, Loader } from '@mantine/core';

export default function Loading() {
  return (
    <Center h="100vh">
      <Loader color="purple.4" type="bars" size={100} />
    </Center>
  );
}
