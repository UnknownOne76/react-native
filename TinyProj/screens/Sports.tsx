import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AXIOS from "../api";
import tw from 'twrnc'; 
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Feather'; 

export const Sports = ({navigation}: any) => {

    const [sprt , setSprt] = useState<any>(null); 

    useEffect(() => {
        AXIOS.get('sports').then((res) => {
          setSprt(res.data.sprts); 
        })
     }, []); 

    return (
        <ScrollView>
         <View style={tw`flex flex-col w-11/12 justify-center items-center bg-white m-5`}> 
        {sprt !== null && sprt.length !== 0 ? sprt.map((x: any , i: number) => {
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
        }): <View><Text>No news from Sports</Text></View>}
        </View>
        </ScrollView>
    )
}