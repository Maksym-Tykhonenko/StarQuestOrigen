import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import Stars from '../../assets/svg/stars.svg'
import Coins from '../../assets/svg/coins.svg'

export default function Home({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { stars, setStars } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('home')
    }, []),
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#131313'
      }}
      showsVerticalScrollIndicator={false}
    >
      <Image 
        source={require('../../assets/png/moon.png')}
        style={{height: 300, width: '100%'}}
        resizeMode={'contain'}
      />
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 120,
        }}
      >
        <View
          style={{flexDirection: 'row'}}
        >
          <View
            style={styles.coinsWrap}
          >
            <Stars />
            <Text
              style={[styles.text, {marginLeft: 5}]}
            >
              {stars}
            </Text>
          </View>
          <View
            style={styles.coinsWrap}
          >
            <Coins />
            <Text
              style={[styles.text, {marginLeft: 5}]}
            >
              {coins}
            </Text>
          </View>
        </View>
        <Text
          style={styles.bigText}
        >
          Game
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Quest')}
          >
            <ImageBackground
              source={require('../../assets/png/quest.png')}
              style={styles.imageBackground}
              imageStyle={{ borderRadius: 10 }}
            >
              <View 
                style={styles.button}
              >
                <Text style={styles.buttonText}>Start the game</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.title}>Mysteries of Space</Text>
                <Text style={styles.subtitle}>Quest</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Match3')}
          >
            <ImageBackground
              source={require('../../assets/png/match-3.png')}
              style={styles.imageBackground}
              imageStyle={{ borderRadius: 10 }}
            >
              <View 
                style={styles.button}
              >
                <Text style={styles.buttonText}>Start the game</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.title}>Magic Planets</Text>
                <Text style={styles.subtitle}>Match-3</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.bigText}
        >
          Interesting Facts
        </Text>
        <TouchableOpacity
          style={styles.facts}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Facts')}
        >
          <Image 
            source={require('../../assets/png/facts.png')}
            style={{width: 76, height: 76}}
          />
          <View
            style={{
              marginLeft: 10,
              flex: 1,
            }}
          >
            <Text
              style={styles.text}
            >
              Mysteries of the Galaxy
            </Text>
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <View 
                style={{
                  borderWidth: 1,
                  borderColor: '#FFE998',
                  borderRadius: 25,
                  padding: 8,
                }}
              >
                <Text style={styles.buttonText}>View the facts</Text>
              </View>
              <Text
                style={styles.subtitle}
              >
                Facts about the stars
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  coinsWrap: {
    marginRight: 15,
    width: 100,
    height: 40,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FFE998',
    flexDirection: 'row',
  },
  text: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,
  },
  bigText: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 23,
    marginTop: 25,
    marginBottom: 20,
  },
  card: {
    width: '47%',
  },
  imageBackground: {
    height: 180,
  },
  button: {
    borderWidth: 1,
    borderColor: '#FFE998',
    borderRadius: 25,
    padding: 8,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  buttonText: {
    color: '#FFE998',
    fontSize: 12,
    lineHeight: 14
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    backgroundColor: '#1F1F1F',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 16,
    color: '#F2F2F2',
  },
  subtitle: {
    fontSize: 11,
    lineHeight: 26,
    color: '#737373',
  },
  facts: {
    backgroundColor: '#1F1F1F',
    width: '100%',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
  }
})