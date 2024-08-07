import React, {useState, useEffect} from 'react';
import { VStack, HStack, Text, Box, Flex } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import { FaHome } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

const Sidebar = () => (
  <VStack bg="orange.50" w="450px" h="100%" align="stretch" spacing={4} position="relative">
    <Box position="absolute" left={0} right={0} top={0}>
      <HStack 
        bg="orange.50" 
        w="100%" 
        h="70px" 
        spacing={0}
        justifyContent="space-around"
      >
        {[
          { icon: FaHome, label: 'Home' },
          { icon: MdAccountCircle, label: 'Profile' },
          { icon: FaNoteSticky, label: 'Niche Projects' },
          { icon: IoIosSettings, label: 'Settings' }
        ].map(({ icon: Icon, label }) => (
          <Flex
            key={label}
            flex={1}
            h="100%"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              variant='ghost'
              colorScheme='teal'
              aria-label={label}
              icon={<Icon size="24px" />}
              h="100%"
              w="100%"
              borderRadius={0}
            />
          </Flex>
        ))}
      </HStack>
    </Box>
    <Box pt="70px" px={4} w="100%"> {/* Adjusted padding-top */}
		<VStack align="stretch" spacing={3}>
			<Text fontSize="xl" fontWeight="bold">Habits</Text>
			<Text fontSize="xl" fontWeight="bold">Goals</Text>
		</VStack>
    </Box>
  </VStack>
);

export default Sidebar;