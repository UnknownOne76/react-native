import { Button, Image, Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from 'twrnc'; 
import AXIOS from "../api";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Select } from '@mobile-reality/react-native-select-pro';

export const User = ({navigation}: any) => {

    const [user , setUser] = useState<any>(null); 
    const [token , setToken] = useState<any>(null); 
    const [type , setType] = useState<any>(null);
    const [gen , setGen] = useState<any>(null); 
    const types = [
        {value: 'All' ,label: 'All'}, 
        {value: 'World',label: 'Around the World'}, 
        {value: 'Business' ,label: 'Business' }, 
        {value: 'Hp' ,label: 'Health'}, 
        {value: 'Enter' , label: 'Entertainment'}, 
        {value: 'Sports' ,label: 'Sports'}
    ]; 

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

    const postNews = async () => { 
        await AXIOS.post('post' , {
            title: 'Welo', 
            descrip: 'Blah blah', 
            txt: 'Bdadwadwa', 
            userId: user._id, 
            type: type, 
            genre: gen, 
        }).then(() => console.log('Added!')).catch(err => console.log(err)); 
    }


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
            <Button title="Go back" onPress={() => navigation.goBack()}/>
            <Button title="Log out" onPress={() => logOut()}/>
            </View>
            <View style={tw`flex w-full justify-center items-center mb-20`}> 
                <Text>Post Center </Text>
                <View style={tw`flex justify-center items-center`}>
                <Text>Title</Text>
                <TextInput placeholder="Title of News..."/>
                <Text>Description</Text>
                <TextInput placeholder="Description of News..."/>
                <Text>Texts</Text>
                <TextInput placeholder="Write anything..."/>
                <View style={tw`flex justify-center items-center`}> 
                <Text>Type</Text>
                <Select options={types} onSelect={(val) => setType(val?.value)}/>
                <View style={tw`flex justify-center items-center ${type == 'All' ? 'flex' : 'hidden'}`}> 
                <Text>Select Genre</Text>
                <TextInput placeholder="Sub-type..." onChangeText={txt => setGen(txt)}/>
                </View>
                <Button title="Post" onPress={() => postNews()}/>
                </View>
                </View>
            </View>
        </View>
    )
}; 

export default User; 