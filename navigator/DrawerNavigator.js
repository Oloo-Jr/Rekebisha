import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeStack } from './StackNavigator'
import { Icon } from 'react-native-elements'
import { colors } from '../global/styles'
import { auth, db } from '../Database/config'
import { View,Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'



const Drawer = createDrawerNavigator()

export default function DrawerNavigator(){

    const [userDisplayName, setUserDisplayName] = React.useState("");
    const [userPhoneNumber, setUserPhoneNumber] = React.useState("");

    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.navigate('SignUpScreen')
        })
        .catch(error => alert(error.message))
      }

      const getUserDetails = async () => {
        const doc = await db.collection('users').doc(auth.currentUser.uid).get();
        console.log(doc.data());
        const username = doc.data().username;
        const phoneNumber = doc.data().phonenumber;
        setUserDisplayName(username);
        setUserPhoneNumber(phoneNumber);

    }

    React.useEffect(() => {
     getUserDetails();
    }, []);
    

    return(
        <Drawer.Navigator  useLegacyImplementation={true}>
            <Drawer.Screen
                name = "HomeStack"
                component = {HomeStack}
                options = {{
                     drawerLabelStyle: {
                     fontSize: 20,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                   drawerLabel: () => (
                    <View>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                        {userDisplayName}
                      </Text>
                      <Text>{userPhoneNumber}</Text>
                    </View>
                  ),
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "account"
                                                         color = "grey"
                                                         size = {80}
                                                         
                                                          />,  
                                                          
                     headerShown : false
                     
                }}
            />

<Drawer.Screen
                name = "Wallet"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Orders',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "wallet"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />

<Drawer.Screen
                name = "Support"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Support',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "face-agent"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />
             
             <Drawer.Screen
                name = "About Us"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'About Us',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "information"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />

<Drawer.Screen
                name = "Logout"
                component = {HomeStack}
                options = {{
                  drawerLabel: () => (
                    <TouchableOpacity onPress={handleSignOut}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>
                        Logout
                      </Text>
                    </TouchableOpacity>
                  ),
                   drawerLabelStyle: {
                    fontSize: 15,
                    color: '#17304A',
                    fontWeight: 'bold',
                    fontFamily: 'Lexend-bold'
                  },
                   


                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "logout"
                                                         color= "#17304A"
                                                         size = {size}
                                                          />,  
                     headerShown : false,
                    screenName: 'My Home'
                     
                }}
                onPress ={handleSignOut}
            />
             
             
        </Drawer.Navigator>
    )
}