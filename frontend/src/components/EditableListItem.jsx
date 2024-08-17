import React, { useState } from 'react';
import { HStack, Text, Input, IconButton } from '@chakra-ui/react';
import { FaTrash } from "react-icons/fa";

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
        <>
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
        </>
    );
};

export default EditableListItem;