import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground,Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import TitleText from '../components/TitleText';
import { Icon } from 'react-native-elements'
import BodyText from '../components/BodyText';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';
import { db, storage, auth } from '../Database/config';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';

const DescriptionScreen = ({ navigation }) => {

    const [selected, setSelected] = useState("");
    const [latlng, setLatLng] = useState({});
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [currentusername, setCurrentUsername] = useState('');
    const [currentphonenumber, setCurrentPhonenumber] = useState('');
    const [fundiId, setFundiId] = useState("")


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.cancelled) {
          setImage(result.uri);
          console.log(image)
        }
      };
     
      // Select an image from the device's gallery

const uploadImage = async () => {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    const serialNumber = Math.floor(100000+Math.random()*9000).toString()
    const ref = storage.ref("DescriptionImages").child(serialNumber)
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        storage.ref("DescriptionImages")
            .child(serialNumber)
            .getDownloadURL()
            .then((imageUrl)=>{
              db.collection('FundiDescription')
              .doc(serialNumber)
              .set({
                Category: selected,
                Description: description,
                Latitude: latitude,
                Longitude: longitude,
                Town: address,
                Username: currentusername,
                serialNumber,
                imgUrl: imageUrl,
                FundiId: fundiId,
                Quote: false,
                TimeStamp:  firebase.firestore.FieldValue.serverTimestamp(),
                status: ""
              })
            })
      }
      )
  
      //Reset 
      setDescription("");
      setSelected(null);
      setImage(null);
      setLatitude("");
      setLongitude("");
      setLoading(true);
  
  
      //Navigate
      navigation.navigate("ListingScreen", {currentuserProblem: serialNumber});
  }
  

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
        setLatitude(latitude);
        setLongitude(longitude);
      } catch (err) {
  
      }
    }
  
    const _map = useRef(1);
  
      //run the functions in the background
      useEffect(() => {
        checkPermission();
        getLocation();
        geocode();
        getUserDetails();
        console.log([latitude, longitude])
          , []
      })
       //Get the Town using Latitude and Longitude
  const geocode = async () => {
    const geocodedAddress = await Location.reverseGeocodeAsync({
        longitude: longitude,
        latitude: latitude
    });
    setAddress(geocodedAddress[0].city);
    console.log('reverseGeocode:');
    console.log(geocodedAddress[0].city);

}

//Get the current user Profile details.
const getUserDetails = async () => {
  const doc = await db.collection('users').doc(auth.currentUser.uid).get();
  console.log(doc.data());
  const Username = doc.data().username;
  const Phonenumber = doc.data().phonenumber;
  setCurrentUsername(Username);
  setCurrentPhonenumber(Phonenumber);

}
  
    const data = [
        { key: '1', value: 'Mason' },
        { key: '2', value: 'Electrician' },
        { key: '3', value: 'Plumber' },
        {key: '4 ', value:'Construction Equipment Operator'},
        {key: ' 5', value:'Carpenter'},
        {key: ' 6', value:'Electrician'},
        {key: ' 7', value:'Plumber'},
        {key: ' 8' ,value:'Welder'},
        {key: ' 9' ,value:'Locks and Doors'},
        {key: ' 10' ,value:'Roofer' },
        {key: ' 11' ,value:'Tiler'},
        {key: ' 12' ,value:'Terrazzo'},
        {key: ' 13' ,value:'Mason'},
        {key: ' 14' ,value:'Landscaper'},
        {key: ' 15' ,value:'Window/Glass/Mirror Fixer'},
        {key: ' 16' ,value:'Plasterer'},
        {key: ' 17' ,value:'Gypsum expert'},
        {key: ' 18' ,value:'Floor carpet layer'},
        {key: ' 19' ,value:'Waterproofing'},
        {key: ' 20' ,value:'Cladding/Mazeras'},
        {key: ' 21' ,value:'External paver'},
        {key: ' 22' ,value:'Parking Sheds'}

    ]



    return (

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>
        <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                
            > 
        
            </MapView>
       

           <View style={styles.iconView}>
                <Icon
                    type="material-community"
                    name="menu"
                    //color = {colors.grey1}
                    size={35}
                    onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                />





            </View>



            <View style={styles.gridView}>
           







            <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
   //   style={styles.container}
      >
                <Card style={styles.card}>

               

                    <SelectList
                        style={styles.dropdown}
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />


                    <BodyText style={styles.Text}>Description of your problem</BodyText>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        multiline
                        placeholder="Description"

                    />


                    <BodyText style={styles.Text}>Upload an image/s | Take a photo</BodyText>


                    <View style={styles.imageview}>
                    {image && <Image source={{uri: image.uri}} style = {{with: 100, height: 100}} />}
                    </View>

                    <Card style={styles.button}>
                    <TouchableOpacity onPress={pickImage}>
                        <TitleText style={styles.Text}>Upload</TitleText>
                    </TouchableOpacity>
                    </Card>



                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={uploadImage}>

                            <Card style={styles.submitbutton}>


                                <TitleText style={styles.Text}>Request Service</TitleText>


                            </Card>

                        </TouchableOpacity>
                    </View>


                </Card>
                </KeyboardAvoidingView>

    </View>

            
        </View>
     
       </TouchableWithoutFeedback>




    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, alpha)',
        alignItems: 'center',
        justifyContent: 'center',
    },


    iconView: {
        position: "absolute",
        top: 50,
        left: 12,
        backgroundColor: '#8CC740',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8
    },

    dropdown: {
        width: '80%'
    },

    flatlist: {
        paddingTop: 50,
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
        borderColor: 'white',
        height: '30%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8
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
        borderRadius: 8,
        borderStyle: 'dashed',
        height: '25%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'
    },

    Text: {
        fontWeight: 'bold',
        fontFamily: 'Lexend-bold'

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

export default DescriptionScreen;