import React, { useState } from 'react';
import { VStack, HStack, Text, Input, IconButton, List, ListItem } from '@chakra-ui/react';
import { FaPlus, FaTrash } from "react-icons/fa";

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
      <Text fontSize="2xl" fontWeight="medium">{title}</Text>
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

const HabitsAndGoals = () => {
  const [habits, setHabits] = useState(['Exercise daily', 'Read for 30 minutes']);
  const [goals, setGoals] = useState(['Complete project', 'Learn React']);

  return (
    <VStack align="stretch" spacing={6}>
      <EditableList title="Habits" items={habits} setItems={setHabits} />
      <EditableList title="Goals" items={goals} setItems={setGoals} />
    </VStack>
  );
};

export default HabitsAndGoals;