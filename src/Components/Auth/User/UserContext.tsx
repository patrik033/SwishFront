// Import necessary React hooks and types
import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of the user object
interface User {
    email: string;
    token: string;
}

// Define the shape of the context properties
interface UserContextProps {
    user: User | null; // Current user data or null if not logged in
    setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to set user data
    logout: () => void; // Function to handle user logout
}

// Create a context with initial value undefined
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Define a provider component that will wrap your app
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Set up local state to manage user data
    const [user, setUser] = useState<User | null>(null);

    // Function to handle user logout
    const logout = () => {
        // Clear any user-related information (e.g., token, user data) on logout
        // ...

        // Set the user state to null, effectively logging out the user
        setUser(null);
    };

    // Provide the user context values to the wrapped components
    return <UserContext.Provider value={{ user, setUser, logout }}>{children}</UserContext.Provider>;
};

// Custom hook to access the user context in functional components
export const useUser = () => {
    // Get the user context from the nearest UserProvider
    const context = useContext(UserContext);

    // Throw an error if the hook is not used within a UserProvider
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    // Return the user context values
    return context;
};