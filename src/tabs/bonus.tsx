import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/svg/logo.svg';
import Stars from '../../assets/svg/stars.svg';
import Coins from '../../assets/svg/coins.svg';
import BigStar from '../../assets/svg/big-star.svg';
import CompleteDay from '../../assets/svg/complete-day.svg';

export default function Bonus({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { stars, setStars } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);

  const [bonusStars, setBonusStars] = useState(300);
  const [bonusCoins, setBonusCoins] = useState(1000);
  const [colors, setColors] = useState(['#FFE998', '#57370D']);
  const [days, setDays] = useState(0);
  const [bonusDay, setBonusDay] = useState<Date | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const isMoreThanADayPassed = (date1: Date, date2: Date): boolean => {
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    return date2.getTime() - date1.getTime() > ONE_DAY_IN_MS;
  };

  const checkLastOpened = async () => {
    try {
      const storedBonusDay = await AsyncStorage.getItem('bonusDay');
      if (!storedBonusDay) return false;

      const lastOpened = new Date(JSON.parse(storedBonusDay));
      const now = new Date();
      return !isMoreThanADayPassed(lastOpened, now);
    } catch (error) {
      console.error('Error checking last opened date:', error);
      return true;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('bonus');
      checkLastOpened()
    }, [])
  );

  useEffect(() => {
    (async () => {
      const isDisabled = await checkLastOpened();
      setIsButtonDisabled(isDisabled);

      const storedDays = await AsyncStorage.getItem('day');
      if (storedDays) setDays(Number(storedDays));

      const storedBonusDay = await AsyncStorage.getItem('bonusDay');
      if (storedBonusDay) setBonusDay(new Date(JSON.parse(storedBonusDay)));
    })();
  }, []);

  const handleBonusClaim = async () => {
    const now = new Date();
    setDays((prevDays) => prevDays + 1);
    setBonusCoins((prevCoins) => prevCoins + 100);
    setBonusStars((prevStars) => prevStars + 50);
    setCoins(coins + bonusCoins)
    setStars(stars + bonusStars)
    setBonusDay(now);

    await AsyncStorage.setItem('day', (days + 1).toString());
    await AsyncStorage.setItem('bonusDay', JSON.stringify(now.toISOString()));
    setIsButtonDisabled(true);
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bonusContainer}>
          <View style={{ alignItems: 'center' }}>
            <BigStar />
            <Text style={styles.title}>Get bonuses!</Text>
            <Text style={[styles.text, { marginLeft: 0, textAlign: 'center' }]}>
              Log in to the app every day and get bonuses
            </Text>
          </View>
          <View style={styles.sizeBonusContainer}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.bigText, { marginTop: 0, marginBottom: 10 }]}>
                +{bonusCoins}
              </Text>
              <Text style={[styles.text, { marginLeft: 0 }]}>Coins</Text>
            </View>
            <View style={{ height: '100%', borderWidth: 0.5, borderColor: '#737373' }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.bigText, { marginTop: 0, marginBottom: 10 }]}>
                +{bonusStars}
              </Text>
              <Text style={[styles.text, { marginLeft: 0 }]}>Star</Text>
            </View>
          </View>
          <Text style={[styles.text, { marginLeft: 0, textAlign: 'center' }]}>
            The number of days you've visited
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
            {Array.from({ length: 7 }).map((_, index) => (
              <View key={index} style={styles.bonusDayIndicator}>
                {days > index ? (
                  <CompleteDay />
                ) : (
                  <Text style={[styles.bigText, { marginTop: 0, marginBottom: 0 }]}>
                    {index + 1}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
        <Pressable
          onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
          onPressOut={() => setColors(['#FFE998', '#57370D'])}
          onPress={handleBonusClaim}
          disabled={isButtonDisabled}
        >
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
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
    fontSize: 20,
    lineHeight: 23,
    marginTop: 25,
    marginBottom: 20,
  },
  bonusContainer: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    borderRadius: 32,
    marginVertical: 30,
    padding: 25,
  },
  title: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 36,
    lineHeight: 41.4,
    marginTop: 15,
    marginBottom: 10,
  },
  sizeBonusContainer: {
    width: '100%',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    height: 99,
    marginVertical: 25,
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  bonusDayIndicator: {
    height: 44,
    width: 44,
    borderRadius: 30,
    backgroundColor: '#131313',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  gradientButton: {
    width: '100%',
    height: 50,
    marginBottom: 120,
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
})