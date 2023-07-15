import React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity,Button, Platform } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../components/TitleText';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


const HomeScreen =({ navigation }) => {

    const [latlng, setLatLng] = useState({})
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

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
   
    return (


        <View style={styles.container}>


<View style={styles.buttonView}>
            <TouchableOpacity   onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}>

                <Card style={styles.button}>

                    
                        <TitleText style={styles.buttonText}>Request Service</TitleText>
                    

                </Card>

            </TouchableOpacity>

           
            </View>


            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                
            > 
        
            </MapView>


        </View>





    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
       // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        flex: 1,
        
        
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
        bottom: 92,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        
    },

    buttonText: {
      //  fontWeight: 'bold',
        fontFamily: 'Lexend-light'
        
    },
    map: {
        height: "100%",
        width: "100%",
      },



});

export default HomeScreen;