import { useState } from "react";
import { Button , Text, View , Alert} from "react-native"
import AXIOS from "../api";
import tw from 'twrnc'; 
import { TextInput } from "react-native-gesture-handler";

export const SignUp = ({navigation}: any) => {

    const [name , setName] = useState<string>(''); 
    const [email , setEmail] = useState<string>(''); 
    const [pass , setPass] = useState<string>(''); 

    const signUp = async () => {
        if ( name !== '' && email !== '' && pass !== '') { 
            if ( name.length >= 20 ) {
               setName(''); 
               return Alert.alert(`That's the longest name i've ever seen.`);
            }
            else {
                if (!email.includes(`/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)`)) {
                    Alert.alert('Email address is invalid.'); 
                    setEmail(''); 
                    return 0;
                };  
                await AXIOS.post('users' , {
                    name: name, 
                    email: email, 
                    password: pass, 
                }).then((res) => {
                    if ( res.data === "User was here before.") {
                        setName(''); 
                        setPass(''); 
                        setEmail(''); 
                        return Alert.alert('User has been already created.'); 
                    } 
                     Alert.alert('Signed Up!'); 
                     setTimeout(() => {
                        navigation.navigate('Login'); 
                    } , 1500); 
                }).catch((err) => console.log(err)); 
            } 
        }
        else {
            setName(''); 
            setEmail(''); 
            setPass('');  
            return Alert.alert('You must fill all the type fields.'); 
        } 
    }
    return (
        <View style={tw`flex flex-col justify-center items-center w-full h-full`}>
            <View style={tw`flex flex-col justify-center items-center w-2/4 pb-10`}>
            <Text style={tw`font-bold text-2xl text-[#2F9FF8]`}>Sign Up Center</Text>
            <TextInput style={tw`bg-white text-[#2F9FF8] m-5 rounded-full p-2 w-36`} placeholder="Your name" value={name} onChangeText={text => setName(text)} autoCapitalize='none' placeholderTextColor={"#2F9FF8"}/>
            <TextInput style={tw`bg-white text-[#2F9FF8] m-5 rounded-full p-2 w-36`} placeholder="Your email" value={email} onChangeText={text => setEmail(text)} autoCapitalize='none' placeholderTextColor={"#2F9FF8"}/>
            <TextInput style={tw`bg-white text-[#2F9FF8] m-5 rounded-full p-2 w-36`} placeholder="Your password" value={pass} onChangeText={text => setPass(text)} autoCapitalize='none' placeholderTextColor={"#2F9FF8"}/>
            <Button title="Sign up" onPress={() => signUp()} color="#2F9FF8"/>
            </View> 
            <Text style={tw`font-bold text-2xl text-[#2F9FF8] mb-5`}>Already have an account?</Text>
            <Button title="Sign in" onPress={() => navigation.navigate('Login')} color="#2F9FF8"/>
        </View>
    )
}; 

export default SignUp; 
