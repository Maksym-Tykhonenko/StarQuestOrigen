import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Loading({ navigation }: any) {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState(['#FFE998', '#57370D'])

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
    if (progress === 100) {
      setIsLoading(false)
    }
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/png/background.png')}
      resizeMode='cover'
      style={{
        flex: 1,
      }}
    >
      <View
        style={styles.container}
      >
        <Text
          style={styles.mainText}
        >
          StarQuest is your personal quest to the stars!
        </Text>
        <Text
          style={styles.text}
        >
          Prepare for an unforgettable journey among the stars. Discover new horizons and fascinating worlds
        </Text>
        {isLoading ?
          <>
            <View style={styles.loadingContainer}>
              <Animated.View
                style={[
                  styles.progressContainer,
                  {
                    width: animatedWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              >
                <LinearGradient
                  colors={['#FFE998', '#57370D']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                />
              </Animated.View>
            </View>
            <Text
              style={[styles.text, {textAlign: 'center'}]}
            >
              Loading...
            </Text>
          </>
          :
          <View>
            <Pressable
              onPress={() => navigation.navigate('Tabs')}
              onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
              onPressOut={() => setColors(['#FFE998', '#57370D'])}
            >
              <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text
                  style={styles.buttonText}
                >
                  Get Started
                </Text>
              </LinearGradient>
            </Pressable>
            <Text
              style={[styles.text, {textAlign: 'center'}]}
            >
              Log in to the app every day and get bonuses
            </Text>
          </View>
        }
        
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    paddingHorizontal: 20,
  },
  mainText: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 34,
    lineHeight: 41.1,
    marginBottom: 10,
  },
  text: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,
  },
  buttonText: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 23,
  },
  loadingContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 100,
    marginBottom: 10,
  },
  progressContainer: {
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  gradientButton: {
    width: '100%',
    height: 50,
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})