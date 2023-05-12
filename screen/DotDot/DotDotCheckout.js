import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, ImageBackground, Image } from 'react-native';
import Card from '../../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../../components/TitleText';
import * as Location from 'expo-location';
import SubText from '../../components/SubText';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const DotDotCheckout = ({ navigation }) => {




    /*  const renderGridItem = itemData => {
          return (
              ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
              <Gigs
                  name={itemData.item.name}
  
                  image={itemData.item.image}
                  location={itemData.item.location}
                  service={itemData.item.service}
                  remarks={itemData.item.remarks}
                  onSelect={() => { navigation.replace("QuoteScreen", { state: 0 }) }}
  
  
              />
          )
      }*/

    //Get the location of the user
    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions")
                return;
            }

            let curretLocation = await Location.getCurrentPositionAsync({});
            setLocation(curretLocation);
            console.log("Location:");
            console.log(curretLocation);
        };
        getPermissions();
        geocode();


    }, [])

    //Get the Town using Latitude and Longitude
    const geocode = async () => {
        const geocodedAddress = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });
        setAddress(geocodedAddress[0].city);
        console.log('reverseGeocode:');
        console.log(geocodedAddress[0].city);

    }








    return (


        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                style={styles.imageBackground}
            >


               

                <TitleText style={styles.title1}>New Gigs</TitleText>




                <View style={styles.gigs}>

                    <Card style={styles.prodCard}>

                        <View style={styles.prodImage}>
                            
                        </View>

                        <View style={styles.orderDetails}>
                            <View style={styles.textView}>
                                <Text style={styles.text1}>Catalyst 50ml</Text>
                                <Text style={styles.text2}>KES 1,200</Text>
                            </View>

                            <Card style={styles.additionsView}>

                                <View style={styles.textView1}>
                                    <Text style={styles.text3}>Quantity</Text>
                                    <Text style={styles.text2}>1</Text>
                                </View>



                            </Card>

                            <View style={styles.textView}>
                                <View style={styles.textView2}>
                                    <MaterialIcons name="timer" size={24} color="red" />
                                    <Text style={styles.text4}>15 - 20 mins</Text>
                                </View>


                                <View style={styles.textView2}>
                                    <MaterialIcons name="motorcycle" size={24} color="grey" />
                                    <Text style={styles.text4}>Deliver to Ebenezer</Text>
                                </View>


                            </View>


                            <View style={styles.textView}>
                                <View style={styles.textView2}>
                                    <MaterialIcons name="motorcycle" size={24} color="grey" />
                                    <Text style={styles.text5}>Courier Charges</Text>
                                </View>
                                <Text style={styles.text2}>KES 300</Text>
                            </View>

                            <View style={styles.mapView}>

                            </View>


                            <View style={styles.textView}>






                            </View>



                            <View style={styles.textView}>
                                <View>
                                    <Text style={styles.text2d}>Total</Text>
                                    <View style={styles.customerDet}>
                                        <Text style={styles.text5}>Mobile Money</Text>         
                                    </View>

                                </View>

                                <Text style={styles.text2e}>KES 1850</Text>
                            </View>



                            <View style={styles.buttonView}>
                                

                                <Card style={styles.acceptButton}>
                                    <TouchableOpacity onPress={() => { navigation.navigate("DotAcceptedRequest", { state: 0 }) }}>
                                        <Text style={styles.text2c}>
                                            Place Order
                                        </Text>
                                    </TouchableOpacity>
                                </Card>

                            </View>




                        </View>





                    </Card>






                </View>
            </ImageBackground>


        </View>





    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#001B2E',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        //paddingTop: 50
    },

    bannerimage: {
        height: '100%',
        width: '100%'

    },

    orderDetails: {
        padding: 10,
        justifyContent: 'space-between',
        height: '60%'
    },

    title1: {
        fontFamily: 'Lexend-light',
        fontSize: 25,
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold'



    },

    title2: {
        fontFamily: 'Lexend-light',
        fontSize: 20,
        //paddingLeft: 20,
        color: 'black',
        fontWeight: 'bold'



    },

    title3: {
        fontFamily: 'Lexend-light',
        fontSize: 17,
        //paddingLeft: 20,
        color: 'black',
        //  fontWeight: 'bold'



    },


    ////////////TEXT STYLES///////////////////
    text1: {
        fontFamily: 'Lexend-light',
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold'
    },

    text2: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },

    text2b: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold'
    },

    text2c: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },

    text2d: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text2e: {
        fontFamily: 'Lexend-bold',
        fontSize: 19,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text3: {
        fontFamily: 'Lexend-light',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },

    text4: {
        fontFamily: 'Lexend-bold',
        fontSize: 12,
        color: 'black',
        fontWeight: 'bold'
    },

    text5: {
        fontFamily: 'Lexend-light',
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold'
    },

    text6: {
        fontFamily: 'Lexend-light',
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold'
    },

    ////////////TEXT STYLES///////////////////

    gigs: {
        padding: 10
    },

    statsCard: {
        width: 164,
        height: 80,
        shadowColor: 'white',
        padding: 10
    },

    statsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50
    },
    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    bold: {
        fontWeight: '400',
        color: 'black',
        fontSize: 25

    },


    prodCard: {
        overflow: 'hidden',
        // padding: 10,
        shadowColor: 'white',
        height: Dimensions.get('window').height * 0.7,
        borderRadius: 15
    },

    prodImage: {
        borderBottomColor: 'black',
        height: '40%',
      //  backgroundColor: 'blue'
    },

    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

    },

    textView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2
    },

    textView2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 20,
        alignItems: 'center'
    },



    additionsView: {
        backgroundColor: '#F5F2F0',
        shadowOpacity: 0.15,
        height: Dimensions.get('window').height * 0.07,
        justifyContent: 'space-around'
    },

    mapView: {
        height: '25%',
        borderRadius: 15
    },



    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //  paddingTop: 10



    },



    declineButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,

        borderColor: 'red',
        borderWidth: 1
    },

    acceptButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,
        backgroundColor: '#8CC740',
    },

    callButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 23,
        shadowOpacity: 0.2,
        backgroundColor: '#17304A',
    },

    customerDet: {
        width: Dimensions.get('window').width * 0.38,

    },

    customerDet1: {
        width: Dimensions.get('window').width * 0.30,
        flexDirection: 'row',

    },

    profileImage: {
        backgroundColor: 'black',
        height: 56,
        width: 56,
        borderRadius: 100,
        overflow: 'hidden'
    },

    nameDetail: {
        width: '100%',
        paddingLeft: 10
    },
























});

