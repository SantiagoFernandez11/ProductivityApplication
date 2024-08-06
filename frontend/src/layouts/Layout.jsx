import React from 'react';
import { Flex } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Layout = () => (
	<Flex h="100vh" flexDirection="column">
		<Navbar />
		<Flex flex={1}>
			<MainContent />
			<Sidebar />
		</Flex>
	</Flex>
);

export default Layout;