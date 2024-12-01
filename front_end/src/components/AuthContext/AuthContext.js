import React, { createContext, useState, useEffect, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                setIsLoggedIn(true);
                // Tải thông tin người dùng từ localStorage hoặc API nếu cần
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser);
                }
            }
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
        }
    }, []);

    const login = (user, token) => {
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('authToken', token); // Chỉ lưu token
        localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin người dùng
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    };

    const value = useMemo(() => ({
        isLoggedIn,
        user,
        login,
        logout
    }), [isLoggedIn, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
