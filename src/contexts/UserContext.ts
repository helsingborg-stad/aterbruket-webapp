import { Auth } from 'aws-amplify';
import { createContext } from 'react';

export const UserContext = createContext({attributes:{sub:'test'}});
