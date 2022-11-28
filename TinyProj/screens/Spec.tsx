import { Text, View , Image } from "react-native"
import AXIOS from "../api";
import tw from 'twrnc'; 
import { useEffect , useRef, useState } from 'react'; 
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

export const Specific = ({route}: any) => {
    const { id } = route.params;
    const ref = useRef<any | null>(null);

    const scrollToTop = () => {
        ref.current?.scrollTo({
          y: 0,
          animated: true,
        });
      };

    const [data , setData] = useState<any>(); 

    useEffect(() => {
        AXIOS.get(`spec/${id}`).then((res) => {
            setData(res.data);  
        })
    }, []);

    
    return (
        <ScrollView ref={ref}> 
        <View style={tw`bg-white w-full`}> 
            {data !== undefined ? <View style={tw`flex flex-col w-full p-5 justify-start items-start`}>
                <Text style={tw`text-xl text-[#072D4B] mt-2 mb-4`}>{data.title}</Text>
                <View style={tw`bg-[#2F9FF8] opacity-20 rounded-md`}><Text style={tw`text-blue-500 text-sm p-1 font-bold`}>{data.type}</Text></View>
                <Text style={tw`text-[#072D4B] opacity-60 mt-5 mb-5 text-sm`}>{data.descrip}</Text>
                <Image source={{uri: data.postImg}} style={{width: 327, height: 183}}/>
                <Text style={tw`text-[#072D4B] opacity-60 mt-5`}>{data.txt}</Text>
                <View style={tw`flex flex-col w-full justify-center items-center mt-5`}> 
                    <Text style={tw`text-[#072D4B] opacity-30 text-sm`}>Published {moment(data.createdAt).format('lll')}</Text>
                    <Text style={tw`text-[#072D4B] font-bold text-sm mb-5`}>by User</Text>
                    <Text style={tw`underline text-sm text-[#2F9FF8]`} onPress={() => scrollToTop()}>Back to Top</Text>
                </View>
            </View>: <View><Text>Loading...</Text></View>}
        </View>
        </ScrollView>
    )
}; 

export default Specific; 