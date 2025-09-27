
import { useProduct } from '@/services/useProducts'; // Use the new hook
import { BlurView } from 'expo-blur';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from 'react-native-gifted-charts';
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { enableScreens } from 'react-native-screens';
import Svg, { Path } from "react-native-svg";

enableScreens();

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


const chainLogos: Record<string, any> = {
  Lidl: require("../../assets/icons/Lidl-logo.png"),
  Kaufland: require("../../assets/icons/kaufland-logo.png"),
  Billa: require("../../assets/icons/billa-logo.jpg"),
  TMarket: require("../../assets/icons/tmarket-logo.png"),
};

const productPriceHistory = [
  { value: 10, label: 'Янр', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 15, label: 'Фев', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 12, label: 'Мар', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 15, label: 'Апр', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 9, label: 'Май', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 10, label: 'Юни', labelTextStyle: {color: '#666', fontSize: 12} },
];

// Width and height functions
const wp = (percentage: number): number => {
  return (percentage * screenWidth) / 100;
};

const hp = (percentage: number): number => {
  return (percentage * screenHeight) / 100;
};

// Font functions
const getFontSize = (size: number): number => {
  if (screenWidth < 350) return size * 0.85; 
  if (screenWidth > 400) return size * 1.1;  
  return size; 
};

