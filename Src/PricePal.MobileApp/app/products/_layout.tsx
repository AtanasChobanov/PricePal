import { Stack } from 'expo-router';
import React from 'react';

export default function ProductLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackTitle: 'Назад',
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen 
        name="[productID]" 
        options={{
          title: 'Продукт',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}