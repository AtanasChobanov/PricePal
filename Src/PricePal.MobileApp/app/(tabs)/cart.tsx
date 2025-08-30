import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
const ItemCart = ({ productName, brand, price, photo }: any) =>{
  return(
<LinearGradient
     style={styles.products}
  colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
  start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 0 }}
  className="w-full h-[150px] rounded-[15px] mb-4"
>
  <View className="flex-row items-center p-2 h-full rounded-[15px]">
    <Image
      className="w-[120px] h-full rounded-[15px]"
      source={photo}
    />
   {/* Product details */}
    <View className="ml-4 flex-1 justify-between h-full py-2">
      <View>
        <Text className="text-lg font-semibold">{brand}</Text>
        <Text className="text-lg">{productName}</Text>
        <Text className="text-lg font-bold">{price}</Text>
      </View>
      {/* Quantity buttons */}
      <View className="flex-row items-center mt-2 overflow-hidden">
  <BlurView intensity={30} tint="light" className="rounded-full overflow-hidden"      experimentalBlurMethod="dimezisBlurView">
    <TouchableHighlight
 
      underlayColor="transparent"
      className="w-8 h-8 flex items-center justify-center"
    >
      <Text className="text-xl font-bold">-</Text>
    </TouchableHighlight>
  </BlurView>
  <Text className="mx-4 text-lg font-semibold">0</Text>
  <BlurView intensity={30} tint="light" className="rounded-full overflow-hidden"      experimentalBlurMethod="dimezisBlurView">
    <TouchableHighlight
      underlayColor="transparent"
      className="w-8 h-8 flex items-center justify-center"
    >
      <Text className="text-xl font-bold">+</Text>
    </TouchableHighlight>
  </BlurView>
      </View>
    </View>
  </View>
</LinearGradient>
  )
}




const Cart = () => {
   const [productNumber, setProductNumber] = useState(0);

  const addButton = () => {
    setProductNumber(prev => prev + 1);
  };
    const removeButton = () => {
    setProductNumber(prev => prev - 1);
  };
  return (

 <ImageBackground
      source={require("../../assets/images/background2.png")}
      style={styles.backgroundImage}>
        <View style={{ flex: 1 }}>
      <ScrollView
          contentContainerStyle={{ padding: 4, paddingBottom: 235 }}
    showsVerticalScrollIndicator={false}
        className=" pt-[55px] p-2"
        showsHorizontalScrollIndicator={false}>
       {/* Title */}
       <View className="items-center"> 
        <Text className="text-4xl p-3 pb-6 font-bold">Количка</Text> 
       </View>
<LinearGradient
     style={styles.products}
  colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
  start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 0 }}
  className="w-full h-[150px] rounded-[15px] mb-4"
>
  <View className="flex-row items-center p-2 h-full rounded-[15px]">
    <Image
      className="w-[120px] h-full rounded-[15px]"
      source={require("../../assets/images/hlqb.jpg")}
    />
   {/* Product details */}
    <View className="ml-4 flex-1 justify-between h-full py-2">
      <View>
        <Text className="text-lg font-semibold">Ресенски</Text>
        <Text className="text-lg">Хляб</Text>
        <Text className="text-lg font-bold">$5.99</Text>
      </View>
      {/* Quantity buttons */}
      <View className="flex-row items-center mt-2 overflow-hidden">
  <BlurView intensity={30} tint="light" className="rounded-full overflow-hidden"      experimentalBlurMethod="dimezisBlurView">
    <TouchableHighlight
      onPress={removeButton}
      underlayColor="transparent"
      className="w-8 h-8 flex items-center justify-center"
    >
      <Text className="text-xl font-bold">-</Text>
    </TouchableHighlight>
  </BlurView>
  <Text className="mx-4 text-lg font-semibold">{productNumber}</Text>
  <BlurView intensity={30} tint="light" className="rounded-full overflow-hidden"      experimentalBlurMethod="dimezisBlurView">
    <TouchableHighlight
      onPress={addButton}
      underlayColor="transparent"
      className="w-8 h-8 flex items-center justify-center"
    >
      <Text className="text-xl font-bold">+</Text>
    </TouchableHighlight>
  </BlurView>
      </View>
    </View>
  </View>
</LinearGradient>
<ItemCart></ItemCart>
<ItemCart></ItemCart>



          <LinearGradient
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.products}
            className="w-full h-[170px] rounded-[20px] mb-4 p-5 shadow-lg"
          
          >
          <View className="flex-1 justify-between">
            <View className="items-center space-y-2">
              <Text className="text-xl font-semibold">Обобщение на покупките</Text>
              <Text className="text-xl font-semibold text-red-600">Спестяваш $50</Text>
            </View>

            <View className="border-t border-white/50 mt-4 pt-3 space-y-1">
              <Text className="text-base text-gray-700">Нормална цена: $100</Text>
              <Text className="text-lg">Обща цена:</Text>
              <Text className="text-2xl font-bold text-gray-900">$50,99</Text>
            </View>
          </View>
        </LinearGradient>
        <View className='m-[40px]'></View>
      </ScrollView>
      {/* Footer for price */}
<BlurView
  intensity={20}
  tint="light"
  experimentalBlurMethod="dimezisBlurView"
  className="
    absolute 
    bottom-[120px] 
    rounded-[15px] 
    p-5 
    overflow-hidden 
    border border-white
    shadow-lg
    left-0 right-0  mx-3
    
  "
>
  <View className=' flex-row 
    justify-between   items-center  '>
  <Text className="text-lg font-bold text-black">
    Обща цена
  </Text>
  <Text className="text-lg font-semibold text-black">
    $30.00
  </Text>
  </View>
  <BlurView
  intensity={55}
  tint="systemThickMaterialLight"
  experimentalBlurMethod="dimezisBlurView"
className='items-center bg-gray-200 h-[50px] rounded-[10px] m-5 justify-center  shadow-lg overflow-hidden border border-white '
>

  <TouchableHighlight className='justify-center' >
    <Text className='font-bold'>Продължи</Text>
    </TouchableHighlight>
 </BlurView>
</BlurView>

      </View>
      </ImageBackground>  

  )
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
      products: {
     borderRadius: 15,
  },
});
export default Cart