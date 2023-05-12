import React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import TitleText from '../components/TitleText';
import Listing from '../components/Listing';
import { FUNDIS } from '../data/services';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';


const ListingScreen = ({ navigation }) => {

    const [latlng, setLatLng] = useState({})

    const checkPermission = async () => {
      const hasPermission = await Location.requestForegroundPermissionsAsync();
      if (hasPermission.status === 'granted') {
        const permission = await askPermission();
        return permission
      }
      return true
    };
  
    const askPermission = async () => {
      const permission = await Location.requestBackgroundPermissionsAsync();
      return permission.status === 'granted';
    };
  
  
    const getLocation = async () => {
      try {
        const { granted } = await Location.requestBackgroundPermissionsAsync();
        if (!granted) return;
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        setLatLng({ latitude: latitude, longitude: longitude })
      } catch (err) {
  
      }
    }
  
    const _map = useRef(1);
  
    useEffect(() => {
      checkPermission();
      getLocation()
      console.log(latlng)
        , []
    })

    const renderGridItem = itemData => {
        return (
            ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
            <Listing
                name={itemData.item.name}

                image={itemData.item.image}
                type={itemData.item.type}
                completed={itemData.item.completed}
                onSelect={() => { navigation.navigate("DescriptionScreen", { state: 0 }) }}


            />
        )
    }




    return (


        <View style={styles.container}>
             <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                
            > 
        
            </MapView>



            <View style={styles.gridView}>


                <Card style={styles.card}>

                    <View style={styles.flatlist}>
                        <FlatList
                            keyExtractor={(item, index) => item.id}
                            data={FUNDIS}
                            renderItem={renderGridItem}
                            numColumns={1}
                        />

                    </View>






                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => { navigation.navigate("QuoteScreen", { state: 0 }) }}>

                            <Card style={styles.submitbutton}>


                                <TitleText style={styles.Text}>Next</TitleText>


                            </Card>

                        </TouchableOpacity>
                    </View>


                </Card>


            </View>


        </View>





    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, alpha)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    flatlist: {
        paddingTop: 0,
        backgroundColor: 'transparent'
    },

    card: {
        flex: 1,
        backgroundColor: '#F5F2F0',

        width: Dimensions.get('window').width * 1,
        paddingTop: 47,
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.75,
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    gridView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width * 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.75,

    },

    buttonText: {
        fontWeight: 'bold',

    },

    input: {
        width: '80%',

        height: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white'
    },


    buttonText: {
        fontWeight: 'bold',

    },


    button: {
        //  flex: 1,


        width: Dimensions.get('window').width * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 24,
        shadowOpacity: 0.2,
    },

    imageview: {
        width: '80%',

        height: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'
    },

    Text: {
        fontWeight: 'bold',

    },


    submitbutton: {
        //  flex: 1,

        backgroundColor: '#8CC740',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        shadowOpacity: 0.2,
    },


    buttonView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 45,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,

    },
    map: {
        height: "100%",
        width: "100%",
      },


});

export default ListingScreen;