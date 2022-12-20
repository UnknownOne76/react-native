import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';  
import { useState , createContext , useEffect } from 'react'; 

export type Context = {
   isLogged: boolean;
   setIsLogged: React.Dispatch<any>; 
   token: string;
}

type Props = {
   children: React.ReactNode;
}

export const FsContext = createContext<null | Context>({} as Context); 

export const FsContextPrv = ({children}: Props) => {

   const [isLogged , setIsLogged] = useState<any>(false); 
   const [token , setToken] = useState<any>(null); 

   useEffect(() => {
         if (AsyncStorage.getItem('isLoggedIn') === null ) { 
            return setIsLogged(false);
         }
         else {
            try { 
               AsyncStorage.getItem('isLoggedIn').then((val: any) => {setIsLogged(JSON.parse(val))});  
               AsyncStorage.getItem('token').then((val: any) => {setToken(val)});  
            } catch(e) {
               console.log(e); 
            }
         }
   }, [isLogged]); 

   return (
      <FsContext.Provider value={{ isLogged , setIsLogged , token}}>{children}</FsContext.Provider>
   ); 
}; 

export default FsContextPrv;