'use client';
 
import * as React from 'react';
import {AuthContext, User} from './AuthContext';
 
export interface AuthProviderProps {
  user: User | null;
  token: string | null;
  children: React.ReactNode;
}
 
export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  user,
  token,
  children
}) => {


  return (
    <AuthContext.Provider
      value={{
        user,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};