import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { useRef } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const Search = () => {
  const inputRef = useRef<TextInput>(null);
  useFocusEffect(
    React.useCallback(() => {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);

      return () => clearTimeout(timeout);
    }, [])
  );

  return (

    <ImageBackground
      source={require("../../assets/images/background2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView
        className="pt-[80px]"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 2 }}
      >
        {/* Title */}
        <View className="flex-row justify-between mx-3 items-center gap-2">
          <BlurView
            intensity={50}
            tint="light"
            experimentalBlurMethod="dimezisBlurView"
            className="items-center flex-row justify-start px-3 bg-gray-200 rounded-[10px] overflow-hidden border border-white"
          >
            <Image
              className="w-5 h-5 mr-2"
              source={require('../../assets/icons/search.png')}
            />
            <TextInput
              ref={inputRef}
              placeholder="Какво Търсиш"
              onChangeText={() => {}}
              placeholderTextColor="#000000"
              className="w-3/4"
            />
          </BlurView>
          <Text className="underline">Откажи</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  categories: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  button: {
    alignItems: 'center',
  },
});

export default Search;