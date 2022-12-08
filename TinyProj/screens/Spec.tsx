import { Text, View , Image, TouchableOpacity, Alert } from "react-native"
import AXIOS from "../api";
import Ionicons from 'react-native-vector-icons/Feather'; 
import tw from 'twrnc'; 
import { useEffect , useRef, useState } from 'react'; 
import moment from "moment";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Specific = ({route}: any) => {
    const { id } = route.params;
    const ref = useRef<any | null>(null);
    const [len , setLen] = useState<any>(null); 
    const [txt , setTxt] = useState<string>('');
    const [reply , setReply] = useState<string>('');
    const [token , setToken] = useState<any>(null); 
    const [data , setData] = useState<any>(null); 
    const [tog , setTog] = useState<any>(null); 
    let userId: any = null;   

    const scrollToTop = () => {
        ref.current?.scrollTo({
          y: 0,
          animated: true,
        });
      };


    useEffect(() => {

        AXIOS.get(`spec/${id}`).then((res) => { 
            setData(res.data.data);  
            setLen(res.data.len[0].count); 
        }) 
    }, [data]);     

    const postComment = async () => {

        await AsyncStorage.getItem('token').then(val => setToken(val)); 
    
        await AXIOS.post('userDet', {
            token: token, 
        }).then((res) => {
            userId = res.data._id
        });  

        if ( txt !== '' && userId !== null) {
            await AXIOS.post(`addCmt/${id}` , {
                author: userId, 
                comment: txt, 
            }).then(() => { 
                console.log('Sent.'); 
                setTxt('');
            })
        }
        else {
            Alert.alert(`No more empty content.`); 
        }
    };

    const deleteThis = async({user}: any) => {
        await AsyncStorage.getItem('token').then(val => setToken(val)); 
    
        await AXIOS.post('userDet', {
            token: token, 
        }).then((res) => {
            userId = res.data._id
        });

        if ( userId == user ) {
            console.log('YOU CAN DELETE XD'); 
        }
        else {
           Alert.alert(`Sorry you can't delete this.`); 
        }
    }
    
    const sendReply = async ({repId}: any) => {
        await AsyncStorage.getItem('token').then(val => setToken(val)); 
    
        await AXIOS.post('userDet', {
            token: token, 
        }).then((res) => {
            userId = res.data._id
        });

        if ( reply !== '') {
            await AXIOS.post(`addCmt/${id}/addReply/${repId}/replies` , {
                author: userId, 
                comment: reply, 
            }).then(() => console.log('Replied!')).then(() => setReply('')).catch((err) => console.log(err)); 
        }
        else {
            Alert.alert('Reply should not be empty!');  
        }   
    }
    
    return (
        <ScrollView ref={ref}> 
        <View style={tw`bg-white w-full`}> 
            {data !== null ? <View style={tw`flex flex-col w-full p-5 justify-start items-start`}>
                <Text style={tw`text-xl text-[#072D4B] mt-2 mb-4`}>{data.title}</Text>
                <View style={tw`bg-[#2F9FF8] opacity-20 rounded-md`}><Text style={tw`text-blue-500 text-sm p-1 font-bold`}>{data.type}</Text></View>
                <Text style={tw`text-[#072D4B] opacity-60 mt-5 mb-5 text-sm`}>{data.descrip}</Text>
                <Image source={{uri: data.postImg}} style={{width: 327, height: 183}}/>
                <Text style={tw`text-[#072D4B] opacity-60 mt-5`}>{data.txt}</Text>
                <View style={tw`flex flex-col w-full justify-center items-center mt-5`}> 
                    <Text style={tw`text-[#072D4B] opacity-30 text-sm`}>Published {moment(data.createdAt).format('lll')}</Text>
                    <Text style={tw`text-[#072D4B] font-bold text-sm mb-5`}>by {data.author.name}</Text>
                    <Text style={tw`underline text-sm text-[#2F9FF8]`} onPress={() => scrollToTop()}>Back to Top</Text>
                </View>
                <View style={tw`flex flex-col w-full justify-start mt-10`}>
                <View style={tw`flex flex-row w-full justify-center items-center mb-5`}> 
                    <Text style={tw`text-[#072D4B] text-sm`}>Add your comment</Text>
                    <View style={{flex: 1 , height: 1, backgroundColor: 'black' , marginLeft: 20}}></View>  
                </View>
                <TextInput placeholder="Enter your comment here..." placeholderTextColor={"gray"} autoCapitalize="none" value={txt} onChangeText={text => setTxt(text)}/> 
                <TouchableOpacity onPress={() => postComment()}> 
                <View style={tw`bg-[#2F9FF8] rounded-md w-[169px] h-[38px] justify-center items-center mt-10`}><Text style={tw`text-white`}>Post comment</Text></View>
                </TouchableOpacity>
                <View style={tw`flex flex-row w-full mt-5 justify-start items-center`}> 
                   <Text style={tw`underline text-[#2F9FF8]`}>View All Comments</Text>
                   <Text style={tw`text-[#2F9FF8] font-bold`}>({len && len !== null ? len : 0})</Text>
                   <Ionicons name="arrow-down-circle" size={24} color={"#2F9FF8"} style={tw`ml-2`}/>
                </View>
                <View style={tw`flex flex-col w-full justify-start mt-5`}> 
                {data.comments && data.comments.length !== 0 ? data.comments.map((x: any , i: number) => {   
                    return<View key={i}><View style={tw`flex flex-row justify-start mt-5 mb-2`}><Text style={tw`text-[#2F9FF8] text-sm`}>{x.author.name}</Text><Ionicons name="thumbs-up" size={16} color={"black"} style={tw`ml-20`}/><Ionicons name="thumbs-down" size={16} color={"black"} style={tw`ml-5`}/></View>
                    <Text style={tw`text-[#072D4B] opacity-60`}>{x.comment}</Text>
                    <View style={tw`flex flex-row w-full justify-start items-center`}><Text style={tw`text-[#072D4B] opacity-30`}>Posted on {moment(x.created).format('lll')}</Text><TouchableOpacity onPress={() => deleteThis({user: x.author._id})}><View style={tw`flex flex-row items-center ml-5 mb-1`}><Ionicons name="trash" size={20} color={"#FF8C8C"}/><Text style={tw`underline text-[#FF8C8C] text-sm`}>Delete Comment</Text></View></TouchableOpacity></View>
                    <View style={tw`flex flex-row w-full justify-start items-center`}>
                    <Text style={tw`text-[#2F9FF8] text-sm`} onPress={() => setTog(i)}>Reply</Text>
                    <TextInput placeholder="Reply..." placeholderTextColor={"gray"} autoCapitalize="none" value={reply} onChangeText={text => setReply(text)} style={{display: tog == i ? 'flex' : 'none', marginLeft: 10}}/>
                    <TouchableOpacity onPress={() => sendReply({repId: x._id})} style={{display: tog == i ? 'flex' : 'none'}}><View style={tw`bg-[#2F9FF8] rounded-md justify-center items-center w-12 h-5 ml-5`}><Text style={tw`text-white`}>Send</Text></View></TouchableOpacity>
                    {x.reply !== null ? x.reply.map((x: any , i: number) => { 
                        // return <View key={i} style={tw`flex flex-col w-full justify-start items-start`}> 
                        // <View style={tw`flex flex-row justify-start`}><Text style={tw`text-[#2F9FF8] text-sm`}>{x.author.name}</Text><Ionicons name="thumbs-up" size={16} color={"black"} style={tw`ml-20`}/><Ionicons name="thumbs-down" size={16} color={"black"} style={tw`ml-5`}/></View>
                        // <Text style={tw`text-[#072D4B] opacity-60`}>{x.comment}</Text>
                        // <View style={tw`flex flex-row w-full justify-start items-center`}><Text style={tw`text-[#072D4B] opacity-30`}>Posted on {moment(x.created).format('lll')}</Text><View style={tw`flex flex-row items-center ml-5 mb-1`}><Ionicons name="trash" size={20} color={"#FF8C8C"}/><Text style={tw`underline text-[#FF8C8C] text-sm`}>Delete Comment</Text></View></View>
                        // <View style={tw`flex flex-row w-full justify-start items-center`}>
                        // <Text style={tw`text-[#2F9FF8] text-sm`} onPress={() => setAct(true)}>Reply</Text>
                        // <TextInput placeholder="Reply..." placeholderTextColor={"gray"} autoCapitalize="none" value={reply} onChangeText={text => setReply(text)} style={{display: act ? 'flex' : 'none', marginLeft: 10}}/>
                        // </View>
                        // </View>
                    }): <View><Text>Loading...</Text></View>}
                    </View>
                    </View>
                }):<View><Text>Loading...</Text></View>}
                </View>
                </View>
            </View>:<View><Text>Loading...</Text></View>}
        </View>
        </ScrollView>
    )
}; 

     
  

export default Specific; 