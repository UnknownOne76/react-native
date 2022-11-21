import * as React from 'react';  
import { useState , createContext } from 'react'; 

export type Context = {
   data: boolean; 
   setData: (e: boolean) => void
}

type Props = {
   children: React.ReactNode;
}

export const FsContext = createContext<Context>({data: false , setData: () => {}}); 

export const FsContextPrv = ({children}: Props) => {

   const [data , setData] = useState<boolean>(false);

   return (
      <FsContext.Provider value={{data , setData}}>{children}</FsContext.Provider>
   ); 
}; 

export default FsContextPrv;