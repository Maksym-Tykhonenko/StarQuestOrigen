import React, { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/svg/logo.svg';
import Stars from '../../assets/svg/stars.svg';
import Coins from '../../assets/svg/coins.svg';
import RNFS from 'react-native-fs';
import Avatar from '../../assets/svg/avatar.svg';
import Back from '../../assets/svg/back-arrow.svg';

export default function AddFact({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { stars, setStars } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);
  const [colors, setColors] = useState(['#FFE998', '#57370D']);
  const [imageUri, setImageUri] = useState('');
  const [factText, setFactText] = useState('');
  const [item, setItem] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('fact');
      setFactText('')
      async function fetchData() {
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);

        if (files.length !== 0) {
          const filePaths = files.map((file) => file.path);
          setImageUri(filePaths[1])
          console.log('File Paths:', filePaths[0], 'lol');
        }
      }
      fetchData()
    }, []),
  );

  const img = [
    require('../../assets/png/earth.png'),
    require('../../assets/png/star-1.png'),
    require('../../assets/png/star-2.png'),
    require('../../assets/png/star-3.png'),
    require('../../assets/png/star-4.png'),
    require('../../assets/png/star-6.png'),
  ];


  return (
    <View
      style={styles.container}
    >
      <View style={[styles.header, { height: 80, marginBottom: 30, paddingHorizontal: 30,}]}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              marginBottom: -5,
              marginRight: 5,
            }}
          >
            <Back width={30} height={30} />
          </Pressable>
          <Logo />
          <Text style={styles.text}>StarQuest</Text>
        </View>
        <View style={styles.header}>
          <View style={styles.header}>
            <Stars />
            <Text style={styles.text}>{stars}</Text>
          </View>
          <View style={[styles.header, { marginLeft: 15 }]}>
            <Coins />
            <Text style={styles.text}>{coins}</Text>
          </View>
        </View>
      </View>
      <View
        style={{alignItems: 'center'}}
      >
        <Text
          style={[styles.title, {paddingHorizontal: 30, marginBottom: 15}]}
        >
          Add facts
        </Text>
        {!imageUri ? 
            <Avatar/>
            :
            <Image
              source={{ uri: imageUri }}
              style={{ 
                width: 120,
                height: 120,
                borderRadius: 100,
              }}
            />
          }
      </View>
      <Text
        style={styles.bigText}
      >
        Fact screensaver
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {img.map((img, index) => {
          return(
            <Pressable
              key={index}
              onPress={() => setItem(index)}
              style={[styles.image, {borderColor: item === index ? '#FFE998' : '#7373733D'}]}
            >
              <Image source={img} style={{width: 34, height: 34,}} />
            </Pressable>
          )
        })}
      </View>
      <Text
        style={styles.bigText}
      >
        Fact
      </Text>
      <TextInput 
        style={styles.input}
        multiline={true}
        placeholder={'Type text here'}
        placeholderTextColor={'#737373'}
        value={factText}
        onChange={(value: string) => setFactText(value)}
        textAlignVertical="top"
      />
      <Pressable
        style={{paddingHorizontal: 30}}
        onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
        onPressOut={() => setColors(['#FFE998', '#57370D'])}
        onPress={() => Alert.alert('The fact was sent successfully!')}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Send</Text>
        </LinearGradient>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 36,
    lineHeight: 41.4,
    fontWeight: 600,
    color: '#F2F2F2',
  },
  text: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 5
  },
  bigText: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 23,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  gradientButton: {
    width: '100%',
    height: 50,
    marginBottom: 130,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 23,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 50,
    backgroundColor: '#F2F2F23D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  }, 
  input: {
    borderWidth: 1,
    marginHorizontal: 30,
    marginBottom: 30,
    borderColor: '#737373',
    borderRadius: 12,
    padding: 10,
    height: 100,
    color: '#F2F2F2',
  }
})