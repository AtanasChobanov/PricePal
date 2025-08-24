import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <ScrollView className="flex-1 pt-5" showsVerticalScrollIndicator={false}>
    
 
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
      </ScrollView>
            <View className="items-center">
  <Text className="text-2xl p-3 font-semibold">Топ продутки</Text>
</View>



      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:16}}
      >
      <View className="flex-row gap-x-4">

     
        <View>
          <View>
            <Image 
        source={require("../../assets/images/hlqb.jpg")} 
        className="size-[180px] rounded-t-2xl"
      />
          </View>
           <LinearGradient 
             style={styles.products}
          className=" p-5  items-center justify-center rounded-b-xl"
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{x:0,y:1}}
      >
              <View className="items-center">
                <Text  className=" text-xl">Хляб Ресенски</Text>
              </View>
          
              <Text>От</Text>
              <Text className="font-bold text-xl">€5.99</Text>
            </LinearGradient>
        </View>

             <View>
          <View>
            <Image 
          source={require("../../assets/images/hlqb.jpg")} 
        className="size-[180px] rounded-t-2xl"
      />
          </View>
           <LinearGradient 
             style={styles.products}
          className=" p-5  items-center justify-center rounded-b-xl"
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{x:0,y:1}}
      >
              <View className="items-center">
                <Text  className=" text-xl">Хляб Ресенски</Text>
              </View>
          
              <Text>От</Text>
              <Text className="font-bold text-xl">€5.99</Text>
            </LinearGradient>
        </View>



             <View>
          <View>
            <Image 
          source={require("../../assets/images/hlqb.jpg")} 
        className="size-[180px] rounded-t-2xl"
      />
          </View>
           <LinearGradient 
             style={styles.products}
          className=" p-5  items-center justify-center rounded-b-xl"
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{x:0,y:1}}>
              <View className="items-center">
                <Text  className=" text-xl">Хляб Ресенски</Text>
              </View>
          
              <Text>От</Text>
              <Text className="font-bold text-xl">€5.99</Text>
            </LinearGradient>
        </View>

      </View>
      </ScrollView>
  </ScrollView>
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
});
