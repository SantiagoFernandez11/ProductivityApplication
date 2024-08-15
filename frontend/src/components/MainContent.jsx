import React, { useState } from 'react';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';
import { Box, Button, HStack } from '@chakra-ui/react';

const MainContent = () => {
  	const [currentView, setCurrentView] = useState('Monthly'); 

	const handleViewChange = (view) => {
		setCurrentView(view);
	};

	return (
		<Box flex={1} p={8}>
			<HStack spacing={4} mb={4}>
				<Button onClick={() => handleViewChange('Daily')} colorScheme={currentView === 'Daily' ? 'blue' : 'gray'}>
				Daily
				</Button>
				<Button onClick={() => handleViewChange('Weekly')} colorScheme={currentView === 'Weekly' ? 'blue' : 'gray'}>
				Weekly
				</Button>
				<Button onClick={() => handleViewChange('Monthly')} colorScheme={currentView === 'Monthly' ? 'blue' : 'gray'}>
				Monthly
				</Button>
			</HStack>
			<Box>
				{currentView === 'Daily' && <Daily />}
				{currentView === 'Weekly' && <Weekly />}
				{currentView === 'Monthly' && <Monthly />}
			</Box>
		</Box>
	);
};

export default MainContent;