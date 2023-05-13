import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import TitleText from '../components/TitleText';
import { Dimensions } from 'react-native';
import Card from '../components/card';
import BodyText from '../components/BodyText';
import SubText from '../components/SubText';

const ConfirmScreen = () => {
  // ref
  const bottomSheetRef = useRef(1);

  // variables
  const snapPoints = useMemo(() => ['60%', '17%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
     //   style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>
        <View >
                        <TitleText style={styles.Text}>John is on his way</TitleText>

                    </View>
                    <View style={styles.flatlist}>
                    <Image
                            source={require('../assets/Fundi.png')}
                            style={styles.image}
                        // resizeMode="cover" 
                        />

                    </View>

                    <View >
                        <SubText
                         style={styles.Text2}
                         >10 minutes away</SubText>



                    </View>

                    <SubText
                         style={styles.Text}
                         >Expect a call from John </SubText>

        </View>




        
      </BottomSheet>


      <View style={styles.buttonView2}>
                    <TouchableOpacity onPress={() => { navigation.navigate("CompletedScreen", { state: 0 }) }}>

<Card style={styles.backButton}>


    <TitleText style={styles.Text}>CANCEL JOB</TitleText>


</Card>

</TouchableOpacity>
</View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
        justifyContent: 'center',
  //  backgroundColor: 'grey',
  //borderRadius: 30
  },

  bottomSheet: {
    backgroundColor: 'blue',
  },


  image: {
    height: Dimensions.get('window').width * 0.5,
    width: Dimensions.get('window').width * 0.5,
    borderRadius: 120,
    backgroundColor: '#17304A'
},

backButton: {
  //  flex: 1,

  backgroundColor: '#ffff',
  width: Dimensions.get('window').width * 0.8,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 100,
  height: 48,
  shadowOpacity: 0.2,
  borderColor: '#8CC740',
  borderWidth: 1,
  
},

buttonView2: {


  zIndex: 30,
  position: 'absolute',
  bottom: 45,
  width: Dimensions.get('window').width * 0.8,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 100,
  height: 48,
  paddingTop: 20

},


  flatlist: {
    paddingTop: '30%',
    backgroundColor: 'transparent',
    //width: '20%',
    justifyContent: 'center',
        alignItems: 'center',
        
},


  
Text: {
    fontFamily: 'Lexend-bold'
},

Text2: {
  fontFamily: 'Lexend-bold',
  paddingTop: '15%'
},


  contentContainer: {
    flex: 1,
    alignItems: 'center',
    
    
  },
});

export default ConfirmScreen;