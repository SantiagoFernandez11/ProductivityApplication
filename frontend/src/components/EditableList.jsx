import React, { useState } from 'react';
import { VStack, HStack, Text, Input, IconButton, List, ListItem } from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa";
import EditableListItem from './EditableListItem';

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
        await onDeleteItem(id);
    };

    return (
        <VStack align="stretch" spacing={2}>
            <Text fontSize="2xl" fontWeight="medium">{title}</Text>
            <List spacing={2}>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <EditableListItem 
                            item={item}
                            onEdit={editItem}
                            onDelete={deleteItem}
                        />
                    </ListItem>
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
                    _placeholder={{ color: 'blue.400' }}
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

export default EditableList;