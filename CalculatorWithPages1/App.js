import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CalculatorScreen({ navigation }) {
  
  const[num1, setNum1] = useState("");
  const[num2, setNum2] = useState("");
  const[result, setResult] = useState("");
  const[history, setHistory] = useState([]);

  const handleSum = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    const calculation = `${num1} + ${num2} = ${sum} `;
    setHistory((prevHistory) => [...prevHistory, calculation])
    setResult(sum.toString());
    setNum1("")
    setNum2("")
  };

  const handleSubstraction = () => {
    const substraction = parseFloat(num1) - parseFloat(num2);
    const calculation = `${num1} - ${num2} = ${substraction}`;
    setHistory((prevHistory) => [...prevHistory, calculation]);
    setResult(substraction.toString());
    setNum1("")
    setNum2("")
  };
 
  return (
    <>
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <TextInput
          style = {{height: 50, width: 200, borderColor: 'gray', borderWidth: 1}}
          value = {num1}
          placeholder = "Enter number 1"
          inputMode = "numeric"
          onChangeText={(text) => setNum1(text)}
        />

        <TextInput
          style = {{height: 50, width: 200, borderColor: 'gray', borderWidth: 1}}
          value = {num2}
          placeholder = "Enter number 2"
          inputMode = "numeric"
          onChangeText={(text) => setNum2(text)}
        />

        <View style = {styles.container2}>
          <Button title = "+" onPress = {handleSum} />
          <Button title = "-" onPress = {handleSubstraction} />
        </View>

        <Button
          title = "History"
          onPress = {() => navigation.navigate('History', {history})}
        />

      </View>
    </>
  );
}

function HistoryScreen({route}) {
  const {history} = route.params;
  return(
    <View style = {styles.container1}>
      <Text style = {styles.historyText}>History</Text>

      <View>
        <FlatList
          data = {history}
          renderItem = {({item}) =>
            <View style = {styles.listItem}>
              <Text style = {{fontSize: 14}}>{item}</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Calculator" component = {CalculatorScreen} />
        <Stack.Screen name = "History" component = {HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container1: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
  },

  listItem: {
    padding: 6,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  historyText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
