import { BlurView } from 'expo-blur';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      
      <View style={[styles.focusedTab, { overflow: 'hidden' }]}>
        <BlurView 
          intensity={70} 
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
      <Image source={icon} style={{ width: 20, height: 20,}} />
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
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            flex: 1,
            height: '100%',
            
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 15,
          },
          tabBarStyle: {
            position: 'absolute',
            bottom: 36,
            left: '50%',
            transform: [{ translateX: 25 }], // Fixed centering calculation
            height: 70,
            width: 270,
            borderRadius: 40,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.6)',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 30,
            elevation: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
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
                title={'Home'}
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
                title={'Cart'}
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
                title={'Categories'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            href: null,
          }}
        />
      </Tabs>
      
      <SearchButton />
    </View>
  );
};

const styles = StyleSheet.create({
  focusedTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 14,
    marginTop: 30,
    marginRight: 10,
    height: 62,
    width: 100,
  },
  focusedText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#000000', // Fixed typo: was '#00000'
    fontWeight: '500',
  },
  defaultTab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
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
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    elevation: 20,
  },
  searchButtonBlur: {
    ...StyleSheet.absoluteFillObject, // Better than StyleSheet.absoluteFill
  },
  searchIcon: {
    width: 24,
    height: 24,
    zIndex: 1, // Ensure icon appears above blur
  },
  tabBarBlur: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default _layout;