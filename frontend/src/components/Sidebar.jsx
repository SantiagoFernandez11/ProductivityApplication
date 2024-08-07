import React, { useState } from 'react';
import { VStack, HStack, Text, Box, Flex, Input, IconButton, List, ListItem } from '@chakra-ui/react';
import { FaHome, FaPlus, FaTrash } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

const EditableListItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item);

  const handleEdit = () => {
    if (editedText.trim() !== '') {
      onEdit(editedText.trim());
      setIsEditing(false);
    }
  };

  return (
    <ListItem>
      {isEditing ? (
        <Input 
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          size="sm"
        />
      ) : (
        <HStack justifyContent="space-between">
          <Text fontSize="md" onClick={() => setIsEditing(true)} cursor="pointer">
            {item}
          </Text>
          <IconButton 
            icon={<FaTrash />} 
            onClick={onDelete} 
            aria-label="Delete" 
            size="xs" 
            variant="ghost"
          />
        </HStack>
      )}
    </ListItem>
  );
};

const EditableList = ({ title, items, setItems }) => {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const editItem = (index, newText) => {
    const newItems = [...items];
    newItems[index] = newText;
    setItems(newItems);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <VStack align="stretch" spacing={2}>
      <Text fontSize="lg" fontWeight="medium">{title}</Text>
      <List spacing={2}>
        {items.map((item, index) => (
          <EditableListItem 
            key={index}
            item={item}
            onEdit={(newText) => editItem(index, newText)}
            onDelete={() => deleteItem(index)}
          />
        ))}
      </List>
      <HStack mt={2}>
        <Input 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          placeholder={`Add ${title.toLowerCase()}`}
          size="sm"
		  border="none"
  		  _focus={{ boxShadow: 'none' }}
 		  _placeholder={{ color: 'gray.400' }}
        />
        <IconButton 
          icon={<FaPlus />} 
          onClick={addItem} 
          aria-label={`Add ${title}`}
          size="sm"
          variant="ghost"
        />
      </HStack>
    </VStack>
  );
};

const Sidebar = () => {
  const [habits, setHabits] = useState(['Exercise daily', 'Read for 30 minutes']);
  const [goals, setGoals] = useState(['Complete project', 'Learn React']);

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
      <Box pt="80px" px={4} w="100%">
        <VStack align="stretch" spacing={6}>
          <EditableList title="Habits" items={habits} setItems={setHabits} />
          <EditableList title="Goals" items={goals} setItems={setGoals} />
        </VStack>
      </Box>
    </VStack>
  );
};

export default Sidebar;