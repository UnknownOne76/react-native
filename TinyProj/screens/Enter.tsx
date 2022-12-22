import { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native"
import { launchImageLibrary } from "react-native-image-picker";
import { check, PERMISSIONS, request } from "react-native-permissions";
import Contacts from 'react-native-contacts';
import tw from 'twrnc'; 

export const Entertainment = () => {

    const [img , setImg] = useState<any>(null); 
    const [users, setUsers] = useState<any>(null);
    const [con , setCon] = useState<boolean>(false);  
    
    useEffect(() => {
       const handleContact = async() => {
          const res = await check(PERMISSIONS.IOS.CONTACTS); 
          console.log(res); 
       }
       handleContact(); 
    }, []); 

    const Contact = ({contact}: any) => {
        return (
          <View style={styles.contactCon}>
            <View style={styles.imgCon}>
              <View style={styles.placeholder}>
                <Text style={styles.txt}>{contact?.givenName[0]}</Text>
              </View>
            </View>
            <View style={styles.contactDat}>
              <Text style={styles.name}>
                {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
                {contact?.familyName}
              </Text>
              <Text style={styles.phoneNumber}>
                {contact?.phoneNumbers[0]?.number}
              </Text>
            </View>
          </View>
        );
      };

      const keyExtractor = (item: any, idx: any) => {
        return item?.recordID?.toString() || idx.toString();
      };
      const renderItem = ({item}: any) => {
        return <Contact contact={item} />;
      };

    const requestContactPermission = async() => {
        try {
          let contactResult;
          contactResult = await request(PERMISSIONS.IOS.CONTACTS);
          console.log(contactResult, " cameraResult")
          Contacts.getAll().then(contacts => {
             setUsers(contacts);  
             setCon(true); 
         });
        } catch (error) {
          console.log(error);
          throw error;
        }
      };

    return (
        <> 
        <View style={tw`flex flex-col w-full h-full justify-center items-center ${con ? 'hidden' : 'flex'}`}>
            <Text style={tw`${con ? 'hidden' : 'flex'}`}>Entertainment</Text>
            <View style={tw`${con ? 'hidden' : 'flex'}`}> 
            <Button title="Open Contacts" onPress={() => requestContactPermission()}/>
            <Button title="Open Lib" onPress={() => launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
            }, (res) => {
                res.assets?.map((x) => setImg(x.uri)); 
            })}/>
 
            <Image source={{uri: img}} style={{width: 100 , height: 100}}/>
            </View>
        </View>
        <FlatList data={users} renderItem={renderItem} keyExtractor={keyExtractor} style={styles.list}/>
        </>
    )
}; 

export default Entertainment; 

const styles = StyleSheet.create({
    list: {
        flex: 1,
      },
    contactCon: {
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: '#d9d9d9',
    },
    imgCon: {},
    placeholder: {
      width: 55,
      height: 55,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: '#d9d9d9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactDat: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 5,
    },
    txt: {
      fontSize: 18,
    },
    name: {
      fontSize: 16,
    },
    phoneNumber: {
      color: '#888',
    },
  });