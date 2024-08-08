import React from 'react';
import { Box, VStack, HStack, Text, Avatar } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Box p={5} maxWidth="100%" width="400px">
      <VStack spacing={4} align="stretch">
        <HStack spacing={4} align="center">
          <Avatar
            size='2xl'
            name='Prosper Otemuyiwa'
            src='https://bit.ly/prosper-baba'
            flexShrink={0}
          />
          <Box flex={1} minWidth={0}>
            <Text fontSize='2xl' isTruncated>
              Quandale Dingle
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Profile;