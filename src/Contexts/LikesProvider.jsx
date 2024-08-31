import React, { createContext, useState } from 'react';

export const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
    const [likes, setLikes] = useState({});

    return (
        <LikesContext.Provider value={{ likes, setLikes }}>
            {children}
        </LikesContext.Provider>
    );
};
