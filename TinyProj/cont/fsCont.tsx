import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';  
import { useState , createContext , useEffect } from 'react'; 

export type Context = {
   isLogged: boolean;
   setIsLogged: React.Dispatch<any>; 
}

type Props = {
   children: React.ReactNode;
}

export const FsContext = createContext<null | Context>({} as Context); 

export const FsContextPrv = ({children}: Props) => {

   const [isLogged , setIsLogged] = useState<any>(false); 

   useEffect(() => {
      const authen = async () => {
         if (await AsyncStorage.getItem('isLoggedIn') == null ) return setIsLogged(false); 
         await AsyncStorage.getItem('isLoggedIn' , (err: any , val: any) => {
            if ( err ) return console.log(`Error occured: ${err}`);
            setIsLogged(JSON.parse(val));  
         });   
      }

      authen(); 
   }, [isLogged]); 

   return (
      <FsContext.Provider value={{ isLogged , setIsLogged }}>{children}</FsContext.Provider>
   ); 
}; 

export default FsContextPrv;