export default function ProductPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const params = useLocalSearchParams();
  const productNameParam = Array.isArray(params.productID) ? params.productID[0] : params.productID;
  const productName = decodeURIComponent(productNameParam || '');
  

  const { product, found, dataReady } = useProduct(productName);


  if (!dataReady) {
    return (
      <Animated.View
        style={{ flex: 1 }}
        entering={SlideInRight.duration(200)}
      >
        <ImageBackground
          source={require("../../assets/images/background2.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Зареждане...</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  }


  if (!found || !product) {
    return (
      <Animated.View
        style={{ flex: 1 }}
        entering={SlideInRight.duration(200)}
      >
        <ImageBackground
          source={require("../../assets/images/background2.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>Продуктът не е намерен</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  }


  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={SlideInRight.duration(300)} // Faster animation
      exiting={SlideOutRight.duration(100)}
    >
      <ImageBackground
        source={require("../../assets/images/background2.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView 
          style={styles.container} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Product Image Section */}
          <View style={styles.imageContainer}>
            {product.imageUrl ? (
              <Image
                source={typeof product.imageUrl === 'string' ? { uri: product.imageUrl } : product.imageUrl}
                style={styles.productImage}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../assets/icons/pricelpal-logo.png")}
                style={styles.productImage}
                resizeMode="cover"
              />
            )}
            
            {/* Favorite Button */}
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Svg viewBox="0 0 24 24" width={28} height={28}>
                <Path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={isFavorite ? "#FF6B6B" : "transparent"}
                  stroke={isFavorite ? "#FF6B6B" : "#666"}
                  strokeWidth={2}
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Product Details Section */}
          <View style={styles.detailsContainer}>
            {/* Product Name and Brand */}
            <Text style={styles.productName}>{product.name}</Text>
            
            {/* Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {[...Array(5)].map((_, i) => (
                  <Svg key={i} viewBox="0 0 24 24" width={20} height={20} style={styles.star}>
                    <Path
                      d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.868 1.486 8.279L12 18.896l-7.422 4.557 1.486-8.279-6.064-5.868 8.332-1.151z"
                      fill={i < 4 ? "rgba(143,228,201,1)" : "#E0E0E0"}
                    />
                  </Svg>
                ))}
              </View>
              <Text style={styles.ratingText}>4.8 (124 reviews)</Text>
            </View>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{product.priceBgn.replace(/ЛВ.*/, '')} лв.</Text>
              <Text style={styles.price}>{product.priceEur.replace(/€.*/, '')} €</Text>
            </View>
            <View style={styles.unitContainer}>
                <Text>{product.unit}</Text>
            </View>

            {/* Quantity Selection */}
            <View style={styles.quantitySection}>
              <Text style={styles.sectionTitle}>Брой</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Retail Box */}
          <View style={styles.retailsContainer}>
            <Text style={styles.retailTitle}>Цени в различните вериги</Text>
            <View style={styles.OneRetailBox}>
              <View style={styles.leftSection}>
                <View style={styles.storeInfo}>
                  <Image 
                    style={styles.retailImages}    
                    source={chainLogos[product.chain] || require("../../assets/icons/pricelpal-logo.png")}
                  />
                  <Text style={styles.retailText}>{product.chain}</Text>
                </View>
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>{product.discount}</Text>
                </View>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.retailPrice}>{product.priceBgn.replace(/ЛВ.*/, '')} лв.</Text>
                <Text style={styles.originalPrice}>{product.oldPriceBgn.replace(/ЛВ.*/, '')} лв.</Text>
              </View>
                   <View style={styles.rightSection}>
                <Text style={styles.retailPrice}>{product.priceEur.replace(/€.*/, '')}  €</Text>
                <Text style={styles.originalPrice}>{product.oldPriceEur.replace(/€.*/, '')} €</Text>
              </View>
            </View>
          </View>

          {/* Charts */}
        <View style={styles.chartContainer}>
  <Text style={styles.chartTitle}>Ценова история</Text>
  <Text style={styles.chartSubtitle}>Последни 6 месеца</Text>
  
  <LineChart
    // Animation settings
    isAnimated
    animateOnDataChange
    animationDuration={1200}
    onDataChangeAnimationDuration={500}
    
    // Data and styling
    data={productPriceHistory}
    thickness={4}
    color="#8FE4C9"
    color1="#8FE4C9"

    // Chart dimensions and spacing
    width={wp(85)}
    height={200}
    spacing={45}
    initialSpacing={20}
    endSpacing={20}
    
    // Area chart settings
    areaChart
    startFillColor="rgba(143, 228, 201, 0.3)"
    endFillColor="rgba(143, 228, 201, 0.1)"
    startOpacity={0.4}
    endOpacity={0.05}
    
    // Data points
    hideDataPoints={false}
    dataPointsColor="#8FE4C9"
    dataPointsRadius={6}
    dataPointsWidth={2}
    dataPointsColor1="#8FE4C9"
    focusEnabled
    showDataPointOnFocus
    showStripOnFocus
    showTextOnFocus
    stripColor="rgba(143, 228, 201, 0.5)"
    stripHeight={200}
    stripOpacity={0.3}
    
    // Grid and axes
    rulesType="dashed"
    rulesColor="rgba(255, 255, 255, 0.3)"
    showVerticalLines={false}
    verticalLinesColor="rgba(255, 255, 255, 0.1)"
    
    // Y-axis settings
    maxValue={20}
    noOfSections={4}
    yAxisThickness={1}
    yAxisColor="rgba(255, 255, 255, 0.4)"
    yAxisTextStyle={{
      color: '#999', 
      fontSize: 12,
      fontWeight: '500'
    }}
    yAxisLabelPrefix="€"
    formatYLabel={(value: string) => `${Math.round(Number(value))}`}
    
    // X-axis settings
    xAxisThickness={1}
    xAxisColor="rgba(255, 255, 255, 0.4)"
    xAxisLabelTextStyle={{
      color: '#999',
      fontSize: 12,
      fontWeight: '500'
    }}
    
    // Background
    backgroundColor="rgba(255, 255, 255, 0.05)"
    curved
    curvature={0.2}
    
    // Pointer config for interaction
    pointerConfig={{
      pointerStripHeight: 200,
      pointerStripColor: 'rgba(203,230,246,1)',
      pointerStripWidth: 2,
      pointerColor: 'rgba(203,230,246,1) ',
      radius: 8,
      pointerLabelWidth: 100,
      pointerLabelHeight: 90,
      pointerLabelComponent: (items: any[]) => {
        return (
          <View style={styles.pointerLabel}>
            <Text style={styles.pointerLabelText}>€{items[0].value}</Text>
            <Text style={styles.pointerLabelMonth}>{items[0].label}</Text>
          </View>
        );
      },
    }}
  />
  
  {/* Price trend indicator */}
  <View style={styles.trendIndicator}>
    <Svg viewBox="0 0 24 24" width={16} height={16}>
      <Path
        d="M7 14l5-5 5 5"
        stroke="#4CAF50"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    <Text style={styles.trendText}>+15% спрямо миналия месец</Text>
  </View>
</View>
        </ScrollView>

        {/* Cart Button */}
     <BlurView
      intensity={40}
      tint="light"
      experimentalBlurMethod="dimezisBlurView" 
      style={{
        position: 'absolute',
        bottom: wp(7),
  width:wp(95),
  alignSelf:'center',
        borderRadius: 15,
        padding: 20,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
          <TouchableOpacity style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
            <Svg width={24} height={24} viewBox="0 0 902.86 902.86" fill={'#000'}>
              <Path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
              <Path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z" />
            </Svg>
            <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: 8}}>Добави към количката</Text>
          </TouchableOpacity>
        </BlurView>
      </ImageBackground>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 100
  },
  imageContainer: {
    backgroundColor: 'white',
        marginTop:wp(15),
    alignItems: 'center',
    paddingVertical: 0,
    marginBottom: hp(2),
    alignSelf: 'center', 
    height:hp(40),
    width:wp(94),
    position: 'relative',
    shadowColor: '#000',
    overflow: 'hidden',  
    borderRadius:wp(4),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    
    height: '100%',
    width: '100%', 
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width:wp(95),
    alignSelf:'center',
    borderRadius:wp(4),
    padding: 20,
    marginBottom: hp(2),
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },

  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
    unitContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: hp(2),
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#96D4F7',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  quantitySection: {
    marginBottom: 25,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'rgba(143,228,201,1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#333',
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius:wp(4),
      width:wp(95),
      alignSelf:'center',
    padding: 20,
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  pointerLabel: {
    backgroundColor: 'rgba(143, 228, 201, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop:40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pointerLabelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pointerLabelMonth: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  trendText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
 
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
 retailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: wp(4),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(95),
    alignSelf: 'center',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rightSection: {
    alignItems: 'flex-end',
    paddingHorizontal:5,
    
  },
  retailImages: {
    width: wp(10),
    height: wp(10),
  },
  retailText: {
    paddingLeft: wp(2),
    fontWeight: 'bold',
    fontSize: getFontSize(16),
    color: '#000000',
  },
  discountText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  retailPrice: {
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    color: '#96D4F7',
    marginBottom: 2,
  },
    discountContainer:{
    backgroundColor: 'rgba(143,228,201,1)',
    padding:5,
    borderRadius:5,
    alignSelf: 'center',
  },
    originalPrice: {
    fontSize: getFontSize(18),
    color: '#999',
    textDecorationLine: 'line-through',
  },
OneRetailBox:{
  paddingVertical:hp(0.5),
  flexDirection:'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    
},
retailTitle:{
   fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    alignSelf:'flex-start'
},
 loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: getFontSize(18),
    fontWeight: '500',
    color: '#333',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

});
