import { Alert, Button, Image, Text, TouchableOpacity, View } from "react-native"
import tw from 'twrnc'; 
import AXIOS from "../api";
import { useContext, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Select } from '@mobile-reality/react-native-select-pro';
import { FsContext } from "../cont/fsCont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";

export const User = ({navigation}: any) => {

    const [type , setType] = useState<any>(null);
    const [gen , setGen] = useState<any>(null); 
    const [title , setTitle] = useState<any>(''); 
    const [descrip , setDescrip] = useState<any>(''); 
    const [txt , setTxt] = useState<any>(''); 
    const [img , setImg] = useState<any>(null); 
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
        if ( title !== '' && descrip !== '' && txt !== '' && type === 'All' && img !== null) { 
            await AXIOS.post('post' , {
                title: title, 
                descrip: descrip, 
                postImg: img,
                txt: txt, 
                userId: fsCont?.user._id, 
                type: type, 
                genre: gen, 
            }).then(() => {console.log('Added!') , setTitle('') , setDescrip('') , setImg(null) , setTxt('') , setGen(null) , setType(null)}).catch(err => console.log(err)); 
        }
        else if ( title !== '' && descrip !== '' && txt !== '' && type !== 'All' && img !== null) { 
            await AXIOS.post('post' , {
                title: title, 
                descrip: descrip, 
                postImg: img,
                txt: txt, 
                userId: fsCont?.user._id, 
                type: type,  
            }).then(() => {console.log('Added!') , setTitle('') , setDescrip('') , setImg(null) , setTxt('') , setGen(null) , setType(null)}).catch(err => console.log(err)); 
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
        Alert.alert(`Have a nice day! , ${fsCont?.user.name}`); 
        fsCont?.setIsLogged(false); 
    }; 

    return (
        <ScrollView style={tw`flex mt-10`}> 
        <View style={tw`flex flex-col justify-center items-center w-full`}>
            <View style={tw`flex flex-col w-2/4 justify-center items-center`}>
               <Text style={tw`text-[#2F9FF8]`}> User Profile </Text>
               <Text style={tw`flex m-5 text-sm text-[#2F9FF8]`}>User Name: {fsCont?.user.name}</Text>
               <Image source={{uri: fsCont?.user.img}} style={[tw`rounded-lg` ,{width: 100 , height: 100}]}/>
               <View style={tw`flex flex-row w-full justify-center items-center m-5`}>
                 <TouchableOpacity onPress={() => navigation.navigate('Followers')} style={tw`flex text-sm w-2/4`}><Text style={tw`text-[#2F9FF8]`}>Followers: {fsCont?.user.followers.length}</Text></TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('Followings')} style={tw`flex text-sm`}><Text style={tw`text-[#2F9FF8]`}>Following: {fsCont?.user.following.length}</Text></TouchableOpacity>
               </View>
            <Button title="Go back" onPress={() => navigation.goBack()} color="#2F9FF8"/>
            <View style={tw`m-2`}/>
            <Button title="Log out" onPress={() => logOut()} color="#2F9FF8"/>
            </View>
            <View style={tw`flex w-full justify-center items-center mt-5`}> 
                <Text style={tw`text-[#2F9FF8]`}>Post Center </Text>
                <View style={tw`flex justify-center items-center mt-2`}>
                <View style={tw`flex flex-col justify-center items-center mt-2`}>  
                <Text style={tw`text-[#2F9FF8]`}>Title</Text>
                <TextInput placeholder="Title of News..." onChangeText={txt => setTitle(txt)} value={title}/>
                </View>
                <View style={tw`flex flex-col justify-center items-center mt-5`}> 
                <Text style={tw`text-[#2F9FF8]`}>Description</Text>
                <TextInput placeholder="Description of News..." onChangeText={txt => setDescrip(txt)} value={descrip}/>
                </View>
                <View style={tw`flex flex-col justify-center items-center mt-5`}> 
                <Text style={tw`text-[#2F9FF8]`}>Texts</Text>
                <TextInput placeholder="Write anything..." onChangeText={txt => setTxt(txt)} value={txt}/>
                </View>
                <View style={tw`flex justify-center items-center mt-2`}>
                <Text style={tw`text-[#2F9FF8]`}>Add your News Photo</Text>
                <Button title="Open Lib" onPress={() => launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
                 }, (res) => {
                res.assets?.map((x) => setImg(x.uri)); 
                })}/>
                <Image source={{uri: img == null ? `https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg` : img}} style={[{width: 150 , height: 100} , tw`rounded-lg border-4 border-[#2F9FF8]`]}/>
                <View style={tw`${img != null ? 'flex' : 'hidden'}`}><Button title="Cancel" onPress={() => setImg(null)} color="#2F9FF8"/></View>
                </View>
                <View style={tw`flex justify-center items-center`}> 
                <Text style={tw`text-[#2F9FF8]`}>Type</Text>
                <View style={tw`flex w-32`}> 
                <Select options={types} onSelect={(val) => setType(val?.value)} animated={true}/>
                </View>
                <View style={tw`flex justify-center items-center ${type == 'All' ? 'flex' : 'hidden'}`}> 
                <Text style={tw`text-[#2F9FF8]`}>Select Genre</Text>
                <TextInput placeholder="Sub-type..." onChangeText={txt => setGen(txt)} autoCapitalize={"words"}/>
                </View>
                <View style={tw`m-2`}/>
                <Button title="Post" onPress={() => postNews()} color="#2F9FF8"/>
                </View>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}; 

export default User; 