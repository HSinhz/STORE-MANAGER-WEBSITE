import React,  { useState } from "react";

const UserContext = React.createContext({ name: '', auth: false});

const UserProvider  =  ({ children }) => {
    // User is the name of the "data" that gets stored in context
    // const [user, setUser] = React.useState({ name: 'ssssss', auth: false });
    const [user, setUser] = useState(
        { 
            isAuthenticated: false, 
            Token: {}, 
        });

    // Login updates the user data with a name parameter
    const  loginContext =  (userData) => {
        setUser((userData))
        // setUser((user) => ({
        //     name: name,
        //     auth: true,
        //   }));
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
        name: '',
        auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
        {children}
        </UserContext.Provider>
    );
}


export {UserProvider, UserContext} ;