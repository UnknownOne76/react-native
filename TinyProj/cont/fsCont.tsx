import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';  
import { useState , createContext , useEffect } from 'react'; 
import AXIOS from '../api';

export type Context = {
   isLogged: boolean;
   setIsLogged: React.Dispatch<any>; 
   token: string;
   setFol: React.Dispatch<React.SetStateAction<number>>; 
   user: any;
}

type Props = {
   children: React.ReactNode;
}

export const FsContext = createContext<null | Context>({} as Context); 

export const FsContextPrv = ({children}: Props) => {

   const [isLogged , setIsLogged] = useState<any>(false); 
   const [token , setToken] = useState<any>(null); 
   const [user , setUser] = useState<any>(null); 
   const [fol , setFol] = useState<number>(0); 

   useEffect(() => {
   if (AsyncStorage.getItem('isLoggedIn') === null ) { 
      return setIsLogged(false);
   }
   else {
         AsyncStorage.getItem('isLoggedIn').then((val: any) => {setIsLogged(JSON.parse(val))});  
         AsyncStorage.getItem('token').then((val: any) => setToken(val));
         if ( token !== null ) {
            AXIOS.post('userDet' , {
               token: token
            }).then((res) => setUser(res.data));  
          }; 
         };
   } , [isLogged , token, fol]); 
   
   return (
      <FsContext.Provider value={{ isLogged , setIsLogged , token , user , setFol}}>{children}</FsContext.Provider>
   ); 
}; 

export default FsContextPrv;