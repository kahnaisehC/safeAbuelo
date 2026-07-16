// src/context/AuthContext.tsx
import { apiString } from '@/api/config';
import { firebaseAuth } from '@/firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from 'react';




export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<boolean>;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface syncUserProps{
  Token: string;
  NombreCompleto: string;
  Telefono: string;
  Email: string;
}

async function syncUser(data: syncUserProps){
  const response = await fetch(`${apiString}/usuariosApi/sincronizar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${data.Token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Failed to sincrronize user (${response.status}): ${message}`
    );
  }
}




export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  // Load stored session on app start
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('userData'),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
        setLoading(true);
        let userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)

        let stringToken = await userCredential.user.getIdToken()

        await Promise.all([
            AsyncStorage.setItem('authToken',stringToken),
            AsyncStorage.setItem('userData', JSON.stringify(userCredential.user)),
        ])



        setToken(stringToken)
        setUser(userCredential.user)

        return true
    } catch(error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
        setLoading(true);
        let userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
            // Signed in 

        let stringToken = await userCredential.user.getIdToken()

        await Promise.all([
            AsyncStorage.setItem('authToken',stringToken),
            AsyncStorage.setItem('userData', JSON.stringify(userCredential.user)),
        ])
        setToken(stringToken)
        setUser(userCredential.user)

        return true
    } catch(error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {

    await Promise.all([
        signOut(firebaseAuth),
      AsyncStorage.removeItem('authToken'),
      AsyncStorage.removeItem('userData'),
    ]);
    setToken(null);
    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, logout, signup}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};