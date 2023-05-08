import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Wait for confirmation</Text>
    </View>
  );
}

export default LoadingScreen;
