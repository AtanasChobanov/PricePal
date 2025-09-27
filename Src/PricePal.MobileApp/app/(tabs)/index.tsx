import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import ContentLoader, { Rect } from "react-content-loader/native";
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, ImageBackground, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useProducts } from '../../services/useProducts';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Product {
  id?: string; 
  name: string;
  chain: string;
  category: string;
  unit?: string;
  priceBgn: string;
  priceEur: string;
  oldPriceBgn?: string;
  oldPriceEur?: string;
  validFrom?: string;
  validTo?: string;
  discount: string;
  imageUrl: string;
}

interface ProductBoxProps {
  id: string;
  productName: string;
  brand: string;
  priceBgn: string;
  unit?:string;
  priceEur: string;
  photo?: ImageSourcePropType | string;
  colors?: [string, string, ...string[]];
}

interface HeartIconProps {
  filled?: boolean;
}

interface CategoryButtonProps {
  title: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  gradientColors: [string, string, ...string[]];
}

// Width and height functions - moved outside for performance
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

const ProductBox: React.FC<ProductBoxProps> = React.memo(({ 
  id,
  productName, 
  brand, 
  priceBgn,
  unit,
  priceEur,
  photo, 
  colors 
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();

  // Memoize expensive calculations
  const processedPrices = useMemo(() => ({
    bgn: priceBgn.replace(/\s*лв\.?.*$/i, ''),
    eur: priceEur.replace(/€.*/, '')
  }), [priceBgn, priceEur]);

  const cardWidth = useMemo(() => wp(45), []);

  const handleProductPress = useCallback(() => {
    router.push(`/products/${encodeURIComponent(productName)}`);
  }, [productName, router]);

  const handleAddToCart = useCallback((e: any) => {
    e.stopPropagation();
    setIsAddingToCart(true);

    Alert.alert(
      "Добавено към количката",
      `${productName} ${brand} беше добавен към количката`,
      [{ text: "Продължи" }],
      { cancelable: true }
    );
    
    setTimeout(() => setIsAddingToCart(false), 500);
  }, [productName, brand]);

  return (
    <TouchableOpacity onPress={handleProductPress}>
      <View style={{ width: cardWidth }}>
        <View style={styles.imageContainer}>
          {photo ? (
            <Image
              source={typeof photo === 'string' ? { uri: photo } : photo}
              style={[styles.productImage, { width: cardWidth, height: cardWidth, backgroundColor:'white' }]}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/icons/pricelpal-logo.png")}
              style={[styles.productImage, { width: cardWidth, height: cardWidth, backgroundColor:'white' }]}
              resizeMode="cover"
            />
          )}
          <View style={styles.heartOverlay}>
            <HeartIcon />
          </View>
        </View>
        
        <LinearGradient
          style={[styles.products, { width: cardWidth }]}
          colors={colors || ['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
          start={{ x: 0, y: 1 }}
        >
          <View style={styles.productContent}>
            <View style={styles.productNameContainer}>
              <Text style={[styles.productName, { fontSize: getFontSize(16) }]} numberOfLines={2}>
                {productName}
              </Text>
            </View>
                       {/* <View style={styles.unitContainer}>
                            <Text>{unit}</Text>
                        </View> */}
            <View style={styles.priceCartContainer}>
              <View style={styles.priceContainer}>
                <Text style={[styles.priceLabel, { fontSize: getFontSize(12) }]}>От</Text>
                <Text style={[styles.price, { fontSize: getFontSize(18) }]}>{processedPrices.bgn} лв.</Text>
                <Text style={[styles.price, { fontSize: getFontSize(18) }]}>{processedPrices.eur} €</Text>
              </View>
              <TouchableOpacity 
                style={[styles.addToCartButton, isAddingToCart && styles.addToCartButtonPressed]}
                onPress={handleAddToCart}
              >
                <Svg viewBox="0 0 24 24" width={20} height={20}>
                  <Path
                    d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    fill={isAddingToCart ? "#000" : "#000"}
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
});

ProductBox.displayName = 'ProductBox';
   
const HeartIcon: React.FC<HeartIconProps> = React.memo(({ filled = false }) => {
  const [isFavorite, setIsFavorite] = useState(filled);
  
  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  return (
    <TouchableOpacity 
      style={styles.favoriteButton}
      onPress={toggleFavorite}
    >
      <Svg viewBox="0 0 24 24" width={24} height={24}>
        <Path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={isFavorite ? "#FF6B6B" : "transparent"}
          stroke={isFavorite ? "#FF6B6B" : "#666"}
          strokeWidth={2}
        />
      </Svg>
    </TouchableOpacity>
  );
});

HeartIcon.displayName = 'HeartIcon';

const CategoryButton: React.FC<CategoryButtonProps> = React.memo(({ title }) => {
  const buttonWidth = useMemo(() => Math.max(wp(35), 120), []);
  
  return (
    <LinearGradient 
      style={[styles.categories, { width: buttonWidth }]}
      colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
      start={{ x: 0, y: 1 }}
    >
      <Text 
        style={[styles.categoryText, { fontSize: getFontSize(16) }]} 
        numberOfLines={1}
      >
        {title}
      </Text>
    </LinearGradient>
  );
});

CategoryButton.displayName = 'CategoryButton';

const ProductSection: React.FC<ProductSectionProps> = React.memo(({ 
  title, 
  products, 
  gradientColors 
}) => {
  // All hooks must be called before any early returns!
  const renderProduct = useCallback(({ item, index }: { item: Product; index: number }) => (
    <ProductBox
      id={item.id || `product-${index}`}
      productName={item.name}
      brand={item.chain}
      priceBgn={item.priceBgn}
      priceEur={item.priceEur}
      unit={item.unit}
      photo={item.imageUrl}
      colors={gradientColors}
    />
  ), [gradientColors]);

  const keyExtractor = useCallback((item: Product, index: number) => 
    item.id || `product-${index}`, []
  );

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: wp(45) + wp(4),
    offset: (wp(45) + wp(4)) * index,
    index,
  }), []);

  // Early return AFTER all hooks
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { fontSize: getFontSize(20) }]}>
          {title}
        </Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp(4) }}
        ItemSeparatorComponent={ItemSeparator}
        getItemLayout={getItemLayout}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={100}
        windowSize={5}
        initialNumToRender={3}
      />
    </>
  );
});

