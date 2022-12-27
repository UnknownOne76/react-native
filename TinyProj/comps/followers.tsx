import { useContext } from "react";
import { Button, Image, Text, View , Alert , TouchableOpacity} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import tw from 'twrnc'; 
import { FsContext } from "../cont/fsCont";
import AXIOS from "../api";

export const Followers = ({navigation}: any) => {
    const fsCont = useContext(FsContext); 

    const followUser = async({id}: any) => {
        await AXIOS.put(`follow/${id}` , {userId: fsCont?.user._id}).then(async(res) => {
            await AXIOS.post(`notif/${id}` , {id: fsCont?.user._id , content: `${fsCont?.user.name} has just followed you!`}).then(() => Alert.alert(res.data)); 
        }); 
    }; 

    return (
        <ScrollView> 
        <View style={tw`flex flex-col w-full justify-center items-center`}>
           {fsCont?.user.followers.length !== 0 ? fsCont?.user.followers.map((x: any , i: number) => {
               return (
                   <View style={tw`flex flex-row w-full justify-center items-center m-5`} key={i}> 
                  <TouchableOpacity style={tw`flex flex-row justify-center items-center`} onPress={() => navigation.navigate('SpecUser' , {id: x._id})}> 
                  <Image source={{uri: x.img}} style={[tw`rounded-full` ,{width: 50 , height: 50}]}/>
                  <Text style={tw`ml-5 mr-5`}>User Name: {x.name}</Text>
                  </TouchableOpacity>
                  <Button onPress={() => followUser({id: x._id})} title="Follow"/>
                  </View>
               ) 
           }) : <View><Text>Currently no followers.</Text></View>}
        </View>
        </ScrollView>
    )
}; 

export default Followers;