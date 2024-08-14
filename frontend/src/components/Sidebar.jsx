import React, { useState } from 'react';
import { VStack, HStack, Box, Flex, IconButton } from '@chakra-ui/react';
import { FaHome } from "react-icons/fa";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import HabitsGoals from './HabitsGoals';
import Profile from './Profile';
import Projects from './Projects';
import Settings from './Settings';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
	const [selectedIcon, setSelectedIcon] = useState('Home');
	const { logout } = useAuth();

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
		<VStack bg="orange.50" w="450px" h="100%" align="stretch" spacing={4} position="relative">
			<Box position="absolute" left={0} right={0} top={0}>
				<HStack 
					bg="orange.50" 
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
								colorScheme={selectedIcon === label ? 'teal' : 'gray'}
								aria-label={label}
								icon={<Icon size="24px" />}
								h="100%"
								w="100%"
								borderRadius={0}
								onClick={() => setSelectedIcon(label)}
							/>
						</Flex>
					))}
					<Flex flex={1} h="100%" alignItems="center" justifyContent="center">
						<IconButton
							variant='ghost'
							colorScheme='gray'
							icon={<MdLogout size="24px" />}
							h='100%'
							w='100%'
							borderRadius={0}
							onClick={logout}
						/>
					</Flex>
				</HStack>
			</Box>
			<Box pt="80px" px={4} w="100%">
				{renderComponent()}
			</Box>
		</VStack>
	);
};

export default Sidebar;