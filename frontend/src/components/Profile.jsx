import React from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Heading size="lg">Profile</Heading>
        <Text>Welcome to your profile page. This is where you can view and edit your personal information.</Text>
        {/* Add more profile-related content here */}
      </VStack>
    </Box>
  );
};

export default Profile;