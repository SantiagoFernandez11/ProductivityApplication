import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VStack, Text, Spinner } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import EditableList from './EditableList';

const HabitsAndGoals = () => {
    const [habits, setHabits] = useState([]);
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const baseUrl = 'http://127.0.0.1:5000';

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('authToken');
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.sub);
        }
    }, [isAuthenticated]);

    const fetchEvents = async () => {
        if (!userId) return;
        try {
            setIsLoading(true);
            const response = await axios.get(`${baseUrl}/${userId}/events`);
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

    const addEvent = async (description, category) => {
        if (!userId) return;
        try {
            const response = await axios.post(`${baseUrl}/${userId}/events`, {
                description,
                category
            });
    
            if (response.status === 200) {
                await fetchEvents();
            }
        } catch (err) {
            setError(`Failed to add event: ${err.message}`);
        }
    };

    const deleteEvent = async (eventId) => {
        if (!userId) return;
        try {
            const response = await axios.delete(`${baseUrl}/${userId}/events/${eventId}`);

            if (response.status === 200) {
                await fetchEvents();
            }
        } catch (err) {
            setError(`Failed to delete event: ${err.message}`);
        }
    };

    const editEvent = async (eventId, newDescription, category) => {
        if (!userId) return;
        try {
            const response = await axios.put(`${baseUrl}/${userId}/events/${eventId}`, {
                description: newDescription,
                category
            });
            
            if (response.status === 200) {
                await fetchEvents();
            }
        } catch (err) {
            setError(`Failed to edit event: ${err.message}`);
        }
    };

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