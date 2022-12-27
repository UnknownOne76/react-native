import { useContext, useEffect, useState } from "react";
import { Text, View , TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import tw from 'twrnc'; 
import AXIOS from "../api";
import { FsContext } from "../cont/fsCont";

export const Notification = ({navigation}: any) => {

    const fsCont = useContext(FsContext); 
    const [notif , setNotif] = useState<any>(null); 
    
    useEffect(() => {
       AXIOS.get(`user/notif/${fsCont?.user._id}`).then((res) => {
          setNotif(res.data.data);  
       }); 
    }, [notif]); 

    const navIt = async({specId , id , nav}: any) => {
        nav.includes('post!') ? await navigation.navigate('Spec' , {id: specId}) : nav.includes('followed you!') || nav.includes('unfollowed you!') ? await navigation.navigate('Followers') : '';
        await AXIOS.put(`notif/del/${fsCont?.user._id}` , {id: id}).then(() => {
            console.log('Notification: Deleted!'); 
        }).catch(err => console.log(err)); 
    }; 

    return (
        <ScrollView>
        <View style={tw`flex flex-col w-full justify-center items-center`}>
            {notif != null && notif.length != 0 ? notif.map((x: any , i: number) => { 
                return (
                    <TouchableOpacity key={i} style={tw`flex w-full justify-center items-center m-5`} onPress={() => navIt({specId: x.id , id: x._id , nav: x.content})}>
                       <Text>Info: {x.content}</Text>
                    </TouchableOpacity>
                )
            }): <View><Text>Currently no Notifications.</Text></View>}
        </View>
        </ScrollView>
    )
}; 

export default Notification; 