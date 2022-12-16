import React, { useEffect, useRef } from "react"
import { Animated, Button, Easing, ImageBackground, Text, useWindowDimensions, View } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler";
import tw from 'twrnc'; 

export const AroundWorld = () => {
     
    const randomClr = useRef(new Animated.Value(0)).current;
    const spinValue = useRef(new Animated.Value(0)).current;

    const Movies = [
        {
            id: '1',
            name: "Spider-Man", 
            url: 'https://c8.alamy.com/comp/F6KTFD/release-date-may-4-2007-movie-title-spider-man-3-studio-columbia-pictures-F6KTFD.jpg'
        },
        {
            id: '2', 
            name: 'Iron-Man',
            url: 'https://www.pixelstalk.net/wp-content/uploads/2016/09/Movie-Iron-Man-HD-Photos-Download.jpg'
        }, 
        { 
            id: '3', 
            name: 'Burger', 
            url: 'https://img.freepik.com/premium-photo/delicious-grilled-burgers_62847-16.jpg?w=2000'
        },
        {
            id: '4', 
            name: 'Burrito', 
            url: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?cs=srgb&dl=pexels-pixabay-461198.jpg&fm=jpg'
        },
        {
            id: '5',
            name: 'Random Photo', 
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBR18chqux6jhq-SAfpTCrkpsBbgnZEb1Nu86CGXc0&s'
        }
    ]
        Animated.timing(
         spinValue,
         {
         toValue: 1,
         duration: 3000,
         easing: Easing.linear,
         useNativeDriver: true 
       }).start()
       
         const initSpin = () => {
             Animated.timing(randomClr, {
               toValue: 100,
               duration: 1000,
               useNativeDriver: false,
             }).start();
        }

        const initRes = () => {
            Animated.timing(randomClr, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
              }).start();
        }

    const MovieItems = ({name , url, index , scrollX}: any) => {
      const dimensions = useWindowDimensions();
      const {width} = dimensions;
      const position = Animated.subtract(index * width, scrollX);
      const scale = position.interpolate({
        inputRange: [width * -1, 0, width],
        outputRange: [0, 1, 0],
      });
      const rotate = position.interpolate({
        inputRange: [width * -1, 0, width],
        outputRange: ['90deg', '0deg', '360deg'],
      }); 

      return (
            <View style={tw`flex flex-col justify-start items-center w-100`}>
                <ImageBackground source={{uri: url}} style={tw`flex justify-center items-center w-72 h-72`} blurRadius={40}>
                   <Animated.Image source={{uri: url}} style={{flex: 1 , justifyContent: 'center' , width: 144 , borderRadius: 5 , transform: [{scale: scale} , {rotate: rotate}]}}/>
                   <Text style={tw`text-green-500 text-sm`}>Data Name:{name}</Text>
                </ImageBackground>
            </View>
        )
        }

    const renderItems = ({item , index}: any) => {
       return ( 
          <MovieItems name={item.name} url={item.url} index={index} scrollX={spinValue}/>
       )
    }; 

        // <View style={tw`flex flex-col w-full justify-center items-center bg-white`}>
        // <View style={tw`flex justify-center items-center mt-30 mb-10 w-full`}>
        // <FlatList data={Movies} renderItem={renderItems} keyExtractor={key => key.id} scrollEnabled pagingEnabled showsHorizontalScrollIndicator={false} horizontal onScroll={e => spinValue.setValue(e.nativeEvent.contentOffset.x)}/>
        // </View>
        // </View>

    return (
        <View style={tw`w-full h-full justify-center items-center`}> 
        <Button title="Rotate" onPress={() => initSpin()}/>
        <Button title="Back" onPress={() => initRes()}/>
        <Animated.View style={[tw`w-52 h-52 rounded-lg mt-10` , {backgroundColor: randomClr.interpolate({inputRange: [0,50,100] , outputRange:[`#${Math.floor(Math.random()*16777215).toString(16)}` , `#${Math.floor(Math.random()*16777215).toString(16)}`, `#${Math.floor(Math.random()*16777215).toString(16)}`]}) ,transform: [{translateX: randomClr} , {rotate: randomClr.interpolate({inputRange: [0 , 100] , outputRange:['0deg' , '360deg']})}] , opacity: randomClr.interpolate({inputRange:[0,50,100] , outputRange:[0,1,0]})}]}/>
        </View>
    )
}; 

export default AroundWorld; 