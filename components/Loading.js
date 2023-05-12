import { useState, useEffect } from 'react';
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { db } from '../Database/config';

function LoadingScreen({navigation, route}) {
  const [currentOrderId, setCurrentOrderId] = useState(route.params.currentOrderId);
  const [status, setStatus] = useState('');


  useEffect(() => {
    const itemRef = db.collection('DotDotOrders').doc(currentOrderId);
    const unsubscribe = itemRef.onSnapshot((doc) => {
      if (doc.exists) {
        const selectedOrderData = doc.data();
        if (selectedOrderData.status === 'Pending Delivery') {
          navigation.navigate('DotDotCheckout', {currentOrderId})
        }
      }
    });
    return () => unsubscribe();
  }, [currentOrderId, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Wait for confirmation</Text>
    </View>
  );
}

export default LoadingScreen;
