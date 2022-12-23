import { Alert, Button, Image, Text, TouchableOpacity, View } from "react-native"
import tw from 'twrnc'; 
import AXIOS from "../api";
import { useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Select } from '@mobile-reality/react-native-select-pro';
import { FsContext } from "../cont/fsCont";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const User = ({navigation}: any) => {

    const [type , setType] = useState<any>(null);
    const [gen , setGen] = useState<any>(null); 
    const [title , setTitle] = useState<any>(''); 
    const [descrip , setDescrip] = useState<any>(''); 
    const [txt , setTxt] = useState<any>(''); 
    const fsCont = useContext(FsContext); 
    const types = [
        {value: 'All' ,label: 'All'}, 
        {value: 'World',label: 'Around the World'}, 
        {value: 'Business' ,label: 'Business' }, 
        {value: 'Hp' ,label: 'Health'}, 
        {value: 'Enter' , label: 'Entertainment'}, 
        {value: 'Sports' ,label: 'Sports'}
    ];   

    const postNews = async () => { 
        if ( title !== '' && descrip !== '' && txt !== '' && type != null) { 
            await AXIOS.post('post' , {
                title: title, 
                descrip: descrip, 
                txt: txt, 
                userId: fsCont?.user._id, 
                type: type, 
                genre: gen, 
            }).then(() => console.log('Added!')).catch(err => console.log(err)); 
        }
        else {
            Alert.alert('Missing any or not filled.'); 
            setTitle(''); 
            setDescrip(''); 
            setTxt('');
        }
    }

    const logOut = async () => {
        await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(false)); 
        await AsyncStorage.removeItem('token'); 
    }; 

    return (
        <View style={tw`flex flex-col justify-center items-center w-full h-full`}>
            <View style={tw`flex flex-col w-2/4 h-2/4 justify-center items-center`}>
               <Text> User Profile </Text>
               <Text style={tw`m-5 text-lg`}> User Name: {fsCont?.user.name} </Text>
               <Image source={{uri: fsCont?.user.img}} style={[tw`rounded-lg` ,{width: 100 , height: 100}]}/>
               <View style={tw`flex flex-row w-full justify-center items-center m-5`}>
                 <TouchableOpacity onPress={() => navigation.navigate('Followers')} style={tw`flex text-sm w-2/4`}><Text>Followers: {fsCont?.user.followers.length}</Text></TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('Followings')} style={tw`flex text-sm`}><Text>Following: {fsCont?.user.following.length}</Text></TouchableOpacity>
               </View>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
            <Button title="Log out" onPress={() => logOut()}/>
            </View>
            <View style={tw`flex w-full justify-center items-center mb-20`}> 
                <Text>Post Center </Text>
                <View style={tw`flex justify-center items-center`}>
                <Text>Title</Text>
                <TextInput placeholder="Title of News..." onChangeText={txt => setTitle(txt)} value={title}/>
                <Text>Description</Text>
                <TextInput placeholder="Description of News..." onChangeText={txt => setDescrip(txt)} value={descrip}/>
                <Text>Texts</Text>
                <TextInput placeholder="Write anything..." onChangeText={txt => setTxt(txt)} value={txt}/>
                <View style={tw`flex justify-center items-center`}> 
                <Text>Type</Text>
                <Select options={types} onSelect={(val) => setType(val?.value)}/>
                <View style={tw`flex justify-center items-center ${type == 'All' ? 'flex' : 'hidden'}`}> 
                <Text>Select Genre</Text>
                <TextInput placeholder="Sub-type..." onChangeText={txt => setGen(txt)} autoCapitalize={"words"}/>
                </View>
                <Button title="Post" onPress={() => postNews()}/>
                </View>
                </View>
            </View>
        </View>
    )
}; 

export default User; 