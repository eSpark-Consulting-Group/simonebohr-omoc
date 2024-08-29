import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { midGray } from '../utils/colors'
import { GILROY_REGULAR_ITALIC } from '../utils/fonts'

const BankDetails = ({data}) => {
  return (
    <View>
      <TouchableOpacity style={styles.OtherBankView}>
        <Text style={styles.OtherBankText}>{data.bankName}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default BankDetails

const styles = StyleSheet.create({

  OtherBankView: {
    borderBottomWidth: 1,
    width: "87%",
    marginLeft: 10,
    fontWeight: '400',
    fontFamily:GILROY_REGULAR_ITALIC,
    fontsize: 14,
    height: 28,
    borderColor:midGray,
    marginVertical: 8,
    flex:1,
   
  },

  OtherBankText: {
    marginLeft: 25,
  },
})
