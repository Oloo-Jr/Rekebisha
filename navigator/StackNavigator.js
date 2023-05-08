import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen'
import RequestScreen from '../screen/RequestScreen'
import DescriptionScreen from '../screen/DescriptionScreen';
import ListingScreen from '../screen/ListingScreen';
import LoginScreen from '../screen/LoginScreen';
import QuoteScreen from '../screen/QuoteScreen';
import ConfirmScreen from '../screen/ConfirmScreen';
import SignUpScreen from '../screen/SignUp';
import HustlerScreen from '../screen/HustlerScreen';
import ProductScreen from '../screen/ProductScreen';
import VendorMenuScreen from '../screen/VendorMenuScreen';
import CheckoutScreen from '../screen/CheckoutScreen';
import DotDotScreen from '../screen/DotDotProducts';
import DotDotCart from '../screen/DotDotCart';
import LoadingScreen from '../components/Loading';

const Home = createNativeStackNavigator();

export function HomeStack() {
    return (
        <Home.Navigator>

<Home.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="RequestScreen"
                component={RequestScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="DescriptionScreen"
                component={DescriptionScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="ListingScreen"
                component={ListingScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="QuoteScreen"
                component={QuoteScreen}
                options={{ headerShown: false }}
            />


<Home.Screen
                name="ConfirmScreen"
                component={ConfirmScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="HustlerScreen"
                component={HustlerScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="VendorMenuScreen"
                component={VendorMenuScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="CheckoutScreen"
                component={CheckoutScreen}
                options={{ headerShown: false }}
            />


<Home.Screen
                name="DotDotScreen"
                component={DotDotScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="DotDotCart"
                component={DotDotCart}
                options={{ headerShown: false }}
            />
            <Home.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                options={{ headerShown: false }}
            />

        </Home.Navigator>
    )
}