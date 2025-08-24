import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'




const TabIcon = ({focused, icon, title}: any) =>{
  if(focused){

  
  return (
  
    <View className='bg-purple-200 flex flex-row min-w-[100px] h-12 rounded-full px-3 size-full justify-center items-center mt-4'>
        <Image source={icon} className='size-5'/>
        <Text className='ml-1 text-sm'>{title}</Text>
      </View>
  )
}
return(
  <View className='size-full justify-center items-center mt-4 '>
    <Image source={icon} className='size-5'/>
  </View>
)
}


const _layout = () => {
  return (
    <Tabs 
      screenOptions={{
        tabBarShowLabel:false,
        tabBarItemStyle:{width:'100%',height:"100%", justifyContent:"center", alignItems:"center"},
        tabBarStyle:{
          backgroundColor:'#683465',
          borderRadius:50,
          marginHorizontal:20,
          marginBottom:36,
          height:62,
          position:"absolute",
          borderWidth:1,
          borderColor: "#683465",
            flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'

        }}}>
        
      <Tabs.Screen
      name="index"
      options={{headerShown:false,
         title:"Home",
         tabBarIcon:({focused}) =>(   
         <TabIcon focused={focused} icon={require('../../assets/icons/home.png')} title={"Home"}/> )
         }}/>
             <Tabs.Screen
      name="cart"
       options={{headerShown:false,
         title:"Cart",
          tabBarIcon:({focused}) =>(   
         <TabIcon focused={focused} icon={require('../../assets/icons/cart.png')} title={"Cart"}/> )}}/>
             <Tabs.Screen
      name="categories"
       options={{headerShown:false,
         title:"Categories",
          tabBarIcon:({focused}) =>(   
         <TabIcon focused={focused} icon={require('../../assets/icons/categories.png')} title={"Categories"}/> )}}/>
      <Tabs.Screen
      name="search"
       options={{headerShown:false,
         title:"Search",
          tabBarIcon:({focused}) =>(   
         <TabIcon focused={focused} icon={require('../../assets/icons/search.png')} title={"Search"}/> )}}/>
      
        
    </Tabs>
  )
}

export default _layout