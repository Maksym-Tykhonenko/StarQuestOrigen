import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WrongImg from '../../assets/svg/wrong-img.svg'

export default function WrongAnswer(props: any) {
  const [colors, setColors] = useState(['#FFE998', '#57370D']);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        props.setIsModal('')
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          props.setIsModal('')
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <WrongImg />
            <Text
              style={styles.mainText}
            >
              Unfortunately, this is not true
            </Text>
            <Text
              style={styles.text}
            >
              But don't worry, try again!
            </Text>
          </View>
          <Pressable
            onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
            onPressOut={() => setColors(['#FFE998', '#57370D'])}
            style={{width: '100%'}}
            onPress={() => {
              props.setIsModal('')
            }}
          >
            <LinearGradient
              colors={colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Please try again</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainText: {
    fontSize: 24,
    lineHeight: 27.6,
    color: '#F2F2F2',
    textAlign: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    color: '#F2F2F2',
    marginTop: 15,
  },
  gradientButton: {
    width: '100%',
    height: 50,
    marginBottom: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 23,
  },
  
});