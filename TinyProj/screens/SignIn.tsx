import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState} from "react";
import { Text, View , Alert, Button} from "react-native"
import { TextInput } from 'react-native-gesture-handler';
import tw from 'twrnc'; 
import AXIOS from "../api";

export const SignIn = ({navigation}: any) => {

    const [email , setEmail] = useState<string>(''); 
    const [pass , setPass] = useState<string>('');

    const signIn = async () => {
        if ( email !== '' && pass !== '') {
            await AXIOS.post('login' , {
                email: email, 
                password: pass
            }).then(async (res) => {
                if (res.data === "Incorrect password.") {
                   Alert.alert('Your password is incorrect.');  
                   setPass(''); 
                }
                else if ( res.data === "User not found.") {
                    Alert.alert("User not found."); 
                    setEmail(''); 
                    setPass(''); 
                }
                else {
                    Alert.alert('Logged in!'); 
                    await AsyncStorage.setItem('token', res.data.token); 
                    await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(true)); 
                }
            }).catch((err) => console.log(err)); 
        }
        else {      
            setEmail(''); 
            setPass(''); 
            return Alert.alert('Must fill up those fields.'); 
        }; 
    }; 
    
    return (
        <View style={tw`flex flex-col justify-center items-center w-full h-full`}>
            <View style={tw`flex flex-col justify-center items-center w-2/4`}> 
              <Text style={tw`font-bold text-2xl`}>Sign in Center</Text>
            </View>
            <TextInput style={tw`bg-white text-black m-5 rounded-full p-2`} placeholder="your email" onChangeText={text => setEmail(text)} value={email} autoCapitalize='none' placeholderTextColor={"gray"}/>
            <TextInput style={tw`bg-white text-black m-5 rounded-full p-2`} placeholder="your password" onChangeText={text => setPass(text)} value={pass} autoCapitalize='none' placeholderTextColor={"gray"}/>
            <Button title='Sign in' onPress={() => signIn()}/>
            <Button title='Sign up' onPress={() => navigation.navigate('Register')}/>
        </View>
    )
}; 

export default SignIn;