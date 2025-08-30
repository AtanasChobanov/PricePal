import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Categories = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/background2.png")}
      style={styles.backgroundImage}>
      <ScrollView
        className=" pt-[55px]"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 2 }}>
        {/* Title */}
        <View className="items-center">
          <Text className="text-4xl pt-3  pb-7 font-bold">Избери си категория</Text>
        </View>
        {/* Categories */}
        <View className="flex-row flex-wrap">
          {[
            "🍎 Плодове и зеленчуци",
            "🥩 Месо",
            "🐟 Риба и морски дарове",
            "🧀 Млечни продукти",
            "🍞 Хлебни изделия",
            "❄️ Замразени храни",
            "🥫 Консерви и пакетирани храни",
            "🥖 Основни продукти и подправки",
            "🍿 Снаксове",
            "🍫 Сладки и десерти",
            "🥣 Закуска и зърнени",
            "🥤 Напитки",
            "🍷 Алкохол",
          ].map((category, index) => (
            <View key={index} className="m-2">
                <TouchableOpacity onPress={pressed} style={styles.button}>
              <LinearGradient
                className="p-5 rounded-xl items-center justify-center"
                colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
                start={{ x: 0, y: 1 }}
                style={styles.categories}
              >
              
                <Text className="text-l font-semibold">{category}</Text>
              
              </LinearGradient>
                </TouchableOpacity>
            </View>
          ))}
            </View>
          <View className="flex-row flex-wrap">
          {[
           "🧼 Почистващи и перилни препарати",
            "🧻 Хартиени продукти",
            "🥡 Еднократни съдове",
            "📦 Организация и съхранение",
            "🐾 Грижа за домашни любимци",
          ].map((category, index) => (
            <View key={index} className="m-2">
                <TouchableOpacity onPress={pressed} style={styles.button}>
              <LinearGradient
                className="p-5 rounded-xl items-center justify-center"
                  colors={['rgba(255,218,185,1)', 'rgba(255,182,193,1)']}
                start={{ x: 0, y: 1 }}
                style={styles.categories}
              >
              
                <Text className="text-l font-semibold">{category}</Text>
              
              </LinearGradient>
                </TouchableOpacity>
            </View>
          ))}
           </View>
               <View className="flex-row flex-wrap">
          {[
          
            "🧴 Тоалетни принадлежности",
            "💆‍♀️ Грижа за кожата",
            "💇‍♀️ Грижа за косата",
            "💊 Здраве и уелнес",
            "👶 Бебешки продукти",
          ].map((category, index) => (
            <View key={index} className="m-2">
                <TouchableOpacity onPress={pressed} style={styles.button}>
              <LinearGradient
                className="p-5 rounded-xl items-center justify-center"
                  colors={['rgba(221,214,243,1)', 'rgba(196,181,253,1)']}
                start={{ x: 0, y: 1 }}
                style={styles.categories}
              >
              
                <Text className="text-l font-semibold">{category}</Text>
              
              </LinearGradient>
                </TouchableOpacity>
            </View>
          ))}
           </View>
              <View className="flex-row flex-wrap">
          {[
            "🍳 Кухня и сервиране",
            "🔌 Електроуреди",
            "🔋 Електроника и аксесоари",
            "🧦 Текстил и облекло",
            "🖊️ Офис и канцеларски материали",
            "🚗 Автомобилни продукти",
            "🌱 Сезонни и градински",
            "🏋️‍♂️ Спорт и свободно време"
          ].map((category, index) => (
            <View key={index} className="m-2">
                <TouchableOpacity onPress={pressed} style={styles.button}>
              <LinearGradient
                className="p-5 rounded-xl items-center justify-center"
                   colors={['rgba(143,228,201,1)', 'rgba(150,210,255,1)']}
                start={{ x: 0, y: 1 }}
                style={styles.categories}
              >
              
                <Text className="text-l font-semibold">{category}</Text>
              
              </LinearGradient>
                </TouchableOpacity>
            </View>
          ))}
           </View>
                      <View className='mb-[170px]'></View>

           
      </ScrollView>
    </ImageBackground>
  );
};
const pressed = alert;
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

export default Categories;
