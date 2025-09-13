import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


interface Product {
  name: string;
  brand: string;
  price: string;
  photo?: string | null;
}

interface ProductBoxProps {
  productName: string;
  brand: string;
  price: string;
  photo?: string | null;
  colors?: string[];
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
  gradientColors?: string[];
}

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

const ProductBox: React.FC<ProductBoxProps> = ({ 
  productName, 
  brand, 
  price, 
  photo, 
  colors 
}) => {

  const cardWidth = wp(45);
  const imageSize = cardWidth;

  return (
    <View style={{ width: cardWidth }}>
      <View style={styles.imageContainer}>
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={[styles.productImage, { width: imageSize, height: imageSize }]}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("../../assets/images/hlqb.jpg")}
            style={[styles.productImage, { width: imageSize, height: imageSize }]}
            resizeMode="cover"
          />
        )}
        {/* Heart icon overlay */}
        <View style={styles.heartOverlay}>
          <HeartIcon />
        </View>
      </View>
      <LinearGradient
        style={[styles.products, { width: cardWidth }]}
        colors={ ['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
        start={{ x: 0, y: 1 }}
      >
        <View style={styles.productContent}>
          <View style={styles.productNameContainer}>
            <Text 
              style={[styles.productName, { fontSize: getFontSize(16) }]} 
              numberOfLines={2}
            >
              {productName} {brand}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={[styles.priceLabel, { fontSize: getFontSize(12) }]}>
              От
            </Text>
            <Text style={[styles.price, { fontSize: getFontSize(18) }]}>
              €{price}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const HeartIcon: React.FC<HeartIconProps> = ({ filled = false }) => {
  return (
    <Svg height={wp(8)} width={wp(8)} viewBox="0 0 24 24">
      <Path
        d="M12 21s-6-4.35-9-8.28C1 9.6 3.5 5 7.5 5c2.54 0 4.5 2 4.5 2s1.96-2 4.5-2c4 0 6.5 4.6 4.5 7.72C18 16.65 12 21 12 21z"
        fill={filled ? "black" : "none"}
        stroke="black"
        strokeWidth={1}
      />
    </Svg>
  );
};

const CategoryButton: React.FC<CategoryButtonProps> = ({ title }) => {
  const buttonWidth = wp(35); 
  
  return (
    <LinearGradient 
      style={[styles.categories, { width: buttonWidth, minWidth: 120 }]}
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
};

const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  products, 
  gradientColors 
}) => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { fontSize: getFontSize(20) }]}>
          {title}
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp(4) }}
      >
        <View style={styles.productsRow}>
          {products.map((product, index) => (
            <ProductBox
              key={index}
              productName={product.name}
              brand={product.brand}
              price={product.price}
              photo={product.photo}
              colors={gradientColors}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const Index: React.FC = () => {

  const categories: string[] = ["Месо", "Зеленчуци", "Плодове", "Хляб", "Млечни"];
  
  const ourChoiceProducts: Product[] = [
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
  ];

  const topProducts: Product[] = [
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
  ];

  const mostSoldProducts: Product[] = [
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: null },
  ];

  return (
    <ImageBackground
      source={require("../../assets/images/background2.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView 
        style={[styles.container, { paddingTop: hp(7) }]} 
        showsVerticalScrollIndicator={false}
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: wp(4), paddingBottom: hp(2) }}
        >
          <View style={styles.categoriesRow}>
            {categories.map((category, index) => (
              <CategoryButton key={index} title={category} />
            ))}
          </View>
        </ScrollView>

        {/* Product Sections */}
        <ProductSection 
          title="Нашия избор" 
          products={ourChoiceProducts}
          gradientColors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
        />
        
        <ProductSection 
          title="Топ продутки" 
          products={topProducts}
          gradientColors={['rgba(255,218,185,1)', 'rgba(255,182,193,1)']}
        />
        
        <ProductSection 
          title="Най-купувани продукти" 
          products={mostSoldProducts}
          gradientColors={['rgba(221,214,243,1)', 'rgba(196,181,253,1)']}
        />

        {/* Store Sections */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontSize: getFontSize(20) }]}>
            Предложения от Кауфланд
          </Text>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontSize: getFontSize(20) }]}>
            Предложения от Билла
          </Text>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontSize: getFontSize(20) }]}>
            Предложения от Лидл
          </Text>
        </View>
        
        {/* Bottom spacing */}
        <View style={{ height: hp(20) }} />
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
  categoriesRow: {
    flexDirection: 'row',
    gap: wp(3),
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
  productsRow: {
    flexDirection: 'row',
    gap: wp(4),
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
    marginBottom: hp(1),
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
});

export default Index;