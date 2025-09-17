import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../globals.css";

export default function RootLayout() {
  return <GestureHandlerRootView style={styles.container}><Stack>
    <Stack.Screen
    name="(tabs)"
    options={{headerShown:false}}/>
     <Stack.Screen
    name="(profile)"
    options={{headerShown:false}}/>
         <Stack.Screen
    name="products"
    options={{headerShown:false}}/>
             <Stack.Screen
    name="subcategories"
    options={{headerShown:false}}/>
             <Stack.Screen
    name="productsCategories"
    options={{headerShown:false}}/>
  </Stack></GestureHandlerRootView>;
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});