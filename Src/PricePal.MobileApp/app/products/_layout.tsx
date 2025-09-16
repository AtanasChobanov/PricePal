import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { mostSoldProducts, ourChoiceProducts, topProducts } from '../../app/(tabs)/index';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const wp = (percentage: number) => (percentage * screenWidth) / 100;
const hp = (percentage: number) => (percentage * screenHeight) / 100;
const getFontSize = (size: number) => {
  if (screenWidth < 350) return size * 0.85;
  if (screenWidth > 400) return size * 1.1;
  return size;
};

export default function ProductLayout() {
  const router = useRouter();
  const { productID } = useLocalSearchParams<{ productID: string }>();

    const allProducts = [...ourChoiceProducts, ...topProducts, ...mostSoldProducts];
    const product = allProducts.find(p => p.id === productID);

    if (!product) return <Text>Product not found</Text>;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Custom Top Bar */}
        <View style={styles.topbar}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)', 'transparent']}
            locations={[0, 0.6, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* Back Button with SVG */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 18l-6-6 6-6"
                stroke="#333"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>{product.name} {product.brand}</Text>
        </View>

        {/* Your stack screens */}
        <Stack
          screenOptions={{
            headerShown: false, // hide default header
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="[productID]" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    color: '#333',
    marginRight: 40, // keep space for back button
  },
});
