import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './layouts/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        // You can return a loading spinner or null here
        return null;
    }
    
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
	<ChakraProvider>
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	</ChakraProvider>
);

export default App;