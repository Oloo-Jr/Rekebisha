import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, ImageBackground, FlatList, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import { TextInput } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { db, auth } from '../Database/config';
import * as Location from 'expo-location';
import firebase from 'firebase';

const DotDotCart = ({ navigation, route }) => {

    const [currentQuantity, setCurrentQuantity] = useState(route.params.currentQuantity2);
    const [currentPrice, setCurrentPrice] = useState(route.params.currentPrice);
    const [currentImage, setCurrentImage] = useState(route.params.currentImage);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [userDisplayName, setUserDisplayName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [taken, setTaken] = useState("No");

    const getUserDetails = async () => {
        const doc = await db.collection('users').doc(auth.currentUser.uid).get();
        console.log(doc.data());
        const username = doc.data().username;
        const phoneNumber = doc.data().phonenumber;
        setUserDisplayName(username);
        setUserPhoneNumber(phoneNumber);
    
  }
    const getLocation = async () => {
        try {
          const { granted } = await Location.requestBackgroundPermissionsAsync();
          if (!granted) return;
          const {
            coords: { latitude, longitude },
          } = await Location.getCurrentPositionAsync();
          setLatitude(latitude)
          setLongitude(longitude)
        } catch (err) {
    
        }
      }
  
      useEffect(() => {
        getLocation();
        getUserDetails();
      }, [])
      
   const BuyDotDotProduct = () =>{
    setIsLoading(true);
         db.collection("DotDotOrders"). doc().set({
            userDisplayName,
            currentQuantity,
            currentPrice,
            longitude,
            latitude,
            userPhoneNumber,
            uid: auth.currentUser.uid,
            status: 'pending',
            agentId: null,
            TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        //navigation
        navigation.navigate('LoadingScreen');     
    }


    return (

        <View style={styles.container}>

            <ImageBackground
                source={require('../assets/4k-background.png')}
                resizeMode="cover"
                style={styles.imageBackground}
            >

                <View style={styles.banner}>

                    <Image
                        source={require('../assets/DotDotBanner.jpg')}
                        style={styles.bannerimage}
                    // resizeMode="cover" 
                    />

                    <View style={styles.icons}>
                        <View style={styles.back}>
                            <View
                                style={styles.iconView}
                            >
                                <Icon
                                    type="material-community"
                                    name="arrow-left"
                                    color="white"
                                    size={35}
                                    onPress={() => { navigation.navigate("DotDotScreen", { state: 0 }) }}
                                />

                            </View>

                            <TitleText style={styles.subText}>Back</TitleText>
                        </View>



                    </View>
                </View>




                <View style={styles.cartview}>



                <Card style={styles.prodCard}>

<View style={styles.cartprodImage}>
<Image
        source={currentImage}
        style={styles.bannerimage}
    // resizeMode="cover" 
    />
</View>

<View style={styles.orderDetails}>
    <View style={styles.textView}>
        <Text style={styles.text12}>Quantity: {currentQuantity}</Text>
        <Text style={styles.text22}>{currentPrice}</Text>
    </View>

    

    <View style={styles.textView}>
       

        <View style={styles.textView2}>
            <MaterialIcons name="timer" size={24} color="red" />
            <Text style={styles.text42}>25 - 30 mins</Text>
        </View>

        <View style={styles.textView2}>
            
           {/* <Text  style={styles.text42}>Quantity</Text>*/}
        </View>


    </View>
    <View style={styles.textView}>
       

        <View   style={styles.textView2}>
            <MaterialIcons onPress={() => setIsButtonPressed(true)} name="description" size={24} color="blue" />
            <Text style={styles.text42}>Description</Text>
            
        </View>

        <View style={styles.textView2}>
            
           {/* <Text  style={styles.text42}>Quantity</Text>*/}
        </View>


    </View>
    <View style={styles.textView}>
       

       <View style={styles.textView2}>
       {isButtonPressed &&
       <Text style={styles.text42}>The Dalhin Efficiamax®Ten-35 fuel treatment is a
                combustion catalyst that gives your engine greater
                fuel efficiency. Our product decreases combustible
                carbon residue by providing a more complete burn.
                More efficient combustion yields to more useful power
                per gallon of fuel.Dalhin Efficiamax® Ten-35 is the
                ONLY fuel treatment in the world that reduces soot
                and smoke and other harmful emissions a
                guaranteed 40%, and in many cases much higher</Text>}
           
           
       </View>

       <View style={styles.textView2}>
           
          {/* <Text  style={styles.text42}>Quantity</Text>*/}
       </View>


   </View>


 





    



<View style={styles.textView}>

<Text  style={styles.text2d2}>Total</Text>
<Text style={styles.text2e2}>{currentPrice}</Text>
</View>


    <View style={styles.buttonView1}>


        <Card style={styles.acceptButton}>
            <TouchableOpacity 
            onPress={BuyDotDotProduct}>
            <Text style={styles.text2c2}>
                   Add to Cart
                </Text>

            </TouchableOpacity>
        </Card>

    </View>




</View>





</Card>





                    








                </View>






                <View style={styles.productcard}>
                    <Card style={styles.Product}>

                        <View style={styles.prodImageView}>

                            <View style={styles.productImage}>
                                <Image
                                    source={require('../assets/Product2.jpg')}
                                    style={styles.image}
                                // resizeMode="cover" 
                                />

                            </View>

                        </View>


                        <View style={styles.buyView}>

                            <TitleText style={styles.prodName2}>Catalyst 1</TitleText>


                            <View style={styles.BuyView}>
                                <TitleText style={styles.prodName2}>KES 500</TitleText>



                                <View style={styles.addtocart}>
                                    <View style={styles.buttonView}>
                                        <TouchableOpacity onPress={() => { navigation.navigate("", { state: 0 }) }}>




                                            <TitleText style={styles.prodName}>Add to Cart</TitleText>




                                        </TouchableOpacity>
                                    </View>

                                </View>




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

        // alignItems: 'center',
        justifyContent: 'space-around'
    },




    image: {
        height: Dimensions.get('window').width * 0.4,
        width: Dimensions.get('window').width * 0.4,

    },

    back: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },


    productcard: {
        padding: 10

    },


    icons: {
        position: 'absolute',
        top: 50,
        height: '13%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 30,
        alignContent: 'center',
        alignItems: 'center'
    },


    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    banner: {
        height: Dimensions.get('window').height * 0.15,
        width: Dimensions.get('window').width * 1,
        borderBottomLeftRadius: 50
    },

    subText: {
        fontFamily: 'Lexend-light',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        padding: 2
    },

    iconView: {
        // position: "absolute",
        //top: 50,
        //left: 12,
        //  backgroundColor: '#8CC740',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 2,
        //zIndex: 8
    },

    bannerimage: {
        height: '100%',
        width: '100%'

    },

    cartview: {
        justifyContent: 'space-between',
      //  flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.17,
        borderBottomColor: '#F5F2F0'

    },

    imageView: {
        //flex: 1,
        backgroundColor: '#17304A',
        alignItems: 'center',
        justifyContent: 'center',
        //  paddingLeft: '40%',
        //  height: Dimensions.get('window').width * 0.24,
        // width: Dimensions.get('window').width * 0.24,
        borderRadius: 20,
        overflow: 'hidden'


    },

    imageView2: {
        //flex: 1,
        backgroundColor: '#17304A',
        alignItems: 'center',
        justifyContent: 'center',
        //  paddingLeft: '40%',
        height: Dimensions.get('window').width * 0.21,
        width: Dimensions.get('window').width * 0.21,
        borderRadius: 10,
        overflow: 'hidden'


    },

    imagerow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    prodImage: {
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').width * 0.45,
        justifyContent: 'space-between'

    },

    Product: {

        height: Dimensions.get('window').height * 0.24,
        width: Dimensions.get('window').width * 0.41,
        overflow: 'hidden',
    },

    prodImageView: {
        width: '100%',
        height: '60%',

        alignItems: 'center',
        justifyContent: 'center',


    },

    productImage: {
        //flex: 1,
        backgroundColor: '#17304A',
        alignItems: 'center',
        justifyContent: 'center',
        //  paddingLeft: '40%',
        height: Dimensions.get('window').width * 0.24,
        width: Dimensions.get('window').width * 0.24,
        //borderRadius: 20,


    },


    buyView: {
        height: '40%',
        backgroundColor: '#F5F2F0',

    },

    prodName: {
        fontFamily: 'Lexend-light',

        color: '#F5F2F0',
        fontSize: 15,
        padding: 2
    },

    prodName2: {
        fontFamily: 'Lexend-light',

        color: 'Blacks',
        fontSize: 15,
        padding: 2
    },

    addtocart: {
        //  flexDirection: 'row',

        height: 20,
        width: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    buttonView: {


        // zIndex: 30,
        // position: 'absolute',
        // bottom: 92,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 100,
        height: 25,
        backgroundColor: '#8CC740',
        borderRadius: 10

    },

    text1: {
        fontFamily: 'Lexend-bold',
        fontSize: 19,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text2: {
        fontFamily: 'Lexend-bold',
        fontSize: 19,
        color: '#F5F2F0',
        fontWeight: 'bold'
    },

    text3: {
        fontFamily: 'Lexend-lighter',
        fontSize: 15,
        color: '#F5F2F0',

    },

    text4: {
        fontFamily: 'Lexend-lighter',
        fontSize: 18,
        color: '#F5F2F0',

    },

    details: {
        width: Dimensions.get('window').width * 0.35,
    },


    ////
    prodCard: {
        overflow: 'hidden',
        // padding: 10,
        shadowColor: 'white',
        height: Dimensions.get('window').height * 0.53,
        borderRadius: 15
    },

    cartprodImage: {
        borderBottomColor: 'black',
        height: '60%',
        backgroundColor: 'blue'
    },

    orderDetails: {
        padding: 10,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * 0.195,
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
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
    

    ////////////TEXT STYLES///////////////////
 text12: {
    fontFamily: 'Lexend-light',
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
},

text22: {
    fontFamily: 'Lexend-bold',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
},

text2b2: {
    fontFamily: 'Lexend-bold',
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold'
},

text2c2: {
    fontFamily: 'Lexend-bold',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
},

text2d2: {
    fontFamily: 'Lexend-bold',
    fontSize: 15,
    color: '#8CC740',
    fontWeight: 'bold'
},

text2e2: {
    fontFamily: 'Lexend-bold',
    fontSize: 19,
    color: '#8CC740',
    fontWeight: 'bold'
},

text32: {
    fontFamily: 'Lexend-light',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
},

text42: {
    fontFamily: 'Lexend-bold',
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold'
},

text52: {
    fontFamily: 'Lexend-light',
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold'
},

text62: {
    fontFamily: 'Lexend-light',
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold'
},

////////////TEXT STYLES///////////////////

buttonView1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //  paddingTop: 10



},

acceptButton: {
    //  flex: 1,

    //paddingHorizontal: 20,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 32,
    shadowOpacity: 0.2,
    backgroundColor: '#8CC740',
},


});

export default DotDotCart;