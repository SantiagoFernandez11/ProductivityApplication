import React from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';

const Settings = () => {
  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Heading size="lg">Settings</Heading>
        <Text>Adjust your application settings here. Customize your experience and manage your preferences.</Text>
      </VStack>
    </Box>
  );
};

export default Settings;