import { useContext } from "react";
import { Button, Image, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import tw from 'twrnc'; 
import { FsContext } from "../cont/fsCont";

export const Followers = () => {
    const fsCont = useContext(FsContext); 

    return (
        <ScrollView> 
        <View style={tw`flex flex-col w-full justify-center items-center`}>
           {fsCont?.user.followers.length !== 0 ? fsCont?.user.followers.map((x: any , i: number) => {
               return (
                  <View style={tw`flex flex-row w-full justify-center items-center m-5`} key={i}> 
                  <Image source={{uri: x.img}} style={[tw`rounded-full` ,{width: 50 , height: 50}]}/>
                  <Text style={tw`ml-5 mr-5`}>User Name: {x.name}</Text>
                  <Button onPress={() => console.log('Follow em')} title="Follow"/>
                  </View>
               ) 
           }) : <View><Text>Currently no followers.</Text></View>}
        </View>
        </ScrollView>
    )
}; 

export default Followers;