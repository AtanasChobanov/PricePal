import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

export interface Subcategory {
  id: string;
  name: string;
}

export interface CategoriesProps {
  text: string;
  link: string;
  id: string;
  subcategories: Subcategory[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  subcategoryId: string;
}

export const productsArray: Product[] = [
  { id: 'apple-1', name: 'Ябълка', price: 1.2, subcategoryId: 'fruits' },
  { id: 'banana-1', name: 'Банан', price: 1.5, subcategoryId: 'fruits' },
  { id: 'carrot-1', name: 'Морков', price: 0.8, subcategoryId: 'vegetables' },
  { id: 'milk-1', name: 'Мляко 1л', price: 2, subcategoryId: 'milk' },
];

export const categoriesArray: CategoriesProps[] = [
  { 
    id: "fruits-vegetables", 
    text: "🍎Плодове и зеленчуци", 
    link: "fruits-vegetables",
    subcategories: [
      { id: "fruits", name: "Плодове" },
      { id: "vegetables", name: "Зеленчуци" },
      { id: "fresh-herbs", name: "Свежи подправки" }
    ]
  },
  { 
    id: "meat-poultry", 
    text: "🥩Месо и птици", 
    link: "meat-poultry",
    subcategories: [
      { id: "fresh-meat", name: "Прясно месо (свинско, телешко, пилешко, агнешко)" },
      { id: "processed-meat", name: "Преработено месо (колбаси, салами)" },
      { id: "bacon-ham", name: "Бекон и шунка" }
    ]
  },
  { 
    id: "fish-seafood", 
    text: "🐟Риба и морски дарове", 
    link: "fish-seafood",
    subcategories: [
      { id: "fresh-fish", name: "Прясна риба" },
      { id: "frozen-seafood", name: "Замразени морски дарове" }
    ]
  },
  { 
    id: "dairy", 
    text: "🧀Млечни продукти", 
    link: "dairy",
    subcategories: [
      { id: "milk", name: "Мляко" },
      { id: "yogurt", name: "Кисело мляко" },
      { id: "cheese", name: "Сирене и кашкавал" },
      { id: "butter", name: "Масло и маргарин" },
      { id: "cream", name: "Сметана" }
    ]
  },
  { 
    id: "bakery", 
    text: "🍞Хлебни изделия", 
    link: "bakery",
    subcategories: [
      { id: "bread", name: "Хляб" },
      { id: "banitsi", name: "Баници и закуски" },
      { id: "sweets", name: "Сладкиши" },
      { id: "tortillas", name: "Тортили и питки" }
    ]
  },
  { 
    id: "frozen-foods", 
    text: "❄️Замразени храни", 
    link: "frozen-foods",
    subcategories: [
      { id: "frozen-vegetables", name: "Замразени зеленчуци" },
      { id: "ready-meals", name: "Готови ястия" },
      { id: "ice-cream", name: "Сладолед и десерти" },
      { id: "frozen-pizza", name: "Замразена пица" }
    ]
  },
  { 
    id: "canned-foods", 
    text: "🥫Консерви и пакетирани храни", 
    link: "canned-foods",
    subcategories: [
      { id: "canned-vegetables", name: "Консервирани зеленчуци" },
      { id: "canned-fruits", name: "Консервирани плодове" },
      { id: "beans-lentils", name: "Бобови и леща" },
      { id: "soups-broths", name: "Супи и бульони" },
      { id: "tomato-products", name: "Доматени продукти" }
    ]
  },
  { 
    id: "staples-spices", 
    text: "🥖Основни продукти и подправки", 
    link: "staples-spices",
    subcategories: [
      { id: "rice", name: "Ориз" },
      { id: "pasta", name: "Макарони и спагети" },
      { id: "flour-baking", name: "Брашно и продукти за печене" },
      { id: "sugar-sweeteners", name: "Захар и подсладители" },
      { id: "spices-herbs", name: "Подправки и билки" },
      { id: "oil-vinegar", name: "Олио, зехтин и оцет" }
    ]
  },
  { 
    id: "snacks", 
    text: "🍿Снаксове", 
    link: "snacks",
    subcategories: [
      { id: "chips-crackers", name: "Чипсове и крекери" },
      { id: "nuts-seeds", name: "Ядки и семена" },
      { id: "popcorn", name: "Пуканки" }
    ]
  },
  { 
    id: "sweets-desserts", 
    text: "🍫Сладки и десерти", 
    link: "sweets-desserts",
    subcategories: [
      { id: "chocolate", name: "Шоколад" },
      { id: "candies", name: "Бонбони" },
      { id: "biscuits-waffles", name: "Бисквити и вафли" }
    ]
  },
  { 
    id: "breakfast-cereals", 
    text: "🥣Закуска и зърнени продукти", 
    link: "breakfast-cereals",
    subcategories: [
      { id: "oats", name: "Овесени ядки" },
      { id: "muesli", name: "Мюсли" },
      { id: "cornflakes", name: "Корнфлейкс" }
    ]
  },
  { 
    id: "drinks", 
    text: "🥤Напитки", 
    link: "drinks",
    subcategories: [
      { id: "water", name: "Вода" },
      { id: "juices", name: "Сокове" },
      { id: "soda", name: "Газирани напитки" },
      { id: "tea", name: "Чай" },
      { id: "coffee", name: "Кафе" },
      { id: "energy-drinks", name: "Енергийни напитки" }
    ]
  },
  { 
    id: "alcohol", 
    text: "🍷Алкохол", 
    link: "alcohol",
    subcategories: [
      { id: "beer", name: "Бира" },
      { id: "wine", name: "Вино" },
      { id: "spirits", name: "Ракия, уиски и други спиртни напитки" }
    ]
  },
  { 
    id: "cleaning-laundry", 
    text: "🧼Почистващи и перилни препарати", 
    link: "cleaning-laundry",
    subcategories: [
      { id: "laundry-detergents", name: "Препарати за пране" },
      { id: "softeners", name: "Омекотители" },
      { id: "dish-detergents", name: "Препарати за съдове" },
      { id: "all-purpose-cleaners", name: "Универсални почистващи препарати" },
      { id: "bathroom-cleaners", name: "Препарати за баня и WC" }
    ]
  },
  { 
    id: "paper-products", 
    text: "🧻Хартиени продукти", 
    link: "paper-products",
    subcategories: [
      { id: "toilet-paper", name: "Тоалетна хартия" },
      { id: "kitchen-rolls", name: "Кухненски ролки" },
      { id: "napkins-towels", name: "Салфетки и кърпи" }
    ]
  },
  { 
    id: "disposables", 
    text: "🥡Еднократни съдове и опаковки", 
    link: "disposables",
    subcategories: [
      { id: "bags", name: "Торбички" },
      { id: "foil", name: "Фолио и стреч фолио" },
      { id: "plates-cups-utensils", name: "Еднократни чинии, чаши и прибори" }
    ]
  },
  { 
    id: "organization-storage", 
    text: "📦Организация и съхранение", 
    link: "organization-storage",
    subcategories: [
      { id: "containers-boxes", name: "Контейнери и кутии" },
      { id: "organizers", name: "Органайзери" }
    ]
  },
  { 
    id: "pet-care", 
    text: "🐾Грижа за домашни любимци", 
    link: "pet-care",
    subcategories: [
      { id: "pet-food", name: "Храна за кучета и котки" },
      { id: "pet-accessories", name: "Аксесоари за домашни любимци" }
    ]
  },
  { 
    id: "toiletries", 
    text: "🧴Тоалетни принадлежности", 
    link: "toiletries",
    subcategories: [
      { id: "shampoos-conditioners", name: "Шампоани и балсами" },
      { id: "shower-gels-soaps", name: "Душ гелове и сапуни" },
      { id: "toothpaste-mouthwash", name: "Паста за зъби и вода за уста" },
      { id: "deodorants", name: "Дезодоранти" }
    ]
  },
  { 
    id: "skin-care", 
    text: "💆‍♀️Грижа за кожата", 
    link: "skin-care",
    subcategories: [
      { id: "creams-lotions", name: "Кремове и лосиони" },
      { id: "sun-protection", name: "Слънцезащита" },
      { id: "face-masks", name: "Маски за лице" }
    ]
  },
  { 
    id: "hair-care", 
    text: "💇‍♀️Грижа за косата", 
    link: "hair-care",
    subcategories: [
      { id: "hair-dye", name: "Бои за коса" },
      { id: "hair-gels-lacquers", name: "Гелове и лакове за коса" }
    ]
  },
  { 
    id: "health-wellness", 
    text: "💊Здраве и уелнес", 
    link: "health-wellness",
    subcategories: [
      { id: "vitamins-supplements", name: "Витамини и добавки" },
      { id: "first-aid", name: "Първа помощ" },
      { id: "otc-medicine", name: "Лекарства без рецепта" }
    ]
  },
  { 
    id: "baby-products", 
    text: "👶Бебешки продукти", 
    link: "baby-products",
    subcategories: [
      { id: "diapers", name: "Пелени" },
      { id: "wipes", name: "Мокри кърпички" },
      { id: "baby-food", name: "Бебешка храна" }
    ]
  },
  { 
    id: "kitchen-serving", 
    text: "🍳Кухня и сервиране", 
    link: "kitchen-serving",
    subcategories: [
      { id: "pots-pans", name: "Тенджери, тигани" },
      { id: "plates-utensils", name: "Чинии и прибори" },
      { id: "kitchen-accessories", name: "Кухненски аксесоари" }
    ]
  },
  { 
    id: "small-appliances", 
    text: "🔌Електроуреди", 
    link: "small-appliances",
    subcategories: [
      { id: "small-appliances", name: "Малки уреди (чайници, тостери, блендери)" }
    ]
  },
  { 
    id: "electronics-accessories", 
    text: "🔋Електроника и аксесоари", 
    link: "electronics-accessories",
    subcategories: [
      { id: "chargers", name: "Зарядни" },
      { id: "batteries", name: "Батерии" }
    ]
  },
  { 
    id: "textiles-clothing", 
    text: "🧦Текстил и облекло", 
    link: "textiles-clothing",
    subcategories: [
      { id: "socks", name: "Чорапи" },
      { id: "towels", name: "Хавлии" },
      { id: "bedding", name: "Спално бельо" }
    ]
  },
  { 
    id: "office-stationery", 
    text: "🖊️Офис и канцеларски материали", 
    link: "office-stationery",
    subcategories: [
      { id: "notebooks", name: "Тетрадки" },
      { id: "pens", name: "Химикалки" }
    ]
  },
  { 
    id: "car-products", 
    text: "🚗Автомобилни продукти", 
    link: "car-products",
    subcategories: [
      { id: "car-cleaning", name: "Почистващи препарати за автомобили" },
      { id: "oils-fluids", name: "Масла и течности" }
    ]
  },
  { 
    id: "seasonal-garden", 
    text: "🌱Сезонни и градински продукти", 
    link: "seasonal-garden",
    subcategories: [
      { id: "plants", name: "Растения" },
      { id: "garden-tools", name: "Градински инструменти" }
    ]
  },
  { 
    id: "sports-leisure", 
    text: "🏋️‍♂️Спорт и свободно време", 
    link: "sports-leisure",
    subcategories: [
      { id: "fitness-accessories", name: "Фитнес аксесоари" },
      { id: "tourist-equipment", name: "Туристическо оборудване" }
    ]
  },
];

// Function to determine category type decides on colors
const getCategoryColors = (categoryText: string): string[] => {
  
  // Food & Beverages
  const foodCategories = [
    "🍎Плодове и зеленчуци",
    "🥩Месо и птици",
    "🐟Риба и морски дарове",
    "🧀Млечни продукти",
    "🍞Хлебни изделия",
    "❄️Замразени храни",
    "🥫Консерви и пакетирани храни",
    "🥖Основни продукти и подправки",
    "🍿Снаксове",
    "🍫Сладки и десерти",
    "🥣Закуска и зърнени продукти",
    "🥤Напитки",
    "🍷Алкохол"
  ];

  // Non-Food Household Products  
  const householdCategories = [
    "🧼Почистващи и перилни препарати",
    "🧻Хартиени продукти",
    "🥡Еднократни съдове и опаковки",
    "📦Организация и съхранение",
    "🐾Грижа за домашни любимци"
  ];

  // Personal Care & Health
  const personalCareCategories = [
    "🧴Тоалетни принадлежности",
    "💆‍♀️Грижа за кожата",
    "💇‍♀️Грижа за косата",
    "💊Здраве и уелнес",
    "👶Бебешки продукти"
  ];

  // Non-Food General Merchandise
  const generalMerchandiseCategories = [
    "🍳Кухня и сервиране",
    "🔌Електроуреди",
    "🔋Електроника и аксесоари",
    "🧦Текстил и облекло",
    "🖊️Офис и канцеларски материали",
    "🚗Автомобилни продукти",
    "🌱Сезонни и градински продукти",
    "🏋️‍♂️Спорт и свободно време"
  ];

  if (foodCategories.includes(categoryText)) {
    // Green gradient 
    return ['rgba(203,230,246,1)', 'rgba(143,228,201,1)'] as [string, string];
  } else if (householdCategories.includes(categoryText)) {
    // Blue gradient 
    return ['rgba(255,218,185,1)', 'rgba(255,182,193,1)'] as [string, string];
  } else if (personalCareCategories.includes(categoryText)) {
    // Pink/Purple gradient 
    return ['rgba(221,214,243,1)', 'rgba(196,181,253,1)'] as [string, string];
  } else if (generalMerchandiseCategories.includes(categoryText)) {
    // Orange gradient
    return ['rgba(143,228,201,1)', 'rgba(150,210,255,1)'] as [string, string];
  } else {
    // Default gradient
    return ['rgba(203,230,246,1)', 'rgba(143,228,201,1)'] as [string, string];
  }
};

// Fixed 2 columns
const numColumns = 2;

const Categories = () => {
  const router = useRouter();

  const handleCategoryPress = (category: CategoriesProps) => {
    router.push({
      pathname: '/subcategories/[subcategoryid]',
      params: { 
        subcategoryid: category.id,
        categoryName: category.text,
        subcategories: JSON.stringify(category.subcategories)
      }
    });
  };

  const renderCategoryItem = ({ item }: { item: CategoriesProps }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        onPress={() => handleCategoryPress(item)} 
        style={styles.button}
      >
        <LinearGradient
          colors={getCategoryColors(item.text) as [string, string]}
          start={{ x: 0, y: 1 }}
          style={styles.categories}
        >
          <Text style={styles.categoryText}>{item.text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const getItemLayout = (data: any, index: number) => ({
    length: hp(10) + 16, // item height + margins
    offset: (hp(10) + 16) * Math.floor(index / numColumns),
    index,
  });

  return (
    <ImageBackground
      source={require("../../assets/images/background2.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Избери си категория</Text>
        </View>
        
        {/* Categories FlatList */}
        <FlatList
          data={categoriesArray}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.row}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 55,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: getFontSize(32),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 2,
  },
  flatListContainer: {
    paddingHorizontal: 2,
    paddingBottom: hp(14),
  },
  row: {
    flexWrap: 'wrap',
  },
  itemContainer: {
    margin: 8,
  },
  categories: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  categoryText: {
    fontSize: getFontSize(16),
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
  },
});

export default Categories;