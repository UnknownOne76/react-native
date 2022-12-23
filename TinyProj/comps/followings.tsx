import { useContext } from "react";
import { Button, Image, Text, View , Alert , TouchableOpacity } from "react-native"
import tw from 'twrnc'; 
import { FsContext } from "../cont/fsCont";
import AXIOS from "../api";
import { ScrollView } from "react-native-gesture-handler";

export const Followings = ({navigation}: any) => {
    const fsCont = useContext(FsContext); 

    const unFollow = async ({id}: any) => {
        await AXIOS.put(`unfollow/${id}` , {userId: fsCont?.user._id}).then((res) => {
            Alert.alert(res.data);  
        }).catch(err => console.log(err)); 
    };
    
    return (
        <ScrollView> 
        <View style={tw`flex flex-col w-full justify-center items-center`}>
           {fsCont?.user.following.length !== 0 ? fsCont?.user.following.map((x: any , i: number) => {
               return (
                <View style={tw`flex flex-row w-full justify-center items-center m-5`} key={i}> 
                <TouchableOpacity style={tw`flex flex-row justify-center items-center`} onPress={() => navigation.navigate('SpecUser' , {id: x._id})}> 
                <Image source={{uri: x.img}} style={[tw`rounded-full` ,{width: 50 , height: 50}]}/>
                <Text style={tw`ml-5 mr-5`}>User Name: {x.name}</Text>
                </TouchableOpacity>
                <Button onPress={() => unFollow({id: x._id})} title="UnFollow"/>
                </View>
               ) 
           }) : <View><Text>Not following anyone</Text></View>}
        </View>
        </ScrollView>
    )
}; 

export default Followings;