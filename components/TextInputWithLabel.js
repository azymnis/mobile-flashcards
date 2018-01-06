import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { black } from '../utils/colors'

const styles = StyleSheet.create({
  textLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 45,
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 20,
    padding: 10,
    borderColor: black,
    borderWidth: 2,
    borderRadius: 7,
  },
  container: {
    alignItems: 'center',
  }
})

export default function TextInputWithLabel({onChangeText, value, labelText}) {
  return(
    <View style={styles.container}>
      <Text style={styles.textLabel}>{labelText}</Text>
      <TextInput
        onChangeText={onChangeText}
        style={styles.textInput}
        value={value}
      />
    </View>
  )
}
