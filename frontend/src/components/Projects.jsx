import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  Text,
  Container,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProject.name.trim() !== '') {
      setProjects([...projects, { id: Date.now(), ...newProject }]);
      setNewProject({ name: '', description: '' });
    }
  };

  const handleEditProject = (projectId) => {
    setEditingProjectId(projectId);
  };

  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
    onOpen();
  };

  const confirmDelete = () => {
    setProjects(projects.filter(p => p.id !== projectToDelete.id));
    onClose();
    setProjectToDelete(null);
  };

  return (
    <Box>
      <Box p={2}>
        <Container maxW="container.xl">
          <Heading as="h1" size="lg" mb={2}>Projects</Heading>
        </Container>
      </Box>
      
      <Container maxW="container.xl" mt={4}>
        <VStack spacing={4} align="stretch">
          <form onSubmit={handleAddProject}>
            <VStack spacing={2} align="stretch">
              <Flex>
                <Input
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  size="sm"
                  mr={2}
                />
                <Button type="submit" colorScheme="blue" size="sm">
                  Add Project
                </Button>
              </Flex>
              <Textarea
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                placeholder="Enter project description"
                size="sm"
              />
            </VStack>
          </form>
          
          <VStack spacing={2} align="stretch">
            {projects.map(project => (
              <React.Fragment key={project.id}>
                {editingProjectId === project.id ? (
                  <Box border="1px" borderColor="gray.200" p={2} borderRadius="md">
                    {/* Placeholder for future EditProject component */}
                    <Text fontSize="sm">Edit component for project "{project.name}" will be implemented here.</Text>
                    <Button size="xs" onClick={() => setEditingProjectId(null)} mt={2}>Cancel Edit</Button>
                  </Box>
                ) : (
                  <Card size="sm">
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Heading size="sm">{project.name}</Heading>
                        <HStack spacing={1}>
                          <IconButton
                            icon={<EditIcon />}
                            onClick={() => handleEditProject(project.id)}
                            aria-label="Edit project"
                            size="xs"
                            variant="ghost"
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteProject(project)}
                            aria-label="Delete project"
                            size="xs"
                            variant="ghost"
                          />
                        </HStack>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text fontSize="sm">{project.description}</Text>
                    </CardBody>
                  </Card>
                )}
              </React.Fragment>
            ))}
          </VStack>
        </VStack>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md">Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="sm">
            Are you sure you want to delete the project "{projectToDelete?.name}"?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete} size="sm">
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose} size="sm">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Projects;