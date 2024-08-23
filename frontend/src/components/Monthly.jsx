import React, { useState } from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';
import CalendarLayout from './CalendarLayout';

const Monthly = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthYear = format(currentDate, 'MMMM yyyy');
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const startDayOfWeek = startDate.getDay();

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => addDays(prevDate, -30)); // Approximate, adjust as needed
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addDays(prevDate, 30)); // Approximate, adjust as needed
  };

  const days = [];
  for (let i = 0; i < 42; i++) {
    const day = addDays(startDate, i - startDayOfWeek);
    days.push(day);
  }

  return (
    <CalendarLayout
      title={monthYear}
      onPrevious={handlePreviousMonth}
      onNext={handleNextMonth}
    >
      <Grid templateColumns="repeat(7, 1fr)" templateRows="auto repeat(6, 1fr)" h="100%">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <GridItem key={day} textAlign="center" fontWeight="bold" fontSize="sm" py={1}>
            {day}
          </GridItem>
        ))}
        {days.map((day, index) => (
          <GridItem
            key={index}
            borderWidth={1}
            p={2}
            position="relative"
            opacity={day.getMonth() === currentDate.getMonth() ? 1 : 0.3}
          >
            <Text position="absolute" top={1} left={2} fontSize="sm">
              {format(day, 'd')}
            </Text>
            {/* Add habit tracking elements here */}
          </GridItem>
        ))}
      </Grid>
    </CalendarLayout>
  );
};

export default Monthly;