import { useContext } from "react";
import { Button, Image, Text, View } from "react-native"
import tw from 'twrnc'; 
import { FsContext } from "../cont/fsCont";

export const Followings = () => {
    const fsCont = useContext(FsContext); 
    
    return (
        <View style={tw`flex flex-col w-full h-full justify-center items-center`}>
           {fsCont?.user.following.length !== 0 ? fsCont?.user.following.map((x: any , i: number) => {
               return (
                <View style={tw`flex flex-row w-full justify-center items-center m-5`} key={i}> 
                <Image source={{uri: x.img}} style={[tw`rounded-full` ,{width: 50 , height: 50}]}/>
                <Text style={tw`ml-5 mr-5`}>User Name: {x.name}</Text>
                <Button onPress={() => console.log('Follow em')} title="Follow"/>
                </View>
               ) 
           }) : <View><Text>Not following anyone</Text></View>}
        </View>
    )
}; 

export default Followings;