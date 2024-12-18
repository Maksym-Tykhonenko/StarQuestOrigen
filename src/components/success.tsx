import React, { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/svg/logo.svg';
import Stars from '../../assets/svg/stars.svg';
import Coins from '../../assets/svg/coins.svg';
import QuestStar from '../../assets/svg/quest-star.svg';
import { TabContext } from '../tabs/navigation';

export default function Success({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { stars, setStars } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);
  const [colors, setColors] = useState(['#FFE998', '#57370D']);

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('quest');
    }, []),
  );

  return (
    <View
      style={styles.container}
    >
      <View style={[styles.header, { height: 80, marginBottom: 30}]}>
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
        <View
            style={styles.questContainer}
          >
            <QuestStar />
            <Text
              style={[styles.bigText, {fontSize: 20, color: '#FFE998'}]}
            > 
              Coordinates of the secret planet
            </Text>
            <Text
              style={[styles.text, {margin: 0, marginTop: 10,}]}
            >
              Arcania is a planet orbiting a red dwarf in the T7 system. It has a thick atmosphere made up of gases capable of providing support for life, but only with the help of special technologies for adaptation. On its surface are the remnants of an ancient civilization that guard a powerful energy artifact — the Heart of Arcania, which makes it possible to manipulate energy at the cosmic level.
            </Text>
            <View style={styles.bonusContainer}>
              <View style={styles.row}>
                <Text style={[styles.label, {paddingLeft: 10}]}>Planet: Arcania</Text>
                <Text style={styles.label}>Galaxy: Triton 7</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <View style={[styles.column, {paddingLeft: 10}]}>
                  <Text style={styles.subLabel}>Coordinates:</Text>
                  <Text style={styles.subValue}>Latitude: 76.3491°</Text>
                  <Text style={styles.subValue}>Longitude: -34.6125°</Text>
                </View>
                <View style={[styles.column, {paddingRight: 10}]}>
                  <Text style={styles.subLabel}>System coordinates:</Text>
                  <Text style={styles.subValue}>Space System: ZK-4517</Text>
                  <Text style={styles.subValue}>Interstellar transit time: 48 hours</Text>
                </View>
              </View>
            </View>
        </View>
        <Pressable
          onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
          onPressOut={() => setColors(['#FFE998', '#57370D'])}
          onPress={() => navigation.navigate('Home')}
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
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    paddingHorizontal: 30,
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
  bigText: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 27.6,
    marginTop: 10,
  },
  questContainer: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center'
  },
  bonusContainer: {
    borderWidth: 1,
    borderColor: '#737373',
    width: '100%',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  column: {
    flex: 1,
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: '#F2F2F2',
    width: '50%'
  },
  value: {
    fontSize: 16,
    color: '#F2F2F2',
    marginRight: 10,
  },
  subLabel: {
    fontSize: 14,
    color: '#F2F2F2',
    marginBottom: 10,
  },
  subValue: {
    fontSize: 12,
    color: '#F2F2F2',
  },
  divider: {
    height: 1,
    backgroundColor: '#737373',
  },
})