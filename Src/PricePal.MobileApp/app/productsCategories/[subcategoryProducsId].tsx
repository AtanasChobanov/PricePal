import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Product, productsArray } from '../(tabs)/categories';

const ProductsPage: React.FC = () => {
  const { subcategoryId, subcategoryName } = useLocalSearchParams();
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    if (!subcategoryId) return;
    // Filter products by subcategoryId
    const filtered = productsArray.filter(p => p.subcategoryId === subcategoryId);
    setProductsList(filtered);
  }, [subcategoryId]);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">{subcategoryName}</Text>

      <View className="flex-col">
        {productsList.map(product => (
          <View key={product.id} className="mb-3 p-3 border rounded-lg">
            <Text className="text-lg font-semibold">{product.name}</Text>
            <Text className="text-gray-600">Цена: {product.price} лв</Text>
            {product.description && (
              <Text className="text-gray-500">{product.description}</Text>
            )}
            <TouchableOpacity className="mt-2 bg-blue-500 p-2 rounded">
              <Text className="text-white text-center">Добави в количката</Text>
            </TouchableOpacity>
          </View>
        ))}
        {productsList.length === 0 && (
          <Text className="text-gray-500 text-center mt-10">Няма продукти в тази подкатегория</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductsPage;