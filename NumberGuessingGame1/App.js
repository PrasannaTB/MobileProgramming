import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';

export default function App() {

  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1

  const[secretNum, setSecretNum] = useState(generateRandomNumber());
  const[userGuess, setUserGuess] = useState("");
  const[message, setMessage] = useState("");
  const[count, setCount] = useState(1);

  const handleGuess = () => {
    const guess = parseInt(userGuess);
    setCount(count + 1);

    if (guess > secretNum) {
      setMessage(`Your guess ${guess} is too high`)
    }
    else if  (guess < secretNum) {
      setMessage(`Your guess ${guess} is too low`)
    }
    else {
      Alert.alert(`You guessed the number in ${count} guesses`)
      setMessage('')
      setSecretNum(generateRandomNumber());
      setCount(1);
      setUserGuess('');
    }

    setUserGuess('');

  }

  return (
    <View style={styles.container}>
      <Text>Guess a number between 1-100</Text>
      <Text>{message}</Text>
      <TextInput
        style = {{height: 50, width: 200, borderColor: 'black', borderWidth: 2}}
        placeholder = "Enter a number"
        inputMode = 'numeric'
        value = {userGuess}
        onChangeText = {(text) => setUserGuess(text)}
      />
      <Button title = "Make Guess" onPress = {handleGuess}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
