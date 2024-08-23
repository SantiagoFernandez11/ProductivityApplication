import React, { useState } from 'react';
import { Box, VStack, Text, Flex, Input } from '@chakra-ui/react';
import { format, addDays } from 'date-fns';
import CalendarLayout from './CalendarLayout';

const Daily = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dayFormat = format(currentDate, "MMMM do, yyyy");

  const handlePreviousDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, -1));
  };

  const handleNextDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };

  return (
    <CalendarLayout
      title={dayFormat}
      onPrevious={handlePreviousDay}
      onNext={handleNextDay}
    >
      <VStack spacing={6} align="stretch" p={4}>
        {[1].map((item) => (
          <Box key={item} borderWidth={1} borderRadius="md" p={4}>
            <Flex align="center">
              <Box 
                w={4} 
                h={4} 
                borderWidth={1} 
                borderRadius="md" 
                mr={4}
              />
              <Input 
                placeholder="Quick notes"
                variant="unstyled"
                fontSize="lg"
              />
            </Flex>
          </Box>
        ))}
      </VStack>
    </CalendarLayout>
  );
};

export default Daily;