import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, FlatList, View, ActivityIndicator, Image } from 'react-native';

export default function App() {

  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = () => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(response => {
      if(!response.ok)
        throw new Error("Error in fetch: " + response.statusText);

        return response.json();
    })
    .then(data => {
      setRecipes(data.meals);
      setIngredient('');
      setLoading(false)
    })
    .catch(err => console.error(err))
  }

  if (loading) {
    return(
      <View style = {styles.container}>
        <ActivityIndicator size = "large" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style = {{ flex: 1, marginTop: 50 }}>
          <TextInput
            placeholder = 'Type ingredient'
            value = {ingredient}
            onChangeText = {text => setIngredient(text)}
          />
          <Button title = "Find" onPress = {fetchRecipes} />
        </View>

        <View style = {{flex:6}}>
          <FlatList
            data = {recipes}
            renderItem={({item}) => 
              <View style = {{marginLeft: 10, marginBottom: 7}}>
                <Text style = {{fontSize : 15}}>{item.strMeal}</Text>
                <Image 
                source = {{uri: item.strMealThumb}}
                style={styles.recipeImage} 
                />
                <View style = {styles.separator}/>
              </View>
            }
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  recipeImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },

  separator: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,

  },
});
