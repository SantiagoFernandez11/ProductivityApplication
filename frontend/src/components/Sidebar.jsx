import React, { useState } from 'react';
import { VStack, HStack, Box, Flex, IconButton } from '@chakra-ui/react';
import { FaHome } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import HabitsGoals from './HabitsGoals';
import Profile from './Profile';
import Projects from './Projects';
import Settings from './Settings';

const Sidebar = () => {
	const [selectedIcon, setSelectedIcon] = useState('Home');

	const icons = [
		{ icon: FaHome, label: 'Home', component: HabitsGoals },
		{ icon: MdAccountCircle, label: 'Profile', component: Profile },
		{ icon: FaNoteSticky, label: 'Projects', component: Projects },
		{ icon: IoIosSettings, label: 'Settings', component: Settings },
	];

	const renderComponent = () => {
		const selected = icons.find(icon => icon.label === selectedIcon);
		return selected ? <selected.component /> : null;
	};

	return (
		<VStack w="450px" h="100%" align="stretch" spacing={4} position="relative">
			<Box position="absolute" left={0} right={0} top={0}>
				<HStack  
					w="100%" 
					h="70px" 
					spacing={0}
					justifyContent="space-around"
				>
					{icons.map(({ icon: Icon, label }) => (
						<Flex
							key={label}
							flex={1}
							h="100%"
							alignItems="center"
							justifyContent="center"
						>
							<IconButton
								variant='ghost'
								color={selectedIcon === label ? 'blue.400' : 'gray.500'}
								aria-label={label}
								icon={<Icon size="24px" />}
								h="100%"
								w="100%"
								borderRadius={0}
								onClick={() => setSelectedIcon(label)}
								_hover={{ bg: 'gray.100' }}
								_active={{ bg: 'gray.200' }}
								bg={selectedIcon === label ? 'gray.100' : 'transparent'}
							/>
						</Flex>
					))}
				</HStack>
			</Box>
			<Box pt="80px" px={4} w="100%">
				{renderComponent()}
			</Box>
		</VStack>
	);
};

export default Sidebar;