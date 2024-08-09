import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VStack, HStack, Text, Input, IconButton, List, ListItem, Spinner } from '@chakra-ui/react';
import { FaPlus, FaTrash } from "react-icons/fa";

const EditableListItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.description);

  const handleEdit = () => {
    if (editedText.trim() !== '') {
      onEdit(item.id, editedText.trim());
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
            {item.description}
          </Text>
          <IconButton 
            icon={<FaTrash />} 
            onClick={() => onDelete(item.id)} 
            aria-label="Delete" 
            size="xs" 
            variant="ghost"
          />
        </HStack>
      )}
    </ListItem>
  );
};

const EditableList = ({ title, items, onAdd, onEdit, onDelete }) => {
  console.log(title)
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      onAdd(newItem.trim());
      setNewItem('');
    }
  };

  return (
    <VStack align="stretch" spacing={2}>
      <Text fontSize="2xl" fontWeight="medium">{title}</Text>
      <List spacing={2}>
        {items.map((item) => (
          <EditableListItem 
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
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
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = 'http://127.0.0.1:5000'; // Replace with your actual API base URL
  const userId = 1; // Replace with actual user ID, perhaps from authentication context

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}/${userId}/events`);
      
      const events = response.data[`user ${userId} events`];
      
      if (!Array.isArray(events)) {
        throw new Error('Events data is not an array');
      }
      
      const habitsData = events.filter(event => event.category === 'habit');
      const goalsData = events.filter(event => event.category === 'goal');
      
      setHabits(habitsData);
      setGoals(goalsData);
      setIsLoading(false);
    } catch (err) {
      setError(`Failed to fetch events: ${err.message}`);
      setIsLoading(false);
    }
  };

  const addEvent = async (description, category) => {
    try {
      const response = await axios.post(`${baseUrl}/events`, {
        user_id: userId,
        description,
        category
      });
      if (category === 'habit') {
        setHabits([...habits, response.data]);
      } else {
        setGoals([...goals, response.data]);
      }
    } catch (err) {
      setError('Failed to add event');
    }
  };

  const editEvent = async (id, newDescription) => {
    try {
      await axios.put(`${baseUrl}/${userId}/events/${id}`, {
        description: newDescription
      });
      const updateEvents = (events) => 
        events.map(event => event.id === id ? {...event, description: newDescription} : event);
      setHabits(updateEvents(habits));
      setGoals(updateEvents(goals));
    } catch (err) {
      setError('Failed to edit event');
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${userId}/events/${id}`);
      const filterEvents = (events) => events.filter(event => event.id !== id);
      setHabits(filterEvents(habits));
      setGoals(filterEvents(goals));
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <VStack align="stretch" spacing={6}>
      <EditableList 
        title="Habits" 
        items={habits} 
        onAdd={(description) => addEvent(description, 'habit')}
        onEdit={editEvent}
        onDelete={deleteEvent}
      />
      <EditableList 
        title="Goals" 
        items={goals} 
        onAdd={(description) => addEvent(description, 'goal')}
        onEdit={editEvent}
        onDelete={deleteEvent}
      />
    </VStack>
  );
};

export default HabitsAndGoals;