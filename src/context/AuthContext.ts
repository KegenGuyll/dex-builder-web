import {createContext, useContext} from 'react';
import {UserInfo} from 'firebase/auth';
import {Claims} from 'next-firebase-auth-edge/lib/auth/claims';
 
export interface User extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  photoURL: string | null; // Update the type to allow null
  role: 'USER' | 'ADMIN' | 'DEVELOPER';
  username: string;
  _id: string;
}
 
export interface AuthContextValue {
  user: User | null;
  token: string | null;
}
 
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
});
 
export const useAuth = () => useContext(AuthContext);