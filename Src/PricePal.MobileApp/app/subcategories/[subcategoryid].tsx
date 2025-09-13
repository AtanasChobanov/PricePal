import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { categoriesArray, Subcategory } from '../(tabs)/categories';

const CategoryPage: React.FC = () => {
  const { id, categoryName } = useLocalSearchParams();
  const router = useRouter();
  const [subcategoryList, setSubcategoryList] = useState<Subcategory[]>([]);

  useEffect(() => {
    if (!id) return;
    const category = categoriesArray.find(cat => cat.id === id);
    if (category) setSubcategoryList(category.subcategories);
  }, [id]);

  const handleSubcategoryPress = (subcategory: Subcategory) => {
    router.push({
      pathname: '/productsCategories/[subcategoryProducsId]',
      params: {
        subcategoryId: subcategory.id,
        subcategoryName: subcategory.name,
        categoryId: id,
        categoryName: categoryName
      }
    });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">{categoryName}</Text>

        <View className="flex-row flex-wrap">
          {subcategoryList.map(subcategory => (
            <View key={subcategory.id} className="w-1/2 p-2">
              <TouchableOpacity onPress={() => handleSubcategoryPress(subcategory)}>
                <LinearGradient
                  className="p-4 rounded-lg items-center justify-center min-h-[80px]"
                  colors={['rgba(240,240,240,1)', 'rgba(220,220,220,1)']}
                  start={{ x: 0, y: 0 }}
                >
                  <Text className="text-center font-medium text-gray-800">
                    {subcategory.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryPage;
