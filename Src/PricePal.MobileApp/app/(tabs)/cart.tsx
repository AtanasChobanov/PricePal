import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';



// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ProductBoxProps {
  name: string;
  brand: string;
  price: string;
   photo: ImageSourcePropType;
}

interface FinalPriceProps {
  saves:number ;
  basePrice:number ;
  price: number ;
}
interface OverviewPriceProps {
  price: number;
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
  name, 
  brand, 
  price, 
  photo
}) => {
  const imageSize = wp(30);
   const [productNumber, setProductNumber] = useState(0);
  const addButton = () => {
    setProductNumber(prev => prev + 1);
  };
    const removeButton = () => {
    setProductNumber(prev => prev - 1);
  };
  return (
    <LinearGradient
      style={styles.products}
      colors={["rgba(203,230,246,1)", "rgba(143,228,201,1)"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.productContainer}>
        <Image style={[styles.productImage, {width:imageSize}]} source={photo} />

        {/* Product details */}
        <View style={styles.productDetails}>
          <View>
            <Text style={styles.brand}>{brand}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>€{price}</Text>
          </View>

          {/* Quantity buttons */}
          <View style={styles.quantityRow}>
            <BlurView intensity={30} tint="light" style={styles.blurButton} experimentalBlurMethod="dimezisBlurView">
              <TouchableHighlight underlayColor="transparent" style={styles.buttonTouchable}  onPress={removeButton}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableHighlight>
            </BlurView>

            <Text style={styles.quantityText}>{productNumber}</Text>

            <BlurView intensity={30} tint="light" style={styles.blurButton} experimentalBlurMethod="dimezisBlurView">
              <TouchableHighlight underlayColor="transparent" style={styles.buttonTouchable}  onPress={addButton}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableHighlight>
            </BlurView>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
const FinalPrice: React.FC<FinalPriceProps>= ({
price,
basePrice,
saves
}) => {

return(
          <LinearGradient
            colors={['rgba(203,230,246,1)', 'rgba(143,228,201,1)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[styles.overviewContainer,{padding:wp(5)}]}
            
          
          >
          <View className="flex-1 justify-between">
            <View className="items-center space-y-2">
              <Text className="font-semibold" style={ { fontSize: getFontSize(19) }}>Обобщение на покупките</Text>
              <Text className="font-semibold text-red-600" style={ { fontSize: getFontSize(18) }} >Спестяваш €{saves}</Text>
            </View>

            <View className="border-t border-white/50 mt-4 pt-3 space-y-1">
              <Text  style={ { fontSize: getFontSize(16) }}>Нормална цена: €{basePrice}</Text>
              <Text style={ { fontSize: getFontSize(16) }}>Обща цена:</Text>
              <Text className=" font-bold text-gray-900" style={ { fontSize: getFontSize(21) }}>€{price}</Text>
            </View>
          </View>
        </LinearGradient>
)
}


const OverviewPrice: React.FC<OverviewPriceProps>= ({
price,
}) => {

return(
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
    style={{bottom:wp(29)}}
>
  <View className=' flex-row 
    justify-between   items-center  '>
  <Text className="text-lg font-bold text-black">
    Обща цена
  </Text>
  <Text className="text-lg font-semibold text-black">
  €{price}
  </Text>
  </View>
  <BlurView
  intensity={55}
  tint="systemThickMaterialLight"
  experimentalBlurMethod="dimezisBlurView"
className='items-center bg-gray-200 h-[50px] rounded-[10px] m-5 justify-center  shadow-lg overflow-hidden border border-white '
>

  <TouchableHighlight className='justify-center' >
    <Text className='font-bold'>Продължи</Text>
    </TouchableHighlight>
 </BlurView>
</BlurView>

)
}

const Cart: React.FC = () => {

  const productArray: ProductBoxProps[] = [
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: require("../../assets/images/hlqb.jpg") },
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: require("../../assets/images/hlqb.jpg") },
    { name: "Хляб", brand: "Ресенски", price: "5.99", photo: require("../../assets/images/hlqb.jpg") },
  ];

const price = productArray.reduce((sum, item) => sum + parseFloat(item.price), 0);
const finalPrice: FinalPriceProps = {
  saves: 15.99,
  price: price,
  basePrice: 200.99,
};
  return (

 <ImageBackground
      source={require("../../assets/images/background2.png")}
      style={styles.backgroundImage}>
        <View style={{ flex: 1 }}>
      <ScrollView
  contentContainerStyle={{ paddingBottom: 235 }}
    showsVerticalScrollIndicator={false}
        style={{paddingTop:wp(15)}}
        showsHorizontalScrollIndicator={false}>
       {/* Title */}
       <View className="items-center"> 
        <Text  style={[styles.mainTitle, { fontSize: getFontSize(32) }]} >Количка</Text> 
       </View>
       <View className='items-center'>  
     {productArray.map((item, index) => (
  <ProductBox
    key={index}
    name={item.name}
    brand={item.brand}
    price={item.price}
    photo={item.photo}
  />
))}
     
<FinalPrice
price={finalPrice.price}
basePrice={finalPrice.basePrice}
saves={finalPrice.saves}/>
     </View>


        <View style={ { marginTop:wp(22) }}></View>
      </ScrollView>
      {/* Footer for price */}
<OverviewPrice price={price}/>

      </View>
      </ImageBackground>  

  )
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
    products: {
    width: wp(95),
    height: wp(38),
    borderRadius: 15,
    marginBottom: 16,
  },
  overviewContainer:{
    width: wp(95),
    height: wp(46),
    borderRadius: 15,
    marginBottom: 16,
  },
  mainTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: hp(3),
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    height: "100%",
    borderRadius: 15,
  },
  productImage: {
   
    height: "100%",
    borderRadius: 15,
  },
  productDetails: {
    marginLeft: 16,
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 8,
  },
  brand: {
    fontSize: 18,
    fontWeight: "600",
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    overflow: "hidden",
  },
  blurButton: {
    borderRadius: 9999,
    overflow: "hidden",
  },
  buttonTouchable: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Cart