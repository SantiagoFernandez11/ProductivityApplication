import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VStack, HStack, Text, Input, IconButton, List, ListItem, Spinner } from '@chakra-ui/react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

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

const EditableList = ({ title, items, setItems, onAddItem, onDeleteItem, onEditItem }) => {
	const [newItem, setNewItem] = useState('');

	const addItem = async () => {
		if (newItem.trim() !== '') {
		  await onAddItem(newItem.trim());
		  setNewItem('');
		}
	  };

	const editItem = async (id, newText) => {
		await onEditItem(id, newText);
    };

	const deleteItem = async (id) => {
		await onDeleteItem(id)
	};

	return (
		<VStack align="stretch" spacing={2}>
			<Text fontSize="2xl" fontWeight="medium">{title}</Text>
			<List spacing={2}>
				{items.map((item) => (
   				<EditableListItem 
					key={item.id}
					item={item}
					onEdit={editItem}
					onDelete={deleteItem}
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
    const [userId, setUserId] = useState(null);
	const { isAuthenticated, isLoading: authLoading } = useAuth();

    const baseUrl = 'http://127.0.0.1:5000';

	// Check if user is authenticated with jwt
    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('authToken');
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.sub);
            
            // axios default headers are already set in AuthContext, so you don't need to set them here
        }
    }, [isAuthenticated]);

    // Grab habits and goals from backend
    const fetchEvents = async () => {
        if (!userId) return;
        try {
            setIsLoading(true);
			
			// Get events from backend
            const response = await axios.get(`${baseUrl}/${userId}/events`);

			// Set events
            const events = response.data[`user ${userId} events`];
            const habitsData = events.filter(event => event.category === 'habit');
            const goalsData = events.filter(event => event.category === 'goal');    
            setHabits(habitsData);
            setGoals(goalsData);
            setIsLoading(false);
        } catch (err){
            setError(`Failed to fetch events: ${err.message}`);
            setIsLoading(false);
        }
    };

    // Add an event
    const addEvent = async (description, category) => {
        if (!userId) return;
        try {
			// post events into the backend
            const response = await axios.post(`${baseUrl}/${userId}/events`, {
                description,
                category
            })
    
            // refresh events list after successfully adding
            if (response.status === 200) {
                await fetchEvents();
            }
        } catch (err) {
            setError(`Failed to add event: ${err.message}`)
        }
    }

    // Delete an event
    const deleteEvent = async (eventId) => {
        if (!userId) return;
        try {
			// delete events from backend
            const response = await axios.delete(`${baseUrl}/${userId}/events/${eventId}`)

            // refresh events list after successfully deleting
            if (response.status === 200) {
                await fetchEvents();
            }
        } catch (err) {
            setError(`Failed to delete event: ${err.message}`)
        }
    }

    // Edit an event 
    const editEvent = async (eventId, newDescription, category) => {
        if (!userId) return;
        try {
			// edit an event from backend (only description)
            const response = await axios.put(`${baseUrl}/${userId}/events/${eventId}`, {
                description: newDescription,
                category
            })
            
            // refresh events list after successfully editing
            if (response.status === 200) {
                await fetchEvents();
            }
        } catch (err) {
            setError(`Failed to edit event: ${err.message}`)
        }
    }

    useEffect(() => {
        if (userId) {
            fetchEvents();
        }
    }, [userId]);

    if (authLoading) return <Spinner />;
    if (!isAuthenticated) return <Text>Please log in to view your habits and goals.</Text>;
    if (isLoading) return <Spinner />;
    if (error) return <Text color="red.500">{error}</Text>;

	return (
		<VStack align="stretch" spacing={6}>
			<EditableList 
				title="Habits" 
				items={habits} 
				setItems={setHabits} 
				onAddItem={(description) => addEvent(description, 'habit')}
				onEditItem={(id, newDescription) => editEvent(id, newDescription, 'habit')}
				onDeleteItem={deleteEvent}
			/>
			<EditableList 
				title="Goals" 
				items={goals} 
				setItems={setGoals} 
				onAddItem={(description) => addEvent(description, 'goal')}
				onEditItem={(id, newDescription) => editEvent(id, newDescription, 'goal')}
				onDeleteItem={deleteEvent}
			/>
		</VStack>
	);
};

export default HabitsAndGoals;