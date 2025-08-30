import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen 
        name="profile" 
        options={{ title: "My Profile" }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ title: "Settings" }} 
      />
    </Stack>
  );
};

export default ProfileLayout;