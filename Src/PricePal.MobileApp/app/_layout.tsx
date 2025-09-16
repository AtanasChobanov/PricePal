import { Stack } from "expo-router";
import "../globals.css";
export default function RootLayout() {
  return <Stack>
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
  </Stack>;
  
}
