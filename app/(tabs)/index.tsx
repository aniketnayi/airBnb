import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listing from '@/components/Listing'
import ListingMap from '@/components/ListingMap'
import listingData from '@/assets/data/airbnb-listings.json'
import listingDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingBottomSheet from '@/components/ListingBottomSheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Page = () => {
  
  const [category,setCategory] = useState('Tiny Home');
  const items = useMemo(()=> listingData as any, []);
  const geoItems = useMemo(()=> listingDataGeo as any, []);

  const onDataChanged = (category:string)=>{
    console.log('changed',category);
    setCategory(category);
  }

  return (
    <View style={{flex:1}}>
      <GestureHandlerRootView style={{flex:1}}>
        <Stack.Screen
        options={{
          header:()=> <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
        />
        {/* <Listing listing={items} category={category}/> */}
        <ListingMap listings={geoItems} />
        <ListingBottomSheet listingz={items} category={category} />
      </GestureHandlerRootView>
    </View>
  )
}

export default Page