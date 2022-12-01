import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Feather'; 
import { FlatList, Text, View , Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from 'twrnc';
import AXIOS from "../api";
import moment from "moment";

type Props = {
   route: any;
   navigation: any;        
}

export const Home = ({navigation }: Props) => {
  
  const [news , setNews ] = useState<any>(); 

  useEffect(() => {
    AXIOS.get('posts').then((res) => {
      setNews(res.data.data);  
    }).catch(err => console.log(err));
  }, []);  

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'All',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Android',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Cricket',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d98', 
      title: 'Iphone' 
    }
  ];

  const Item = ({ title }: any) => (
    <View style={tw`flex`}>
      <Text>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: any) => (
    <Item title={item.title} />
  );    

    return (
    <View style={tw`flex flex-col w-full justify-center items-center bg-[#E5E5E5]`}> 
    <View style={tw`flex flex-col justify-start items-start w-11/12`}> 
    <Text style={tw`text-[#072D4B] text-sm`}>Top Stories for you</Text>
    <View style={tw`flex w-3/5 ml-2`}> 
    <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
    </View>
    <View style={tw`flex flex-col w-11/12 justify-center items-center bg-white m-5`}> 
    {news !== undefined && news.length !== 0 ? news.map((x: any , i: number) => {
      return <TouchableOpacity key={i} onPress={() => navigation.navigate('Spec' , {id: x._id})}>    
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
    </View>
    )
};  

export default Home;
