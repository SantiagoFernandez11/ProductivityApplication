import React, { useState } from 'react';
import { Box, Flex, Grid, Text, IconButton, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Monthly = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleDayClick = (day) => {
    console.log(`Clicked on day: ${day}`);
    // Add logic here
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <VStack spacing={2} align="stretch" h="100%" w="100%">
      <Flex justify="space-between" align="center" mb={2}>
        <IconButton size="sm" icon={<ChevronLeftIcon />} onClick={prevMonth} aria-label="Previous month" />
        <Text fontSize="xl" fontWeight="bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        <IconButton size="sm" icon={<ChevronRightIcon />} onClick={nextMonth} aria-label="Next month" />
      </Flex>
      <Grid templateColumns="repeat(7, 1fr)" templateRows="auto repeat(6, 1fr)" gap={1} flex={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Box key={day} textAlign="center" fontWeight="bold" fontSize="sm" py={1}>
            {day}
          </Box>
        ))}
        {days.map((day, index) => (
          <Box
            key={index}
            borderWidth={1}
            borderRadius="md"
            p={2}
            textAlign="left"
            onClick={() => day && handleDayClick(day)}
            cursor={day ? "pointer" : "default"}
            bg={day ? "white" : "gray.50"}
            _hover={day ? { bg: "gray.100" } : {}}
            position="relative"
            height="100%"
          >
            <Text position="absolute" top={1} left={2} fontSize="sm">
              {day}
            </Text>
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};

export default Monthly;