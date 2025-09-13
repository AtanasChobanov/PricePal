import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
const profile = () => {
  return (
    <ImageBackground
           source={require("../../assets/images/background2.png")}
           style={styles.backgroundImage}>
           <ScrollView
             className=" "
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{ paddingHorizontal: 2 }}>
             {/* Title */}
             <View className='items-center'>
              <View>
                <Image className='w-[65px] h-[65px]' source={require("../../assets/icons/profile-pic.png")} />
              </View>
              <View><Text className='font-bold text-3xl py-5'>Калоян Николов</Text></View>
              </View>
             <View className='flex-row justify-between mx-3  items-center gap-2'>
                <BlurView
                intensity={50}
                tint="light"
                experimentalBlurMethod="dimezisBlurView"
                className="items-center flex-row justify-start px-3 bg-gray-200 rounded-[10px] overflow-hidden border border-white">
                    <Image className='w-5 h-5 mr-2' source={require('../../assets/icons/search.png')} />
                    <TextInput
                    onPress={()=> {}}
                    placeholder="Какво Търсиш"
                    value=''
                    onChangeText={()=>{}}
                    placeholderTextColor={"#000000"}
                    className='w-3/4'/>
                 </BlurView>
                <Text className='underline'>Откажи</Text>
             </View>



            <View className='flex-row flex-wrap gap-4 justify-start px-2 pt-5'>
                <View className="flex-row gap-x-4">
              <View>
                <View>
                  <Image
                    source={require("../../assets/images/hlqb.jpg")}
                    className="size-[180px] rounded-t-2xl"/>
                </View>
                <LinearGradient  style={styles.products}
      className="p-5 rounded-b-xl"
        colors={['rgba(255,218,185,1)', 'rgba(255,182,193,1)']}
      start={{ x: 0, y: 1 }}>
                    
                  <View className="w-full">
                    <View className="items-center mb-2">
                      <Text className="text-xl">Хляб Ресенски</Text>
                    </View>
                    <View className="items-start">
                      <Text className="text-base">От</Text>
                      <Text className="font-bold text-xl">€5.99</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>

              <View className="flex-row gap-x-4">
              <View>
                <View>
                  <Image
                    source={require("../../assets/images/hlqb.jpg")}
                    className="size-[180px] rounded-t-2xl"/>
                </View>
                <LinearGradient  style={styles.products}
      className="p-5 rounded-b-xl"
        colors={['rgba(255,218,185,1)', 'rgba(255,182,193,1)']}
      start={{ x: 0, y: 1 }}>
                    
                  <View className="w-full">
                    <View className="items-center mb-2">
                      <Text className="text-xl">Хляб Ресенски</Text>
                    </View>
                    <View className="items-start">
                      <Text className="text-base">От</Text>
                      <Text className="font-bold text-xl">€5.99</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
              
            </View>
              <View className="flex-row gap-x-4">
              <View>
                <View>
                  <Image
                    source={require("../../assets/images/hlqb.jpg")}
                    className="size-[180px] rounded-t-2xl"/>
                </View>
                <LinearGradient  style={styles.products}
      className="p-5 rounded-b-xl"
        colors={['rgba(255,218,185,1)', 'rgba(255,182,193,1)']}
      start={{ x: 0, y: 1 }}>
                    
                  <View className="w-full">
                    <View className="items-center mb-2">
                      <Text className="text-xl">Хляб Ресенски</Text>
                    </View>
                    <View className="items-start">
                      <Text className="text-base">От</Text>
                      <Text className="font-bold text-xl">€5.99</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>

              <View className="flex-row gap-x-4">
              <View>
                <View>
                  <Image
                    source={require("../../assets/images/hlqb.jpg")}
                    className="size-[180px] rounded-t-2xl"/>
                </View>
                <LinearGradient  style={styles.products}
      className="p-5 rounded-b-xl"
        colors={['rgba(255,218,185,1)', 'rgba(255,182,193,1)']}
      start={{ x: 0, y: 1 }}>
                    
                  <View className="w-full">
                    <View className="items-center mb-2">
                      <Text className="text-xl">Хляб Ресенски</Text>
                    </View>
                    <View className="items-start">
                      <Text className="text-base">От</Text>
                      <Text className="font-bold text-xl">€5.99</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
            </View>

            
          
             </ScrollView>
             </ImageBackground>
  )
}
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
      products: {
     borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default profile