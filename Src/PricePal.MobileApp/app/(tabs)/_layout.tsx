import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <View style={[styles.focusedTab, { overflow: 'hidden' }]}>
        <BlurView 
          intensity={50} 
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFillObject}
        />
        <Image source={icon} style={{ width: 20, height: 20, zIndex: 1 }} />
        <Text style={[styles.focusedText, { zIndex: 1 }]}>{title}</Text>
      </View>
    );
  }
  return (
    <View style={styles.defaultTab}>
      <Image source={icon} style={{ width: 20, height: 20 }} />
      <Text style={styles.defaultText}>{title}</Text>
    </View>
  );
};

const SearchButton = () => (
  <TouchableOpacity 
    style={styles.searchButton}
    onPress={() => router.push('/search')}
    activeOpacity={0.8}
  >
    <BlurView 
      intensity={20} 
      tint="light"
      experimentalBlurMethod="dimezisBlurView"
      style={styles.searchButtonBlur}
    />
    <Image 
      source={require('../../assets/icons/search.png')} 
      style={styles.searchIcon} 
    />
  </TouchableOpacity>
);

const _layout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={{ flex: 1 }}>
          
          {/* Top Bar */}
          <View style={styles.topbar}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)', 'transparent']}
              locations={[0, 0.6, 1]}
              style={styles.gradientBackground}
            />
            <TouchableOpacity 
              onPress={() => router.push('/(profile)/profile')}
              style={{ zIndex: 2 }}>
              <Image className='w-[35px] h-[35px]' source={require("../../assets/icons/profile-pic.png")} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/(profile)/settings')}
              style={{ zIndex: 2 }}>
             <View className="flex-row items-center overflow-hidden justify-center rounded-[20px] h-[40px] w-[40px] border border-white">
                <BlurView 
                  intensity={20} 
                  tint="light"
                  experimentalBlurMethod="dimezisBlurView"
                  style={StyleSheet.absoluteFillObject}
                  
                />
                <Image className='w-[30px] h-[30px]' source={require("../../assets/icons/setting.png")} />
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Tab Bar */}
          <Tabs
            screenOptions={{
              tabBarShowLabel: false,
              tabBarItemStyle: {
                flex: 1,
                height: 70, 
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 15,
              },
              tabBarStyle: {
                position: 'absolute',
                bottom: 36,
                
                left: '50%',
                transform: [{ translateX: 25 }], 
                height: 70,
                width: 270,
                borderRadius: 40,
                overflow: 'hidden',
                borderWidth: 1,
                    borderColor:"white",
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 30,
                elevation: 10,
              },
              tabBarBackground: () => (
                <BlurView 
                  intensity={20}
                  tint="light"
                  experimentalBlurMethod="dimezisBlurView"
                  style={styles.tabBarBlur}
                />
              ),
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                headerShown: false,
                title: 'Home',
                tabBarIcon: ({ focused }) => (
                  <TabIcon
                    focused={focused}
                    icon={require('../../assets/icons/home.png')}
                    title={'Начало'}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                headerShown: false,
                title: 'Cart',
                tabBarIcon: ({ focused }) => (
                  <TabIcon
                    focused={focused}
                    icon={require('../../assets/icons/cart.png')}
                    title={'Количка'}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="categories"
              options={{
                headerShown: false,
                title: 'Categories',
                tabBarIcon: ({ focused }) => (
                  <TabIcon
                    focused={focused}
                    icon={require('../../assets/icons/categories.png')}
                    title={'Категорий'}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="search"
              
              options={{
                href: null,
                   headerShown:false}}/>
     
          </Tabs>
          <SearchButton />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  topbar: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 100, 
    paddingHorizontal: 20,
    paddingTop: 10, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1000,
    pointerEvents: 'box-none',
    
  },
  
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    zIndex: 1,
  },

  focusedTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 14,
    marginTop: 30, 
    marginRight: 10,
    height: 70,
     borderColor:"white",
     borderWidth:0.5,
    minWidth: 120,
  },
  focusedText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultTab: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    height: 50, 
    width: 100,
  },
  defaultText: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    marginTop: 4,
  },
  searchButton: {
    position: 'absolute',
    bottom: 40,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    elevation: 20,
    borderColor:"white",
  },
  searchButtonBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  searchIcon: {
    width: 24,
    height: 24,
    zIndex: 1,
  },
  tabBarBlur: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default _layout;