ProductSection.displayName = 'ProductSection';

// Memoized separator component
const ItemSeparator = React.memo(() => <View style={{ width: wp(4) }} />);
ItemSeparator.displayName = 'ItemSeparator';

const CategorySeparator = React.memo(() => <View style={{ width: wp(3) }} />);
CategorySeparator.displayName = 'CategorySeparator';

const Index: React.FC = () => {
  const { products, loading, error, isDataAvailable } = useProducts();
  
  // Memoize static data
  const categories = useMemo(() => ["Месо", "Зеленчуци", "Плодове", "Хляб", "Млечни"], []);

  // Memoize filtered products to prevent recalculation on every render
  const filteredProducts = useMemo(() => {
    if (!products.length) return null;

    return {
      ourChoice: products.slice(0, 3),
      top: products.slice(3, 6), 
      mostSold: products.slice(6, 9),
      kaufland: products.filter(product => product.chain === "Kaufland"),
      lidl: products.filter(product => product.chain === "Lidl"),
      billa: products.filter(product => product.chain === "Billa"),
      tmarket: products.filter(product => product.chain === "TMarket"),
    };
  }, [products]);

  // Memoize render functions
  const renderCategory = useCallback(({ item }: { item: string }) => (
    <CategoryButton title={item} />
  ), []);

  const keyExtractorCategory = useCallback((item: string, index: number) => 
    `category-${index}`, []
  );

  // Show loading only on first app launch when no data is available
  if (loading && !isDataAvailable()) {
    return (
      <ImageBackground
        source={require("../../assets/images/background2.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.loadingContainer}>
 <ContentLoader 
    speed={2}
    width={360}
    height={800}
    viewBox="0 0 360 800"
    backgroundColor="#ababab"
    foregroundColor="#ecebeb"

  >
    <Rect x="64" y="20" rx="6" ry="6" width="220" height="28" /> 
    <Rect x="104" y="65" rx="6" ry="6" width="140" height="18" /> 
    <Rect x="18" y="100" rx="12" ry="12" width="108" height="44" /> 
    <Rect x="109" y="154" rx="5" ry="5" width="140" height="18" /> 
    <Rect x="17" y="185" rx="12" ry="12" width="160" height="271" /> 
    <Rect x="194" y="185" rx="12" ry="12" width="160" height="271" /> 
    <Rect x="118" y="462" rx="5" ry="5" width="140" height="18" /> 
    <Rect x="197" y="494" rx="12" ry="12" width="160" height="288" /> 
    <Rect x="18" y="493" rx="12" ry="12" width="160" height="293" /> 
    <Rect x="135" y="98" rx="12" ry="12" width="108" height="44" /> 
    <Rect x="250" y="97" rx="12" ry="12" width="108" height="44" />
  </ContentLoader>
        </View>
      </ImageBackground>
    );
  }

  // Show error state
  if (error && !isDataAvailable()) {
    return (
      <ImageBackground
        source={require("../../assets/images/background2.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { fontSize: getFontSize(20) }]}>
            Грешка при зареждане на продуктите
          </Text>
          <Text style={[styles.errorDetails, { fontSize: getFontSize(16) }]}>
            {error.message}
          </Text>
        </View>
      </ImageBackground>
    );
  }

  // If we have cached data but it's refreshing, show content immediately
  const displayProducts = filteredProducts || {
    ourChoice: [],
    top: [],
    mostSold: [],
    kaufland: [],
    lidl: [],
    billa: [],
    tmarket: [],
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background2.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView 
        style={[styles.container, { paddingTop: hp(7) }]} 
        showsVerticalScrollIndicator={false}
        // Performance optimizations
        removeClippedSubviews={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Main Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.mainTitle, { fontSize: getFontSize(32) }]}>
            Тази седмица
          </Text>
          <Text style={[styles.subtitle, { fontSize: getFontSize(20) }]}>
            Топ категорий
          </Text>
        </View>
      
        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={keyExtractorCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: wp(4), paddingBottom: hp(2) }}
          ItemSeparatorComponent={CategorySeparator}
          // Performance optimizations
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={10}
          initialNumToRender={5}
        />

        {/* Product Sections */}
        <ProductSection 
          title="Нашия избор" 
          products={displayProducts.ourChoice}
          gradientColors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
        />
        
        <ProductSection 
          title="Топ продукти" 
          products={displayProducts.top}
          gradientColors={['rgba(255,218,185,1)', 'rgba(255,182,193,1)']}
        />
        
        <ProductSection 
          title="Най-купувани продукти" 
          products={displayProducts.mostSold}
          gradientColors={['rgba(221,214,243,1)', 'rgba(196,181,253,1)']}
        />

        {/* Store Sections */}
        <ProductSection 
          title="Предложения от Kaufland" 
          products={displayProducts.kaufland}
          gradientColors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
        />
        
        <ProductSection 
          title="Предложения от Lidl" 
          products={displayProducts.lidl}
          gradientColors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
        />
        
        <ProductSection 
          title="Предложения от Billa" 
          products={displayProducts.billa}
          gradientColors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
        />

        <ProductSection 
          title="Предложения от TMarket" 
          products={displayProducts.tmarket}
          gradientColors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
        />
 
        
        
        {/* Bottom spacing */}
        <View style={{ height: hp(22) }} />
        
        {/* Loading indicator while refreshing in background */}
        {loading && isDataAvailable() && (
          <View style={styles.backgroundRefresh}>
            <ActivityIndicator size="small" color="rgba(143,228,201,0.7)" />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  mainTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  subtitle: {
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  sectionHeader: {
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  sectionTitle: {
    fontWeight: '600',
  },
  categories: {
    padding: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    height: hp(6),
  },
  categoryText: {
    color: 'black',
    fontWeight: '500',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  heartOverlay: {
    position: 'absolute',
    top: hp(1),
    right: wp(2),
    zIndex: 10,
  },
  products: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: wp(3),
  },
  productContent: {
    width: '100%',
  },
  productNameContainer: {
    alignItems: 'center',
    minHeight: getFontSize(16) * 2.4,
    justifyContent:'center'
  },
  productName: {
    textAlign: 'center',
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  priceLabel: {
    color: 'black',
  },
  price: {
    fontWeight: 'bold',
    color: 'black',
  },
  favoriteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 6,
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
  priceCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  addToCartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: wp(2),
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  addToCartButtonPressed: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    transform: [{ scale: 0.95 }],
  },
  loadingContainer: {
    flex: 1,
    marginTop:hp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp(2),
    fontWeight: '500',
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  errorDetails: {
    color: 'gray',
    textAlign: 'center',
  },
  backgroundRefresh: {
    position: 'absolute',
    top: hp(2),
    right: wp(4),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 20,
  },
  //     unitContainer: {
  //   flexDirection: 'column',
  //   backgroundColor:'#96D4F7',
  //   paddingHorizontal:5,
  //   borderRadius:5,
  //   alignSelf: 'flex-start',
  //   alignItems: 'flex-start',
  // },
});

export default Index;