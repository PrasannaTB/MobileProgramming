import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  
  const[num1, setNum1] = useState("");
  const[num2, setNum2] = useState("");
  const[result, setResult] = useState("");

  const handleSum = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum);
  };

  const handleSubastraction = () => {
    const substraction = parseFloat(num1) - parseFloat(num2);
    setResult(substraction);
  };


  return (
    <>
      <View style={styles.container1}>
        <Text>Result: {result}</Text>
        <TextInput
          style = {{height: 50, width: 200, borderColor: 'gray', borderWidth: 1}}
          placeholder = "Enter number 1"
          inputMode = "numeric"
          onChangeText={(text) => setNum1(text)}
        />

        <TextInput
          style = {{height: 50, width: 200, borderColor: 'gray', borderWidth: 1}}
          placeholder = "Enter number 2"
          inputMode = "numeric"
          onChangeText={(text) => setNum2(text)}
        />

        <View style = {styles.container2}>
          <Button title = "+" onPress = {handleSum} />
          <Button title = "-" onPress = {handleSubastraction} />
        </View>

        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  }
});
