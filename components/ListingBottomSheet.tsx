import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'

import { Listingx } from '@/interfaces/listingx';
import Listing from './Listing';
import Colors from '@/constants/Colors';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
interface Props{
  listingz: Listingx[],
  category: string;
}

const ListingBottomSheet = ({listingz,category}:Props) => {
  
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(()=>['8%','86%'],[])
  const [refresh,setRefresh] = useState(0)
  const ShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1)
  }

  return (
    <BottomSheet
    ref={bottomSheetRef}
    index={1}
    snapPoints={snapPoints}
    enablePanDownToClose={false}
    handleIndicatorStyle={{ backgroundColor: Colors.grey }}
    style={styles.sheetContainer} >

    <View style={styles.contentContainer}>
      <Listing listing={listingz} category={category} refresh={refresh}   />
      <View style={styles.absoluteView} >
        <TouchableOpacity onPress={ShowMap} style={styles.btn}>
          <Text  style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
          <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  </BottomSheet>
);
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  drag:{
    width:25,
    height:5,
    backgroundColor:'#000',
    marginHorizontal:'auto',
    borderRadius:5,
},
  absoluteView: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#000',
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});


export default ListingBottomSheet