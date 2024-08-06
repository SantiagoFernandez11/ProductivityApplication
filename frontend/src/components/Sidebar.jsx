import React from 'react';
import { VStack, Text } from '@chakra-ui/react';

const Sidebar = () => (
	<VStack bg="gray.100" w="250px" h="100%" p={4} align="stretch">
		<Text fontWeight="bold">Menu Item 1</Text>
		<Text fontWeight="bold">Menu Item 2</Text>
		<Text fontWeight="bold">Menu Item 3</Text>
	</VStack>
);

export default Sidebar;