import { Text, View , Image, TouchableOpacity, Alert , TextInput } from "react-native"
import AXIOS from "../api";
import Ionicons from 'react-native-vector-icons/Feather'; 
import tw from 'twrnc'; 
import { useContext, useEffect , useRef, useState  } from 'react'; 
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { FsContext } from "../cont/fsCont";

export const Specific = ({navigation , route}: any) => {

    const { id } = route.params;
    const fsCont = useContext(FsContext);  
    const ref = useRef<any | null>(null);
    const [len , setLen] = useState<any>(null); 
    const [disp , setDisp] = useState<boolean>(false); 
    const [txt , setTxt] = useState<string>('');
    const [reply , setReply] = useState<string>('');
    const [nst , setNst] = useState<string>(''); 
    const [data , setData] = useState<any>(null); 
    const [tog , setTog] = useState<any>(null); 
    const [rep , setRep] = useState<boolean>(false); 
    const [random , setRandom] = useState<any>(null); 

    const scrollToTop = () => {
        ref.current?.scrollTo({
          y: 0,
          animated: true,
        });
      };

    useEffect(() => {
        AXIOS.get('news/spec').then((res) => {
            setRandom(res.data.result); 
          }); 
    }, [navigation, route]); 

    useEffect(() => { 
        AXIOS.get(`spec/${id}`).then((res) => { 
            setData(res.data.data); 
            setLen(res.data.len[0].count);   
        })
    }, [data]);     

    const postComment = async () => {

        if ( txt !== '' ) {
            await AXIOS.post(`addCmt/${id}` , {
                author: fsCont?.user._id, 
                comment: txt, 
            }).then(() => { 
                console.log('Sent.'); 
                setTxt('');
            }).then(async() => {
                fsCont?.user.name != data.author.name ? await AXIOS.post(`notif/${data.author._id}` , {
                    content: `${fsCont?.user.name} has just commented on your post!`, 
                    id: id
                }) : console.log(`Aborted. Coz of it's own user.`);   
            })
        }
        else {
            Alert.alert(`No more empty content.`); 
        }
    };

    const deleteThis = async({user , cmtId}: any) => {
        return fsCont?.user._id == user ? await AXIOS.delete(`spec/${id}/delCmt/${cmtId}`).then(() => console.log('Deleted!')).catch(err => console.log(err)) : Alert.alert(`Sorry you can't delete this.`);
    }; 
    
    const sendReply = async ({repId}: any) => {

        if ( reply !== '' || nst !== '') {
            await AXIOS.post(`addCmt/${id}/addReply/${repId}/replies` , {
                author: fsCont?.user._id, 
                comment: reply === '' && nst !== '' ? nst : reply, 
            }).then(() => console.log('Replied!')).then(() => setReply('')).then(() => setNst('')).then(async() => {fsCont?.user.name != data.author.name ? await AXIOS.post(`notif/${data.author._id}` , {content: `${fsCont?.user.name} has just replied to your post!`, id: id}) : console.log(`Aborted. Coz of it's own user.`)}).catch((err) => console.log(err)); 
        }
        else {
            Alert.alert('Reply should not be empty!');  
        }   
    }

    const giveLike = async({cmtId}: any) => {
        await AXIOS.put(`addLike/${cmtId}` , {
            userId: fsCont?.user._id
        }).then((res) => Alert.alert(res.data)).catch(err => console.log(err));
    }; 

    const disLike = async({cmtId}: any) => {
        await AXIOS.put(`disLike/${cmtId}`, {
            userId: fsCont?.user._id, 
        }).then((res) => Alert.alert(res.data)).catch(err => console.log(err)); 
    }

    const Comment = ({comment}: any) => {
        const nestedComments = (comment.reply).map((comment: any) => {
          return Comment({key:comment._id , comment: comment})
        });
      
        return (
            <View style={tw`flex flex-col w-full justify-start ml-4 border-l-2 border-[#FFE8C4]`} key={comment._id}>
            <View style={tw`flex flex-row justify-start mt-5 mb-2 ml-2`}><Text style={tw`text-[#2F9FF8] text-sm`}>{comment.author.name}</Text><Ionicons name="thumbs-up" size={16} color={"black"} style={tw`ml-20`} onPress={() => giveLike({cmtId: comment._id})}/><Text style={tw`ml-2`}>{comment.likeCnt}</Text><Ionicons name="thumbs-down" size={16} color={"black"} style={tw`ml-5`} onPress={() => disLike({cmtId: comment._id})}/><Text style={tw`ml-2`}>{comment.disCnt}</Text></View>
            <Text style={tw`text-[#072D4B] opacity-60 ml-2`}>{comment.comment}</Text>
            <View style={tw`flex flex-row w-2/1 justify-start mt-5 ml-2`}><Text style={tw`text-[#072D4B] opacity-30`}>Posted on {moment(comment.created).format('lll')}</Text><TouchableOpacity onPress={() => deleteThis({user: comment.author._id , cmtId: comment._id})}><View style={tw`flex flex-row items-center ml-5`}><Ionicons name="trash" size={20} color={"#FF8C8C"}/><Text style={tw`underline text-[#FF8C8C] text-sm`}>Delete Comment</Text></View></TouchableOpacity></View>
            <Text style={tw`text-[#2F9FF8] text-sm ml-2`} onPress={() => setRep(comment._id)}>Reply</Text>
            <TextInput placeholder="Reply..." placeholderTextColor={"gray"} autoCapitalize="none" value={nst} onChangeText={text => setNst(text)} style={{display: rep == comment._id ? 'flex' : 'none', marginLeft: 10}} editable={true} keyboardType={'default'} secureTextEntry={false}/>
            <TouchableOpacity onPress={() => sendReply({repId: comment._id})} style={{display: rep == comment._id ? 'flex' : 'none'}}><View style={tw`bg-[#2F9FF8] rounded-md justify-center items-center w-12 h-5 ml-5`}><Text style={tw`text-white`}>Send</Text></View></TouchableOpacity>
            {nestedComments}
            </View> 
        );
      }
    
    return (
        <ScrollView ref={ref}> 
        <View style={tw`bg-white w-full`}> 
            {data !== null ? <View style={tw`flex flex-col w-full p-5 justify-start items-start`}>
                <Text style={tw`text-xl text-[#072D4B] mt-2 mb-4`}>{data.title}</Text>
                <View style={tw`bg-[#2F9FF8] rounded-md ${data.genre ? 'flex' : 'hidden'}`}><Text style={tw`text-white text-sm p-1 font-bold`}>{data.genre}</Text></View>
                <Text style={tw`text-[#072D4B] opacity-60 mt-5 mb-5 text-sm`}>{data.descrip}</Text>
                <Image source={{uri: data.postImg}} style={{width: 327, height: 183}}/>
                <Text style={tw`text-[#072D4B] opacity-60 mt-5`}>{data.txt}</Text>
                <View style={tw`flex flex-col w-full justify-center items-center mt-5`}> 
                    <Text style={tw`text-[#072D4B] opacity-30 text-sm`}>Published {moment(data.createdAt).format('lll')}</Text>
                    <Text style={tw`text-[#072D4B] font-bold text-sm mb-5`}>by {data.author.name}</Text>
                    <Text style={tw`underline text-sm text-[#2F9FF8]`} onPress={() => scrollToTop()}>Back to Top</Text>
                    <Text style={tw`text-sm text-[#2F9FF8] mt-5`} onPress={() => navigation.navigate('Top Stories')}> Back to Home </Text>
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
                <TouchableOpacity onPress={() => disp ? setDisp(false) : setDisp(true)}>
                <View style={tw`flex flex-row w-full mt-5 justify-start items-center`}> 
                   <Text style={tw`underline text-[#2F9FF8]`}>View All Comments</Text>
                   <Text style={tw`text-[#2F9FF8] font-bold`}>({len && len !== null ? len : 0})</Text>
                   <Ionicons name={disp ? 'arrow-up-circle' : 'arrow-down-circle'} size={24} color={"#2F9FF8"} style={tw`ml-2`}/>
                </View>
                </TouchableOpacity>
                <ScrollView horizontal={true}> 
                <View style={tw`flex flex-col w-full justify-start mt-5 ${disp ? 'flex' : 'hidden'}`}> 
                {data.comments && data.comments.length !== 0 ? data.comments.map((x: any , i: number) => {   
                    return<View key={i}><View style={tw`flex flex-row justify-start items-center mt-5 mb-2`}><Text style={tw`text-[#2F9FF8] text-sm`}>{x.author.name}</Text><Ionicons name="thumbs-up" size={16} color={"black"} style={tw`ml-20`} onPress={() => giveLike({cmtId: x._id})}/><Text style={tw`ml-2`}>{x.likeCnt}</Text><Ionicons name="thumbs-down" size={16} color={"black"} style={tw`ml-5`} onPress={() => disLike({cmtId: x._id})}/><Text style={tw`ml-2`}>{x.disCnt}</Text></View>
                    <Text style={tw`text-[#072D4B] opacity-60`}>{x.comment}</Text>
                    <View style={tw`flex flex-row w-full justify-start items-center`}><Text style={tw`text-[#072D4B] opacity-30`}>Posted on {moment(x.created).format('lll')}</Text><TouchableOpacity onPress={() => deleteThis({user: x.author._id , cmtId: x._id})}><View style={tw`flex flex-row items-center ml-5 mb-1`}><Ionicons name="trash" size={20} color={"#FF8C8C"}/><Text style={tw`underline text-[#FF8C8C] text-sm`}>Delete Comment</Text></View></TouchableOpacity></View>
                    <View style={tw`flex flex-row w-full justify-start items-center`}>
                    <Text style={tw`text-[#2F9FF8] text-sm`} onPress={() => setTog(i)}>Reply</Text>
                    <TextInput placeholder="Reply..." placeholderTextColor={"gray"} autoCapitalize="none" value={reply} onChangeText={text => setReply(text)} style={{display: tog == i ? 'flex' : 'none', marginLeft: 10}}/>
                    <TouchableOpacity onPress={() => sendReply({repId: x._id})} style={{display: tog == i ? 'flex' : 'none'}}><View style={tw`bg-[#2F9FF8] rounded-md justify-center items-center w-12 h-5 ml-5`}><Text style={tw`text-white`}>Send</Text></View></TouchableOpacity>
                    </View>
                    <View style={tw`flex flex-col w-full`}>
                            {x.reply != null ? x.reply.map((x: any) => {
                            return Comment({key: x._id, comment:x}) 
                            }) : <View><Text>Loading...</Text></View>}
                    </View>
                    </View>
                }):<View><Text>Loading...</Text></View>}
                </View>
                </ScrollView>
                </View>
                <View style={tw`flex flex-col w-full justify-center items-center`}>
            <View style={tw`flex flex-row w-full justify-start items-center ml-10 mt-10`}>
            <Text style={tw`text-[#072D4B] text-sm font-bold`}>More News for you</Text>
            <View style={{flex: 1 , height: 1, backgroundColor: 'black' , marginLeft: 20 , marginHorizontal: 40}}></View> 
            </View>
            {random !== null ? random.map((x: any , i: number) => {
                 return <TouchableOpacity key={i} onPress={() => navigation.navigate('Spec' , {id: x._id})} style={tw`border-b-2 border-[#2F9FF8] m-5`}>    
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
            }) : <View><Text>Loading...</Text></View>}
            
            </View>
            </View>:<View><Text>Loading...</Text></View>}
        </View>
        </ScrollView>
    )
}; 

     
  

export default Specific; 