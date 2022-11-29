import { useState } from "react";
import { Button , Text, View , Alert} from "react-native"
import AXIOS from "../api";
import tw from 'twrnc'; 
import { TextInput } from "react-native-gesture-handler";

export const SignUp = ({navigation}: any) => {

    const [name , setName] = useState<string>(''); 
    const [email , setEmail] = useState<string>(''); 
    const [pass , setPass] = useState<string>(''); 
    const [photo , setPhoto] = useState<string>(''); 

    const signUp = async () => {
        if ( name !== '' && email !== '' && pass !== '' && photo !== '') {
            console.log(name.length); 
            if ( name.length >= 20 ) {
               setName(''); 
               return Alert.alert(`That's the longest name i've ever seen.`);
            }
            else {
                await AXIOS.post('users' , {
                    name: name, 
                    email: email, 
                    password: pass, 
                    img: photo, 
                }).then((res) => {
                    if ( res.data === "User was here before.") {
                        setName(''); 
                        setPass(''); 
                        setEmail(''); 
                        setPhoto(''); 
                        return Alert.alert('User has been already created.'); 
                    } 
                    alert('Signed Up!'); 
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
            setPhoto(''); 
            return Alert.alert('You must fill all the type fields.'); 
        } 
    }
    return (
        <View style={tw`flex flex-col justify-center items-center w-full h-full`}>
            <View style={tw`flex flex-col justify-center items-center w-2/4`}>
            <Text style={tw`font-bold text-2xl`}>Sign Up Center</Text>
            <TextInput style={tw`bg-white text-black m-5 rounded-full p-2`} placeholder="Your name" value={name} onChangeText={text => setName(text)} autoCapitalize='none' placeholderTextColor={"gray"}/>
            <TextInput style={tw`bg-white text-black m-5 rounded-full p-2`} placeholder="Your email" value={email} onChangeText={text => setEmail(text)} autoCapitalize='none' placeholderTextColor={"gray"}/>
            <TextInput style={tw`bg-white text-black m-5 rounded-full p-2`} placeholder="Your password" value={pass} onChangeText={text => setPass(text)} autoCapitalize='none' placeholderTextColor={"gray"}/>
            <TextInput style={tw`bg-white text-black m-5 rounded-full p-2`} placeholder="Your Photo" value={photo} onChangeText={text => setPhoto(text)} autoCapitalize='none' placeholderTextColor={"gray"}/>
            <Button title="Sign up" onPress={() => signUp()}/>
            </View>
            <Text style={tw`font-bold text-2xl mb-5`}>Already have an account?</Text>
            <Button title="Sign in" onPress={() => navigation.navigate('Login')}/>
        </View>
    )
}; 

export default SignUp; 

function alert(arg0: string) {
    throw new Error("Function not implemented.");
}
