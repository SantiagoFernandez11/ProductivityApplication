import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';  // Import all exports from jwt-decode

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  	const [isAuthenticated, setIsAuthenticated] = useState(false);
  	const [isLoading, setIsLoading] = useState(true);

  	const checkTokenExpiration = (token) => {
		if (!token) return false;
		try {
			const decodedToken = jwtDecode.jwtDecode(token);  // Use the named export
			return decodedToken.exp * 1000 > Date.now();
		} catch (error) {
			console.error('Error decoding token:', error);
			return false;
		}
	};

	useEffect(() => {
		const checkAuthStatus = async () => {
			const token = localStorage.getItem('authToken');
			if (token && checkTokenExpiration(token)) {
				setIsAuthenticated(true);
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			} else if (token) {
				// Token exists but is expired
				logout();
			}
			setIsLoading(false);
		};

		checkAuthStatus();
	}, []);

	const login = (token) => {
		if (checkTokenExpiration(token)) {
			localStorage.setItem('authToken', token);
			setIsAuthenticated(true);

			// Sets up axios to auto include auth token in header of every request made
			// Server always knows who you are without having to set the token everytime
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		} else {
			console.error('Attempted to login with an expired token');
		}
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		setIsAuthenticated(false);

		// Removes auth token from header in future requests so no longer have access to APIs
		delete axios.defaults.headers.common['Authorization'];
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);