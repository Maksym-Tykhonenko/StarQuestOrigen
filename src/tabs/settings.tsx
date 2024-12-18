import React, { useContext, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SettingsSvg from '../../assets/svg/settings-icon.svg'
import OnSvg from '../../assets/svg/sound-off.svg'
import OffSvg from '../../assets/svg/sound-on.svg'
import { TabContext } from './navigation';

export default function Settings({ visible, onClose }: any) {
  const { sound, setSound } = useContext(TabContext);
  const { music, setMusic } = useContext(TabContext);
  const [colors, setColors] = useState(['#FFE998', '#57370D']);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => onClose()}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 25,
              }}
            >
              <SettingsSvg />
              <Text
                style={styles.mainText}
              >
                Settings
              </Text>
            </View>
            <View
              style={styles.indicatorContainer}
            >
              <View
                style={styles.header}
              >
                <Text
                  style={styles.text}
                >
                  Sound
                </Text>
                <Pressable
                  onPress={() => setSound(!sound)}
                >
                  {!sound ?
                    <OnSvg/>
                    :
                    <OffSvg/>
                  }
                </Pressable>
              </View>
              <View style={{borderWidth: 0.5, borderColor: '#737373', marginVertical: 20, borderStyle: 'dashed' }} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  style={styles.text}
                >
                  Music
                </Text>
                <Pressable
                  onPress={() => setMusic(!music)}
                >
                  {!music ?
                    <OnSvg/>
                    :
                    <OffSvg/>
                  }
                </Pressable>
              </View>
            </View>
          </View>
          <Pressable
            onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
            onPressOut={() => setColors(['#FFE998', '#57370D'])}
            style={{width: '100%'}}
            onPress={() => onClose()}
          >
            <LinearGradient
              colors={colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Save</Text>
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
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    lineHeight: 23,
    color: '#F2F2F2',
  },
  indicatorContainer: {
    backgroundColor: '#1B1B1B',
    padding: 20,
    borderRadius: 12,
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