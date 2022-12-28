import React, { useContext, useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Feather'; 
import { FlatList, Text, View , Image , Alert } from "react-native"
import { ScrollView , TouchableOpacity} from "react-native-gesture-handler";
import tw from 'twrnc';
import AXIOS from "../api";
import moment from "moment";
import { FsContext } from "../cont/fsCont";

type Props = {
   route: any;
   navigation: any;        
}

export const Home = ({navigation }: Props) => {
  
  const fsCont = useContext(FsContext); 
  const [news , setNews ] = useState<any>(undefined);
  const [users , setUsers] = useState<any>(null); 
  const [gen, setGen] = useState<any>(null);
  const [id , setId] = useState<any>(null);    
  useEffect(() => {
    AXIOS.get(`posts/${id}`).then((res) => {
      setNews(res.data.data);   
    }).catch(err => console.log(err)); 

    AXIOS.get('genres').then((res) => {
       setGen(res.data.data); 
    }).catch(err => console.log(err));  

    AXIOS.get('').then((res) => {
        setUsers(res.data.data); 
    }); 
  }, [id]);   

  const followUser = async({id}: any) => { 
    if ( fsCont?.user._id == id) {Alert.alert(`Can't follow yourself.`)}  
    else { 
    await AXIOS.put(`follow/${id}` , {
       userId: fsCont?.user._id
    }).then((res) => {
       Alert.alert(res.data); 
       fsCont?.setFol(Math.floor(Math.random() * 100));  
    }).catch(err => console.log(err));
   } 
  }

  const Item = ({title , onPress}: any) => (
    <TouchableOpacity onPress={onPress}> 
    <View style={tw`flex justify-start items-center ${title === id ? 'bg-[#2F9FF8]' : 'bg-white'} m-2 p-2 rounded-full w-auto`}>
      <Text style={tw`${title === id ? 'text-white' : 'text-[#072D4B]'}`}>{title}</Text>
    </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}: any) => (
    <Item title={item} onPress={() => setId(item)}/>
  );

  const RenderEach = ({item}: any) => (
    <View style={tw`flex flex-col w-36 h-44 justify-center items-center m-5 border-2 border-[#2F9FF8]`}>
    <Image source={{uri: item.img}} style={[{width: 70 , height: 70} , tw`rounded-full m-2`]}/>
    <Text style={tw`text-sm text-[#072D4B]`}>{item.name}</Text>
    <TouchableOpacity style={tw`flex justify-center items-center bg-[#2F9FF8] w-28 h-8 mt-2 rounded-lg`} onPress={() => followUser({id: item._id})}>
      <Text style={tw`text-white text-sm`}>Follow</Text>
    </TouchableOpacity>
    </View>
    ); 

    return (
    <View style={tw`flex flex-col w-full justify-center items-center bg-[#F4F9F8]`}> 
    <View style={tw`flex flex-col justify-start w-11/12 mt-5`}> 
    <Text style={tw`text-[#072D4B] text-sm`}>Top Stories for you</Text>
    <View style={tw`flex w-full justify-start`}> 
    <FlatList data={gen !== null && Object.keys(gen).length !== 0 ?  gen[0].genres : ''} renderItem={renderItem} keyExtractor={item => item} horizontal pagingEnabled={true} extraData={id}/>
    </View>
    </View>
    <ScrollView style={tw`flex w-full`}> 
    <View style={tw`flex flex-col w-11/12 justify-center items-center bg-white m-5`}> 
    {news !== undefined && news.length !== 0 ? news.map((x: any , i: number) => {
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
    }): <View><Text>Loading...</Text></View>}
    <View style={tw`flex flex-col w-full justify-center items-center m-10`}>
      <View style={tw`flex flex-row w-11/12 justify-start items-center`}> 
      <Ionicons name="feather" size={24} color={"#072D4B"}/>
      <Text style={tw`text-sm text-[#072D4B] ml-4`}>Creators you should follow</Text>
      </View>
      <FlatList data={users !== null ? users : ''} renderItem={({item}: any) => <RenderEach item={item}/>} keyExtractor={item => item._id} horizontal={true}/>
    </View>
    </View>
    </ScrollView>
    </View>
    )
};  

export default Home;

