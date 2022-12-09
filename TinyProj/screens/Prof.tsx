import { Button, Image, Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from 'twrnc'; 
import AXIOS from "../api";
import { useEffect, useState } from "react";

export const User = ({navigation}: any) => {

    const [user , setUser] = useState<any>(null); 
    const [token , setToken] = useState<any>(null); 

    AsyncStorage.getItem('token' , (err , val) => {
        if (!err) {
            return setToken(val); 
        } 
        else {
           console.log(err); 
        }
    })

    useEffect(() => { 
        if ( token != null ) {       
            AXIOS.post('userDet', {
                token: token 
            }).then((res) => {
                setUser(res.data); 
            });  
        }
    }, [user , token]); 


    const logOut = async () => {
        await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(false)); 
        await AsyncStorage.removeItem('token'); 
    }; 

    
    
    return (
        <View style={tw`flex flex-col justify-center items-center w-full h-full`}>
            <Text> User Profile </Text>
            <View style={tw`flex flex-col w-2/4 h-2/4 justify-center items-center`}>
               <Text> User Name: {user?.name} </Text>
               <Image source={{uri: user?.img}} style={{width: 100 , height: 100}}/>
            </View>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
            <Button title="Log out" onPress={() => logOut()}/>
        </View>
    )
}; 

export default User; 