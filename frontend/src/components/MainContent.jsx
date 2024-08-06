import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const MainContent = () => (
	<Box flex={1} p={8}>
		<Heading mb={4}>Welcome to the Main Content</Heading>
		<Text>This is where your main content will go. You can add any components or content here.</Text>
	</Box>
);

export default MainContent;