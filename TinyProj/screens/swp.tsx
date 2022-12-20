import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const lists = [
  { id: '1', text: 'Eating' },
  { id: '2', text: 'Watching' },
  { id: '3', text: 'Sleeping' },
];
const Separator = () => <View style={styles.itemSeparator} />;

const LeftSwipeActions = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}>
      <Text style={{color: 'red',paddingHorizontal: 10,fontWeight: '600',paddingVertical: 20}}>
        Delete
      </Text>
    </View>
  );
};
const rightSwipeActions = () => {
  return (<View style={{backgroundColor: 'black',justifyContent: 'center',alignItems: 'flex-end'}}>
      <Text style={{color: 'green',paddingHorizontal: 10,fontWeight: '600',paddingVertical: 20,}}>
        Archive
      </Text>
    </View>
  );
};

const ListItem = ({ text }: any) => (
  <Swipeable renderLeftActions={LeftSwipeActions} renderRightActions={rightSwipeActions}>
    <View style={{paddingHorizontal: 30, paddingVertical: 20, backgroundColor: 'white'}}>
      <Text style={{ fontSize: 24 }}>
        {text}
      </Text>
    </View>
  </Swipeable>
);

const SwipeGesture = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>
          Example of Swiping.
        </Text>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItem {...item} />}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: 'green',
  },
});
export default SwipeGesture;