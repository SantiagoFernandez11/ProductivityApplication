import React from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const CalendarLayout = ({ title, onPrevious, onNext, children }) => {
  return (
    <Box h="100%" display="flex" flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center" p={4} borderBottom="1px" borderColor="gray.200">
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={onPrevious}
          variant="ghost"
          aria-label="Previous"
        />
        <Text fontSize="lg" fontWeight="semibold">
          {title}
        </Text>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={onNext}
          variant="ghost"
          aria-label="Next"
        />
      </Flex>
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};

export default CalendarLayout;