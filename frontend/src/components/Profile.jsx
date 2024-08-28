import React from 'react';
import { Box, VStack, HStack, Text, Avatar, Button, Flex } from '@chakra-ui/react';
import { MdLogout } from "react-icons/md";
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { logout } = useAuth();

  return (
    <Box p={5} maxWidth="100%" width="400px" position="relative" height="100%">
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
      
      <Flex position="absolute" bottom={5} right={5}>
        <Button
          leftIcon={<MdLogout />}
          colorScheme="red"
          variant="ghost"
          size="sm"
          onClick={logout}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Profile;