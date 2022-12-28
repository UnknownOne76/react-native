import moment from "moment";
import { useEffect, useState } from "react";
import { View , Image, Text} from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import tw from 'twrnc'; 
import Ionicons from 'react-native-vector-icons/Feather'; 
import AXIOS from "../api";

export const Business = ({navigation}: any) => {

  const [busi , setBusi] = useState<any>(null); 
  useEffect(() => {
     AXIOS.get('business').then((res) => {
       setBusi(res.data.business); 
     })
  }, []); 
  
  return (
     <ScrollView>
     <View style={tw`flex flex-col w-11/12 justify-center items-center bg-white m-5`}> 
        {busi !== null && busi.length !== 0 ? busi.map((x: any , i: number) => {
         return <TouchableOpacity key={i} onPress={() => navigation.navigate('Spec' , {id: x._id})} style={tw`border-b-2 border-[#2F9FF8] m-5`}>    
        <View style={tw`flex flex-col w-11/12 justify-start items-center m-5`}> 
        <Text style={tw`text-[#072D4B] text-sm mb-2 mr-6`}>{x.title}</Text>
        <Text style={tw`text-[#072D4B] text-sm opacity-50 mb-5`}>{x.descrip}</Text>
        <Image source={{uri: x.postImg}} style={{width: 250 , height: 150}}/>
        </View>
        <View style={tw`flex flex-row justify-start items-center pb-5 w-auto`}>
        <Text style={tw`text-[#072D4B] opacity-40`}>{x.author.name}</Text>
        <Text style={tw`text-[#072D4B] opacity-40 pl-10`}>{moment(x.createdAt).fromNow()}</Text>
        <Ionicons name='share' size={16} color={"#0768B5"} style={tw`pl-20`}/>
        <Ionicons name='pocket' size={16} color={"#0768B5"} style={tw`pl-10`}/>
        </View>
        </TouchableOpacity>
        }): <View><Text>No news from Business.</Text></View>}
        </View>
     </ScrollView>
  );
};

export default Business; 