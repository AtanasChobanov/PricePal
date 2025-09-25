import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');



const hp = (percentage: number) => (percentage * screenHeight) / 100;
const getFontSize = (size: number) => {
  if (screenWidth < 350) return size * 0.85;
  if (screenWidth > 400) return size * 1.1;
  return size;
};

export default function ProductLayout() {


  const router = useRouter();
  const { productID } = useLocalSearchParams<{ productID: string }>();
  return (
   <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.topbar}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)', 'transparent']}
            locations={[0, 0.7, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <BlurView
              intensity={20}
              tint="light"
              experimentalBlurMethod="dimezisBlurView"
              style={StyleSheet.absoluteFillObject}
            />
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

          {/* Dynamic Title */}
          <Text style={styles.title}>
            {decodeURIComponent(productID ?? "Продукт")}
          </Text>
        </View>

        <Stack
          screenOptions={{
            headerShown: false,
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
    marginTop:hp(1.2)
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor:'#E5E4E2',
    borderStyle:'solid',
    borderWidth:1,
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
