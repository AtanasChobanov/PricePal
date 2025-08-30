import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
const ProductBox = ({ productName, brand, price, photo }: any) =>{
  return(
<View className="flex-row gap-x-4">
  <View>
    <View>
      <Image
        source={{ uri: photo }}
        className="size-[180px] rounded-t-2xl"/>
    </View>
    <LinearGradient
      style={styles.products}
      className="p-5 rounded-b-xl"
      colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
      start={{ x: 0, y: 1 }}>
      <View className="w-full">
        <View className="items-center mb-2">
          <Text className="text-xl">{productName} {brand}</Text>
        </View>
        <View className="items-start">
          <Text className="text-base">От</Text>
          <Text className="font-bold text-xl">€{price}</Text>
        </View>
      </View>
    </LinearGradient>
  </View>
</View>
  )
}
export default function Index() {
  return (
      <ImageBackground
      source={require("../../assets/images/background2.png")}
      style={styles.backgroundImage}
    >
    <ScrollView className="flex-1 pt-[55px]" showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View className="items-center">
  <Text className="text-4xl p-3 font-bold">Тази седмица</Text>
  <Text className="text-2xl p-3 font-semibold">Топ категорий</Text>
      </View>
    

      {/* Top Categories row */}
      <ScrollView
      className="pb-5"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}>
        <View className="flex-row gap-x-4">
          <LinearGradient 
          className=" p-5 rounded-xl items-center w-36 h-[50px] justify-center"
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{x:0,y:1}}
        style={styles.categories}>
            <Text  className="text-xl text-black">Месо</Text>
          </LinearGradient>
           <LinearGradient 
          className=" p-5 rounded-xl items-center w-36 h-[50px] justify-center"
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{x:0,y:1}}
        style={styles.categories}>
            <Text  className="text-xl text-black">Зеленчуци</Text>
          </LinearGradient>
           <LinearGradient 
          className=" p-5 rounded-xl items-center w-36 h-[50px] justify-center"
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{x:0,y:1}}
        style={styles.categories}>
            <Text  className="text-xl text-black">Плодове</Text>
          </LinearGradient>
            <LinearGradient 
          className=" p-5 rounded-xl items-center w-36 h-[50px] justify-center"
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{x:0,y:1}}
        style={styles.categories}>
            <Text  className="text-xl text-black">Хляб</Text>
          </LinearGradient>
            <LinearGradient 
          className=" p-5 rounded-xl items-center w-36 h-[50px] justify-center"
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{x:0,y:1}}
        style={styles.categories}>
            <Text  className="text-xl text-black">Месо</Text>
          </LinearGradient>
        </View>

        {/* Our choice */}
      </ScrollView>
            <View className="items-center">
              <Text className="text-2xl pb-5 pt-5 font-semibold">Нашия избор</Text>
            </View>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:16}}
      >
      <View className="flex-row gap-x-4">
       <View className="flex-row gap-x-4">
  <View>
    <View>
      <Image
        source={require("../../assets/images/hlqb.jpg")}
        className="size-[180px] rounded-t-2xl"/>
    </View>
    <LinearGradient
      style={styles.products}
      className="p-5 rounded-b-xl"
      colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
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
    <LinearGradient
      style={styles.products}
      className="p-5 rounded-b-xl"
      colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
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
    <LinearGradient
      style={styles.products}
      className="p-5 rounded-b-xl"
      colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
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

        {/* Top products */}
        <View className="items-center">
              <Text className="text-2xl pb-5 pt-10 font-semibold">Топ продутки</Text>
            </View>     
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:16}}
      >
      <View className="flex-row gap-x-4">

        <View className="flex-row gap-x-4">
  <View>
    <View>
      <Image
        source={require("../../assets/images/hlqb.jpg")}
        className="size-[180px] rounded-t-2xl"/>
    </View>
    <LinearGradient
      style={styles.products}
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
    <LinearGradient
      style={styles.products}
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
    <LinearGradient
      style={styles.products}
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
          {/* Most selled items */}
             <View className="items-center">
              <Text className="text-2xl pb-5 pt-10 font-semibold">Най-купувани продукти</Text>
            </View>      
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:16}}
      >
      <View className="flex-row gap-x-4">
       <View className="flex-row gap-x-4">
  <View>
    <View>
      <Image
        source={require("../../assets/images/hlqb.jpg")}
        className="size-[180px] rounded-t-2xl"/>
    </View>
    <LinearGradient
      style={styles.products}
      className="p-5 rounded-b-xl"
       colors={['rgba(221,214,243,1)', 'rgba(196,181,253,1)']}
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
    <LinearGradient
      style={styles.products}
      className="p-5 rounded-b-xl"
       colors={['rgba(221,214,243,1)', 'rgba(196,181,253,1)']}
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
    <LinearGradient
      style={styles.products}
      className="p-5 rounded-b-xl"
       colors={['rgba(221,214,243,1)', 'rgba(196,181,253,1)']}
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
          <View className='mb-[180px]'></View>
  </ScrollView>
  </ImageBackground>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  categories: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
    products: {
     borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
    backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
});