export default DotDotCheckout;
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, ImageBackground, Image } from 'react-native';
import Card from '../../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../../components/TitleText';
import * as Location from 'expo-location';
import SubText from '../../components/SubText';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const DotDotCheckout = ({ navigation }) => {




    /*  const renderGridItem = itemData => {
          return (
              ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
              <Gigs
                  name={itemData.item.name}
  
                  image={itemData.item.image}
                  location={itemData.item.location}
                  service={itemData.item.service}
                  remarks={itemData.item.remarks}
                  onSelect={() => { navigation.replace("QuoteScreen", { state: 0 }) }}
  
  
              />
          )
      }*/

    //Get the location of the user
    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions")
                return;
            }

            let curretLocation = await Location.getCurrentPositionAsync({});
            setLocation(curretLocation);
            console.log("Location:");
            console.log(curretLocation);
        };
        getPermissions();
        geocode();


    }, [])

    //Get the Town using Latitude and Longitude
    const geocode = async () => {
        const geocodedAddress = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });
        setAddress(geocodedAddress[0].city);
        console.log('reverseGeocode:');
        console.log(geocodedAddress[0].city);

    }








    return (


        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                style={styles.imageBackground}
            >









                <View style={styles.gigs}>

                    <Card style={styles.prodCard}>

                        <Card style={styles.additionsView}>

                            <View style={styles.textView1}>
                                <View>
                                    <Text style={styles.text3}>DotDot Catalyst XTRA 50ml</Text>


                                    <View style={styles.remove}>
                                    <Text style={styles.text3}>Remove</Text>
                                        <MaterialIcons name="trash" size={20} color="grey" />
                                    </View>


                                </View>

                                <Text style={styles.text2}>KES 500.00</Text>
                            </View>



                        </Card>

                        <View style={styles.orderDetails}>
                            <View style={styles.textView}>
                                <Text style={styles.text1}>Delivery Details</Text>

                            </View>






                            <View style={styles.textView}>
                                <View style={styles.textView2}>
                                    <MaterialIcons name="motorcycle" size={24} color="grey" />
                                    <Text style={styles.text5}>Kayole</Text>
                                </View>
                                <MaterialIcons name="motorcycle" size={24} color="grey" />
                            </View>

                            <View style={styles.mapView}>

                            </View>


                            <View style={styles.textView}>
                                <View style={styles.textView2}>
                                    <MaterialIcons name="timer" size={24} color="red" />
                                    <Text style={styles.text4}>15 - 20 mins</Text>
                                </View>


                                <View style={styles.textView2}>
                                    <MaterialIcons name="motorcycle" size={24} color="grey" />
                                    <Text style={styles.text4}>Deliver to Ebenezer</Text>
                                </View>


                            </View>


                            <View style={styles.textView}>






                            </View>



                            <View style={styles.textView}>
                                <View>
                                    <Text style={styles.text2d}>Total</Text>
                                    <View style={styles.customerDet}>
                                        <Text style={styles.text5}>Mobile Money</Text>

                                    </View>

                                </View>

                                <Text style={styles.text2e}>KES 1850</Text>
                            </View>



                            <View style={styles.buttonView}>


                                <Card style={styles.acceptButton}>
                                    <TouchableOpacity onPress={() => { navigation.navigate("DotAcceptedRequest", { state: 0 }) }}>
                                        <Text style={styles.text2c}>
                                            Place Order
                                        </Text>
                                    </TouchableOpacity>
                                </Card>

                            </View>




                        </View>





                    </Card>






                </View>
            </ImageBackground>


        </View>





    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#001B2E',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        //paddingTop: 50
    },

    bannerimage: {
        height: '100%',
        width: '100%'

    },

    orderDetails: {
        padding: 10,
        justifyContent: 'space-between',
        height: '60%'
    },

    title1: {
        fontFamily: 'Lexend-light',
        fontSize: 25,
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold'



    },

    title2: {
        fontFamily: 'Lexend-light',
        fontSize: 20,
        //paddingLeft: 20,
        color: 'black',
        fontWeight: 'bold'



    },

    title3: {
        fontFamily: 'Lexend-light',
        fontSize: 17,
        //paddingLeft: 20,
        color: 'black',
        //  fontWeight: 'bold'



    },


    ////////////TEXT STYLES///////////////////
    text1: {
        fontFamily: 'Lexend-light',
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold'
    },

    text2: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },

    text2b: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold'
    },

    text2c: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },

    text2d: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text2e: {
        fontFamily: 'Lexend-bold',
        fontSize: 19,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text3: {
        fontFamily: 'Lexend-light',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },

    text4: {
        fontFamily: 'Lexend-bold',
        fontSize: 12,
        color: 'black',
        fontWeight: 'bold'
    },

    text5: {
        fontFamily: 'Lexend-light',
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold'
    },

    text6: {
        fontFamily: 'Lexend-light',
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold'
    },

    ////////////TEXT STYLES///////////////////

    gigs: {
        padding: 10,
        paddingTop: Dimensions.get('window').height * 0.25,
    },

    statsCard: {
        width: 164,
        height: 80,
        shadowColor: 'white',
        padding: 10
    },

    statsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50
    },
    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    bold: {
        fontWeight: '400',
        color: 'black',
        fontSize: 25

    },


    prodCard: {
        overflow: 'hidden',
        // padding: 10,
        shadowColor: 'white',
     //   height: Dimensions.get('window').height * 0.7,
        borderRadius: 15,
        
    },

    prodImage: {
        borderBottomColor: 'black',
        height: '40%',
        //  backgroundColor: 'blue'
    },

    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

    },

    textView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2
    },

    textView2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 20,
        alignItems: 'center'
    },



    additionsView: {
        backgroundColor: '#F5F2F0',
        shadowOpacity: 0.15,
        height: Dimensions.get('window').height * 0.07,
        justifyContent: 'space-around'
    },

    mapView: {
        height: '25%',
        borderRadius: 15
    },



    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //  paddingTop: 10



    },



    declineButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,

        borderColor: 'red',
        borderWidth: 1
    },

    acceptButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,
        backgroundColor: '#8CC740',
    },

    callButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 23,
        shadowOpacity: 0.2,
        backgroundColor: '#17304A',
    },

    customerDet: {
        width: Dimensions.get('window').width * 0.38,

    },

    customerDet1: {
        width: Dimensions.get('window').width * 0.30,
        flexDirection: 'row',

    },

    profileImage: {
        backgroundColor: 'black',
        height: 56,
        width: 56,
        borderRadius: 100,
        overflow: 'hidden'
    },

    nameDetail: {
        width: '100%',
        paddingLeft: 10
    },

remove: {
    flexDirection: 'row',  
},






















});

export default DotDotCheckout;