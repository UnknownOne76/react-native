import { useState } from "react";
import { Button, Dimensions, SectionList, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from 'twrnc';
import AXIOS from "../api";
import Header from "./layout/header";

type Props = {
   route: any;
   navigation: any;        
}

export const Home = ({navigation }: Props) => {  

  const [st , setSt] = useState<any>(null); 

//   AXIOS.get('posts').then((res) => {
//       setSt(res.data.data);  
//  }).catch(err => console.log(err)); 

  const data = [
     {
       title: "Top stories for you",
       data: ['data']
     }
  ]
  
  const Item = ({item}: any) => (
    <View>
    <TouchableOpacity onPress={() => console.log('hmm')}>  
      <Text>{item.title}</Text>
      <Text>{item.txt}</Text>
      <Button title="tap me" onPress={() => console.log('bro')}/>
      </TouchableOpacity>
    </View>
  );
 
  const renderItem = ({item}: any) => {
    return ( 
      <View>
      {st !== null ? <Item item={item}/> : <Text> Loading. </Text>}
      </View>
    ); 
  };

    return (
    <View style={{flex: 1, justifyContent: "center" , alignItems: "center" , backgroundColor: "white"}}>
      <SectionList sections={st !== null ? data : []} renderItem={renderItem} renderSectionHeader={({section: { title }}) => ( <Text> {title} </Text>)} ListHeaderComponent={<Header navigation={navigation}/>}/>
    </View>
    );
}; 

export default Home;