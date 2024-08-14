import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { login } = useAuth();
	const toast = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://127.0.0.1:5000/login', { 
				username, 
				password 
			});
			
			if (response.data.access_token) {
				login(response.data.access_token);
				toast({
					title: "Login Successful",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				navigate('/');
			} else {
				throw new Error('No access token received');
			}
		} catch (error) {
			toast({
				title: "Login Failed",
				description: error.response?.data?.msg || "An error occurred during login",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box maxWidth="400px" margin="auto" mt={8}>
			<VStack spacing={4} align="stretch">
				<Heading>Login</Heading>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>Username</FormLabel>
						<Input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</FormControl>
					<Button type="submit" colorScheme="blue" mt={4} width="full">
						Login
					</Button>
				</form>
				<Text>
					Don't have an account? <Link to="/register">Sign up</Link>
				</Text>
			</VStack>
		</Box>
	);
};

export default Login;