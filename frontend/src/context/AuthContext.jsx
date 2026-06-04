// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [initializing, setInitializing] = useState(true);

//   useEffect(() => {
//     const savedToken = localStorage.getItem('token');
//     const savedUser = localStorage.getItem('user');
//     if (savedToken && savedUser) {
//       try {
//         setToken(savedToken);
//         setUser(JSON.parse(savedUser));
//       } catch {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     }
//     setInitializing(false);
//   }, []);

//   const login = (newToken, newUser) => {
//     localStorage.setItem('token', newToken);
//     localStorage.setItem('user', JSON.stringify(newUser));
//     setToken(newToken);
//     setUser(newUser);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout, initializing }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used inside an AuthProvider');
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setInitializing(false);
  }, []);

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an AuthProvider');
  return context;
};
