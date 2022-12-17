import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Feather'; 
import { FlatList, Text, View , Image } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import tw from 'twrnc';
import AXIOS from "../api";
import moment from "moment";

type Props = {
   route: any;
   navigation: any;        
}

export const Home = ({navigation }: Props) => {
  
  const [news , setNews ] = useState<any>(undefined); 

  useEffect(() => {
    AXIOS.get('posts').then((res) => {
      setNews(res.data.data);  
    }).catch(err => console.log(err));
  }, [news]);  

  const Item = ({title}: any) => (
    <View style={tw`flex ml-2 justify-start items-center bg-white m-2 p-2 rounded-full w-auto`}>
      <Text style={tw`text-[#072D4B]`}>{title}</Text>
    </View>
  );

  const renderItem = ({item}: any) => (
    <Item title={item}/>
  );    

    return (
    <View style={tw`flex flex-col w-full justify-center items-center bg-[#F4F9F8]`}> 
    <View style={tw`flex flex-col justify-start w-11/12 mt-5`}> 
    <Text style={tw`text-[#072D4B] text-sm`}>Top Stories for you</Text>
    <View style={tw`flex w-full justify-start`}> 
    <FlatList data={news !== undefined ? news[0].genres : ''} renderItem={renderItem} keyExtractor={item => item} horizontal pagingEnabled={true}/>
    </View>
    </View>
    <ScrollView style={tw`flex w-full`}> 
    <View style={tw`flex flex-col w-11/12 justify-center items-center bg-white m-5`}> 
    {news !== undefined && news.length !== 0 ? news.map((x: any , i: number) => {
      return <TouchableOpacity key={i} onPress={() => navigation.navigate('Spec' , {id: x._id})} style={tw`border-b-2 border-green-500 m-5`}>    
     <View style={tw`flex flex-col w-11/12 justify-start items-center m-5`}> 
     <Text style={tw`text-[#072D4B] text-sm mb-2 mr-6`}>{x.title}</Text>
     <Text style={tw`text-[#072D4B] text-sm opacity-50 mb-5`}>{x.descrip}</Text>
     <Image source={{uri: x.postImg}} style={{width: 250 , height: 150}}/>
     </View>
     <View style={tw`flex flex-row justify-start items-center pl-4 w-auto pb-5`}>
        <Text style={tw`text-[#072D4B] opacity-40`}>{x.author.name}</Text>
        <Text style={tw`text-[#072D4B] opacity-40 pl-10`}>{moment(x.createdAt).fromNow()}</Text>
       <Ionicons name='share' size={16} color={"#0768B5"} style={tw`pl-20`}/>
       <Ionicons name='pocket' size={16} color={"#0768B5"} style={tw`pl-10`}/>
     </View>
     </TouchableOpacity>
    }): <View><Text>Loading...</Text></View>}
    </View>
    </ScrollView>
    </View>
    )
};  

export default Home;

