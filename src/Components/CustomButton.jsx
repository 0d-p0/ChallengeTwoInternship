import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomButton = ({title}) => {
  return (
    <View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonTitle}>{title}</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={30}
          color="black"
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    color: 'orange',
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonTitle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: 2,
  },
});
