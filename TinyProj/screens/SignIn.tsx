import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState} from "react";
import { Text, View , Alert, Button} from "react-native"
import { TextInput } from 'react-native-gesture-handler';
import tw from 'twrnc'; 
import AXIOS from "../api";
import { FsContext } from '../cont/fsCont';

export const SignIn = ({navigation}: any) => {

    const [email , setEmail] = useState<string>(''); 
    const [pass , setPass] = useState<string>('');
    const fsCont = useContext(FsContext); 

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
                    fsCont?.setIsLogged(true); 
                    
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
              <Text style={tw`font-bold text-2xl text-[#2F9FF8]`}>Sign in Center</Text>
            </View>
            <TextInput style={tw`bg-white text-[#2F9FF8] m-5 rounded-full p-2 w-2/6`} placeholder="your email" onChangeText={text => setEmail(text)} value={email} autoCapitalize='none' placeholderTextColor={"#2F9FF8"}/>
            <TextInput style={tw`bg-white text-[#2F9FF8] m-5 rounded-full p-2 w-2/6`} placeholder="your password" onChangeText={text => setPass(text)} value={pass} autoCapitalize='none' placeholderTextColor={"#2F9FF8"} secureTextEntry={true}/>
            <Button title='Sign in' onPress={() => signIn()} color="#2F9FF8"/>
            <View style={tw`mt-5`}/>
            <Button title='Sign up' onPress={() => navigation.navigate('Register')} color="#2F9FF8"/>
        </View>
    )
}; 

export default SignIn;