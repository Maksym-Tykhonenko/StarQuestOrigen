import React, { useContext, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Animated, Dimensions, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/svg/logo.svg';
import Stars from '../../assets/svg/stars.svg';
import Coins from '../../assets/svg/coins.svg';
import RightArrow from '../../assets/svg/right-arrow.svg';
import Back from '../../assets/svg/back-arrow.svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 248;
const CARD_MARGIN = 5;

export default function Facts({ navigation }: any) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { routeName, setRouteName } = useContext(TabContext);
  const { stars, setStars } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);
  const [colors, setColors] = useState(['#FFE998', '#57370D']);

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('fact');
    }, [])
  );

  const facts = [
    {
      id: 1,
      description: 'Stars have a limited life cycle: Stars are born, live, and die by going through several stages. For example, the Sun has been in the "yellow dwarf" stage for about 4.6 billion years and still has about 5 billion years before turning into a red giant.',
      image: require('../../assets/png/star-2.png'),
      fact: 'Fact 1',
    },
    {
      id: 2,
      description: 'Black holes can engulf stars: If a star approaches a black hole, its gravitational field can tear the star apart in a process known as "spaghettization."',
      image: require('../../assets/png/stone.png'),
      fact: 'Fact 2',
    },
    {
      id: 3,
      description: 'Stars can be extremely huge: The largest stars can be thousands of times larger than our Sun. For example, the star UY Scuti is 1,700 times larger than the Sun.',
      image: require('../../assets/png/star-2.png'),
      fact: 'Fact 3',
    },
    {
      id: 4,
      description: 'Stars can change color: Stars of different colors indicate their temperature. Red stars are cooler, while blue stars are hotter. The average temperature of the Sun is around 5,500°C, while the temperature of blue stars can exceed 30,000°C.',
      image: require('../../assets/png/star-1.png'),
      fact: 'Fact 4',
    },
    {
      id: 5,
      description: 'Stars are born in a "stellar nursery": They are clouds of cosmic dust and gas where new stars form due to gravitational contraction.',
      image: require('../../assets/png/star-5.png'),
      fact: 'Fact 5',
    },
    {
      id: 6,
      description: 'Our galaxy contains billions of stars: There are approximately 100-400 billion stars in our Milky Way galaxy alone',
      image: require('../../assets/png/star-6.png'),
      fact: 'Fact 6',
    },
    {
      id: 7,
      description: 'Stars can have planets: More than 5,000 exoplanets are now known — planets orbiting stars outside of our Sun.',
      image: require('../../assets/png/star-4.png'),
      fact: 'Fact 7',
    },
    {
      id: 8,
      description: 'Stars can "tremble": This phenomenon is called pulsation, where a star changes its size and brightness due to internal processes.',
      image: require('../../assets/png/star-1.png'),
      fact: 'Fact 8',
    },
  ];

  const currentIndex = Animated.divide(scrollX, CARD_WIDTH + CARD_MARGIN * 2);

  return (
    <View
      style={styles.container}
    >
      <View style={[styles.header, { height: 80, marginBottom: 40, paddingHorizontal: 30,}]}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[styles.title, {paddingHorizontal: 30,}]}
        >
          Interesting facts about the stars
        </Text>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
          decelerationRate="fast"
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {facts.map((item, index) => {
            const inputRange = [
              (index - 1) * (CARD_WIDTH + CARD_MARGIN * 2),
              index * (CARD_WIDTH + CARD_MARGIN * 2),
              (index + 1) * (CARD_WIDTH + CARD_MARGIN * 2),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.card,
                  {
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
              >
                <Image source={item.image} style={styles.image} />
                <View
                  style={{padding: 20}}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      lineHeight: 23,
                      color: '#FFE998',
                    }}
                  >
                    {item.fact}
                  </Text>
                  <Text 
                    style={styles.descriptionText}
                  >
                    {item.description}
                  </Text>
                </View>
                <RightArrow 
                  style={{
                    position: 'absolute',
                    bottom: -75,
                    left: '60%',
                    transform: [{ translateX: -50 }, { translateY: -50 }],
                  }}
                />
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
        <Pressable
          style={{paddingHorizontal: 30}}
          onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
          onPressOut={() => setColors(['#FFE998', '#57370D'])}
          onPress={() => navigation.navigate('AddFact')}
        >
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Add facts</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
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
  scrollContainer: {
    paddingHorizontal: (width - CARD_WIDTH) / 2,
    marginBottom: 50,
  },
  card: {
    marginTop: 80,
    width: CARD_WIDTH,
    height: 270,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 15,
    backgroundColor: '#1F1F1F',
    paddingTop: 30,
  },
  image: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }], 
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 16.6,
    color: '#F2F2F2',
    marginTop: 10
  },
  text: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 5
  },
  gradientButton: {
    width: '100%',
    height: 50,
    marginBottom: 120,
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
})