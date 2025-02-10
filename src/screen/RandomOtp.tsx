import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const RandomOtp = () => {
  const [otp, setOtp] = useState<string>('');

  const handleOtp = (length: number) => {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    const randomOtp = Math.floor(
      min + Math.random() * (max - min + 1),
    ).toString();
    setOtp(randomOtp);
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.mainText}>
        <Text style={styles.text}>{otp}</Text>
      </View>
      <Button title="Generate OTP 4 digit" onPress={() => handleOtp(4)} />
      <Button title="Generate OTP 6 digit" onPress={() => handleOtp(6)} />
    </SafeAreaView>
  );
};

export default RandomOtp;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    gap: 20,
  },
  mainText: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
  },
});
