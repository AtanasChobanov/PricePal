  import { BlurView } from 'expo-blur';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import 'react-native-gesture-handler';
import 'react-native-reanimated';


import { enableScreens } from 'react-native-screens';
import Svg, { Path } from "react-native-svg";
import { mostSoldProducts, ourChoiceProducts, topProducts } from '../../app/(tabs)/index';


  import { LineChart } from 'react-native-gifted-charts';
  enableScreens();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');




        //  Width and height functions
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

    const { productID } = useLocalSearchParams<{ productID: string }>();

    const allProducts = [...ourChoiceProducts, ...topProducts, ...mostSoldProducts];
    const product = allProducts.find(p => p.id === productID);

    if (!product) return <Text>Product not found</Text>;



const productPriceHistory = [
  { value: 10, label: 'Янр', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 15, label: 'Фев', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 12, label: 'Мар', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 15, label: 'Апр', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 9, label: 'Май', labelTextStyle: {color: '#666', fontSize: 12} },
  { value: 10, label: 'Юни', labelTextStyle: {color: '#666', fontSize: 12} },
];

    return (
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
            <Image source={product.photo} style={styles.productImage} />
            
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
            <Text style={styles.productBrand}>{product.brand}</Text>
            
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
              <View style={styles.discountContainer}>
                <Text style={{color:'black', fontWeight:'semibold'}}>-50%</Text>
                </View>
            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>€{product.price}</Text>
              <Text style={styles.originalPrice}>€{(parseFloat(product.price) * 1.2).toFixed(2)}</Text>
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
      pointerStripColor: '#8FE4C9',
      pointerStripWidth: 2,
      pointerColor: '#8FE4C9',
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




            {/* Action Button */}
          <BlurView
          intensity={20}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          className="
            absolute 
            rounded-[15px] 
            p-5 
            overflow-hidden 
            border border-white
            shadow-lg
            left-0 right-0  mx-3"
            style={{bottom:wp(7)}}>
          <TouchableOpacity className='justify-center flex-row' >
            <Svg width={24} height={24} viewBox="0 0 902.86 902.86" fill={'#000'}
      >
        <Path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
        <Path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z" />
      </Svg>
            <Text className='font-semibold'>Добави към количката</Text>
            </TouchableOpacity>
          </BlurView>

      </ImageBackground>
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
    alignItems: 'center',
    paddingVertical: 0,
    marginBottom: hp(1.5),
    alignSelf: 'center', 
    height:hp(40),
    width:wp(94),
    position: 'relative',
    shadowColor: '#000',
    overflow: 'hidden',  
    borderRadius:15,
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
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    marginBottom: 20,
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
  discountContainer:{
    backgroundColor: '#rgba(203,230,246,1)',
    padding:5,
    borderRadius:5,
    alignSelf: 'flex-start',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8bdcc3',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 20,
    color: '#999',
    textDecorationLine: 'line-through',
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
    marginHorizontal: 16,
    borderRadius: 16,
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
  }
});

