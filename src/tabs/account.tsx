import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import Logo from '../../assets/svg/logo.svg';
import Stars from '../../assets/svg/stars.svg';
import Coins from '../../assets/svg/coins.svg';
import Pen from '../../assets/svg/pen.svg';
import Plus from '../../assets/svg/plus.svg';
import Avatar from '../../assets/svg/avatar.svg';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';

export default function Account({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { stars, setStars } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nickName, setNickName] = useState('')
  const [imageUri, setImageUri] = useState('')
  const [borderColor, setBorderColor] = useState('#F2F2F2')
  const [isEdit, setIsEdit] = useState(false);
  const [colors, setColors] = useState(['#FFE998', '#57370D']);

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('account');
      setIsEdit(false)
      async function fetchData() {
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);

        if (files.length !== 0) {
          const filePaths = files.map((file) => file.path);
          setImageUri(filePaths[0])
        }
      }
      fetchData()
    }, []),
  );

  const saveImageLocally = async (uri: string) => {
    try {
      const fileName = `image_${Date.now()}.jpg`;
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(uri, destinationPath);
      await RNFS.readDir(RNFS.DocumentDirectoryPath)
    } catch (error) {
      console.log('Error saving image:', error);
    }
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        saveImageLocally(selectedImage.uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { height: 80 }]}>
        <View style={styles.header}>
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
      <Text
        style={styles.bigText}
      >
        My account
      </Text>
      <Pressable
        style={{
          alignItems: 'center',
        }}
        onPress={() => {
          pickImage()
        }}
      >
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
          <Plus style={{
            position: 'relative',
            bottom: 30,
            right: -45,
          }} />
      </Pressable>
      <TextInput
        style={[styles.input, {borderColor: borderColor, color: borderColor}]}
        onChangeText={(value: string) => setName(value)}
        value={name}
        placeholder="Your Name"
        editable={isEdit}
        placeholderTextColor={borderColor}
      />
      <TextInput
        style={[styles.input, {borderColor: borderColor, color: borderColor}]}
        onChangeText={(value: string) => setLastName(value)}
        value={lastName}
        placeholder="Your Last Name"
        editable={isEdit}
        placeholderTextColor={borderColor}
      />
      <TextInput
        style={[styles.input, {borderColor: borderColor, color: borderColor}]}
        onChangeText={(value: string) => setNickName(value)}
        value={nickName}
        placeholder="It's Your Nickname"
        editable={isEdit}
        placeholderTextColor={borderColor}
      />
      <Pressable
        onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
        onPressOut={() => setColors(['#FFE998', '#57370D'])}
        onPress={() => {
          if(isEdit) {
            setIsEdit(false)
            setBorderColor('#F2F2F2')
          } else {
            setIsEdit(true)
            setBorderColor('#737373')
          }
        }}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          {isEdit ?
            <Text style={styles.buttonText}>Save</Text>
            :
            <Text style={styles.buttonText}>Edit</Text>
          }
        </LinearGradient>
      </Pressable>
      <Pressable
        onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
        onPressOut={() => setColors(['#FFE998', '#57370D'])}
        onPress={() => {
          setName('')
          setLastName('')
          setNickName('')
        }}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientButton, {marginTop: 15}]}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#131313',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    fontSize: 36,
    lineHeight: 41,
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  gradientButton: {
    width: '100%',
    height: 50,
    marginTop: 50,
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
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 30,
  }
})