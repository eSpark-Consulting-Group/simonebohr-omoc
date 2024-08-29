import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Customheader from '../../component/Customheader'
import { strings } from '../../utils/string/strings'
import { Colors } from '../../utils/colors'
import { GILROY_MEDIUM, GILROY_REGULAR } from '../../utils/fonts'

const AddGeneralFaqScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Customheader title={strings.ADD_GENERAL_FAQ} showBackIcon={true}/>
        </View>
        <View style={styles.inputLegalPolicy}>
          <TextInput placeholder={strings.ENTER_A_QUESTION} multiline={true} />
        </View>
        <Text style={styles.textExample}>{strings.EXAMPLE}</Text>
        <View style={styles.inputLegalPolicy}>
          <TextInput placeholder={strings.ENTER_A_ANSWER} multiline={true} />
        </View>
        <Text style={styles.textExample}>{strings.EXAMPLE}</Text>

        <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.btnText}>{strings.SAVE}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AddGeneralFaqScreen

const styles = StyleSheet.create({
  container:{
flex:1
  },
    header:{
        marginTop:15
    },
    inputLegalPolicy: {
        width: "95%",
        height: 173,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 12,
        borderColor: Colors.gray88,
        marginTop: 20,
        alignSelf: "center",
      },
      textExample: {
        fontFamily: GILROY_REGULAR,
        fontWeight: "400",
        fontSize: 14,
        color: Colors.grey,
        marginTop: 15,
        marginLeft: 15,
      },
      continueButton: {
        backgroundColor: Colors.skyBlueColor,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        height: 51,
        borderRadius: 24,
        width:'95%',
        position:'absolute',
        bottom:30,
        zIndex:0
      },
      btnText: {
        color: Colors.whiteColor,
        fontSize: 16,
        fontWeight: "500",
        fontFamily: GILROY_MEDIUM,
        marginTop: 6,
      },
})