import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { memo, useEffect, useRef } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
// import * as Location from 'expo-location';

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 51.1657,
  longitude: 10.4515,
  latitudeDelta: 9,
  longitudeDelta: 9,
};
// memo
const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter();
  // const mapRef = useRef<any>(null);

  // When the component mounts, locate the user
  // useEffect(() => {
  //   onLocateMe();
  // }, []);

  // When a marker is selected, navigate to the listing page
  const onMarkerSelected = (event: any) => {
    router.push(`/listing/${event.properties.id}`);
  };

  // Focus the map on the user's location
  // const onLocateMe = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});

  //   const region = {
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: 7,
  //     longitudeDelta: 7,
  //   };

  //   mapRef.current?.animateToRegion(region);
  // };

  // Overwrite the renderCluster function to customize the cluster markers
  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}>
        <View style={styles.marker}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontFamily: 'mon-sb',
            }}>
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        // ref={mapRef}
        animationEnabled={false}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}>
        {/* Render all our marker as usual */}
        {listings.features.map((item: any) => (
          <Marker
            coordinate={{
              latitude: item.properties.latitude,
              longitude: item.properties.longitude,
            }}
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.locateBtn} >
        <Ionicons name="navigate" size={24} color='#000' />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
  locateBtn: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

export default ListingsMap;



// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'
// import  { Marker, PROVIDER_GOOGLE }  from 'react-native-maps'
// import { defaultStyles } from '@/constants/Styles';
// import { ListingGeo } from '@/interfaces/listingGeo';
// import { useRouter } from 'expo-router';
// import MapView from 'react-native-map-clustering';



// interface Props {
//     listings:any;
// }

// const INITIAL_REGION = {
    
//     latitude:51.2506491473716,
//     longitude:10.37721542737684,
//     latitudeDelta:5,
//     longitudeDelta:5,
// } 

// const ListingMap = ({listings}:Props) => {
  
//     const router = useRouter();

//     const onMarkerSelected = (item:ListingGeo)=>{
//         router.push(`/listing/${item.properties.id}`)
//     };

//     const rederCluster = (cluster:any) => {
//       const {id,geometry,onPress,properties}= cluster;
//       const points = properties.point_count;

//       return(
//         <Marker 
//         key={`cluster-${id}`} 
//         onPress={onPress}
//         coordinate={{
//           latitude: geometry.coordinate[0],
//           longitude: geometry.coordinate[1]
//         }}>
//           <View style={styles.marker}><Text style={{color:'#000',textAlign:'center',fontFamily:'mon-sb'}}>{points}</Text></View>
//         </Marker>
//       )
//     }

//     return (
//     <View style={defaultStyles.container}>
//         <MapView  
//                 style={StyleSheet.absoluteFill}
//                 provider={PROVIDER_GOOGLE}
//                 showsUserLocation={true} 
//                 showsMyLocationButton={true}
//                 initialRegion={INITIAL_REGION} 
//                 clusterColor='#fff'
//                 clusterTextColor='#000'
//                 clusterFontFamily='mon-sb'
//                 renderCluster={rederCluster}
//                 >

//         {listings.features.map((item:ListingGeo)=>{
//             <Marker
//             key={item.properties.id}
//             onPress={()=>onMarkerSelected(item)}
//             coordinate={{
//                 latitude: +item.properties.latitude,
//                 longitude: +item.properties.longitude
//             }}>

//             <View style={styles.marker}>
//                 <Text style={styles.markerText}>€ {item.properties.price} </Text>
//             </View>

//             </Marker>
//         })}
//         </MapView>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     marker: {
//       padding: 8,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: '#fff',
//       elevation: 5,
//       borderRadius: 12,
//       shadowColor: '#000',
//       shadowOpacity: 0.1,
//       shadowRadius: 6,
//       shadowOffset: {
//         width: 1,
//         height: 10,
//       },
//     },
//     markerText: {
//       fontSize: 14,
//       fontFamily: 'mon-sb',
//     },
//     locateBtn: {
//       position: 'absolute',
//       top: 70,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 10,
//       elevation: 2,
//       shadowColor: '#000',
//       shadowOpacity: 0.1,
//       shadowRadius: 6,
//       shadowOffset: {
//         width: 1,
//         height: 10,
//       },
//     },
//   });


// export default ListingMap