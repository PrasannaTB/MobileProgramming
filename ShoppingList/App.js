import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View , TextInput, Button, FlatList} from 'react-native';

export default function App() {

  const[item, setItem] = useState("");
  const[shoppingList, setShoppingList] = useState([]);

  const handleAdd = () => {
    setShoppingList((prevHistory) => [...prevHistory, item])
    setItem("");
  }

  const handleClear = () => {
    setShoppingList([]);
    setItem("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style = {{height: 50, width: 200, borderColor: 'gray', borderWidth: 1}}
        value = {item}
        placeholder='Enter an item'
        onChangeText = {(text) => setItem(text)}
      />
      <View style = {styles.container1}>
        <Button title = "Add" onPress={handleAdd}/>
        <Button title = "Clear" onPress={handleClear}/>
      </View>

      <Text style = {styles.shoppingText}>Shopping List</Text>

      <View>
        <FlatList
          data = {shoppingList}
          renderItem = {({item}) =>
            <View style = {styles.listItem}>
              <Text style = {{fontSize: 14}}>{item}</Text>
              </View>
          }
        
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 170,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 50,
  },

  shoppingText: {
    color: 'blue',
    fontSize: 15,
    fontWeight: 'bold'
  },

  listItem: {
    padding: 5,
    width: 3000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
