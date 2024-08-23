import React, { useState } from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import { format, startOfWeek, addDays } from 'date-fns';
import CalendarLayout from './CalendarLayout';

const Weekly = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfCurrentWeek = startOfWeek(currentDate);
  const weekRange = `${format(startOfCurrentWeek, 'MMMM d')} - ${format(addDays(startOfCurrentWeek, 6), 'MMMM d, yyyy')}`;

  const handlePreviousWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };

  return (
    <CalendarLayout
      title={weekRange}
      onPrevious={handlePreviousWeek}
      onNext={handleNextWeek}
    >
      <Grid templateColumns="repeat(7, 1fr)" h="100%" borderTop="1px" borderLeft="1px" borderColor="gray.200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
          const date = addDays(startOfCurrentWeek, index);
          return (
            <GridItem key={day} borderRight="1px" borderBottom="1px" borderColor="gray.200" position="relative">
              <Text p={2} fontWeight="medium">{day}</Text>
              <Text position="absolute" top={2} right={2} fontSize="sm" color="gray.500">
                {format(date, 'd')}
              </Text>
              {/* Add habit tracking elements here */}
            </GridItem>
          );
        })}
      </Grid>
    </CalendarLayout>
  );
};

export default Weekly;