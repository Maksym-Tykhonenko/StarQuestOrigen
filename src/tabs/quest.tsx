import React, { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/svg/logo.svg';
import Stars from '../../assets/svg/stars.svg';
import Coins from '../../assets/svg/coins.svg';
import QuestStar from '../../assets/svg/quest-star.svg';
import A from '../../assets/svg/a.svg';
import B from '../../assets/svg/b.svg';
import C from '../../assets/svg/c.svg';
import D from '../../assets/svg/d.svg';
import RightAnswer from '../components/right-answer';
import WrongAnswer from '../components/wrong-answer';
import Back from '../../assets/svg/back-arrow.svg';

export default function Quest({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { stars, setStars } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);
  const [colors, setColors] = useState(['#FFE998', '#57370D']);
  const [question, setQuestion] = useState(-1);
  const [rightAnswers, setRightAnwsers] = useState(0);
  const [isModal, setIsModal] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('quest');
    }, []),
  );

  const handleAnswerPress = async(index: number) => {
    if (index === questions[question].correctOption) {
      setIsModal('right')
      setRightAnwsers(rightAnswers + 1)
    } else {
      setIsModal('wrong')
    }
  };

  const questions = [
    {
      id: 1,
      options: ['Venus', 'Mars', 'Proxima', 'Titan'],
      correctOption: 2,
      question: 'What is the most Earth-like planet when counted in terms of the amount of atmosphere, water, and living organisms?',
      image: require('../../assets/png/question-1.png'),
    },
    {
      id: 2,
      options: ['Milky Way', 'Andromeda', 'M87', 'NGC 1097'],
      correctOption: 2,
      question: 'Which galaxy has the largest black hole that swallows matter at tremendous speed?',
      image: require('../../assets/png/question-2.png'),
    },
    {
      id: 3,
      options: ['R1 (Basic Function Machine)', 'R5 (Autonomous, Teachable', 'R7 (Human-like intelligence)', 'R10 (Hyperintelligence, capable of independent decisions)'],
      correctOption: 3,
      question: 'What level of artificial intelligence would be able to independently control a spacecraft in conditions of direct contact with other civilizations?',
      image: require('../../assets/png/question-3.png'),
    },
    {
      id: 4,
      options: ['The Sun', 'Betelgeuse', 'Antares', 'Sirius'],
      correctOption: 1,
      question: 'Which of these stars is the largest in size?',
      image: require('../../assets/png/question-4.png'),
    },
    {
      id: 5,
      options: ['Fusion Engine', 'Gravity Motor', 'Warp Drive', 'Anti-gravity engine'],
      correctOption: 2,
      question: 'Which type of hyperdrive allows you to travel through hyperspace without harming the crew and the ship?',
      image: require('../../assets/png/question-5.png'),
    },
  ]

  return (
    <View
      style={styles.container}
    >
      <View style={[styles.header, { height: 80, marginBottom: 30,}]}>
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
      {question === -1 ?
        <View
          style={styles.questContainer}
        >
          <QuestStar />
          <Text
            style={styles.bigText}
          >
            Mysteries of Space
          </Text>
          <Text
            style={[styles.bigText, {fontSize: 20, color: '#FFE998'}]}
          > 
            Prehistory
          </Text>
          <Text
            style={[styles.text, {margin: 0, marginTop: 10,}]}
          >
            The Galactic Alliance has received a message from an ancient civilization that has left a set of mysterious records in the form of riddles. Your mission is to solve these mysteries to discover the coordinates of a hidden planet that contains incredibly powerful technology. To discover these coordinates, you will have to go through several challenges and answer questions.
          </Text>
          <View style={styles.bonusContainer}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.bigText, { 
                marginTop: 0, 
                marginBottom: 10, 
                fontSize: 20 
                }]}
              >
                5
              </Text>
              <Text 
                style={[styles.text, { marginLeft: 0 }]}
              >
                Questions
              </Text>
            </View>
            <View 
              style={{ 
                height: '100%',
                borderWidth: 0.5,
                borderColor: '#737373'
              }}
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.bigText, { 
                marginTop: 0, 
                marginBottom: 10,
                fontSize: 20
                }]}>
                +4000
              </Text>
              <Text 
                style={[styles.text, { marginLeft: 0 }]}
              >
                Coins
              </Text>
            </View>
            <View 
              style={{ 
                height: '100%',
                borderWidth: 0.5,
                borderColor: '#737373'
              }}
            />
            <View 
              style={{ alignItems: 'center' }}
            >
              <Text 
                style={[styles.bigText, { 
                  marginTop: 0,
                  marginBottom: 10,
                  fontSize: 20
                }]}
              >
                +500
              </Text>
              <Text
                style={[styles.text, { 
                  marginLeft: 0 
                }]}
              >
                Star
              </Text>
            </View>
          </View>
        </View>
        :
        <View
          style={[styles.container, {paddingHorizontal: 0}]}
        >
          <Image
            source={questions[question].image}
            style={{width: '100%', marginBottom: 20}}
            resizeMode={'contain'}
          />
          <Text
            style={[styles.text, {color: '#FFE998', marginBottom: 10}]}
          >
            Question {question + 1}
          </Text>
          <Text
            style={styles.questionText}
          >
            {questions[question].question}
          </Text>
          {questions[question].options.map((option, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handleAnswerPress(index)}
              activeOpacity={0.7}
              style={styles.options}
            >
              {
                index === 0 ?
                <A /> :
                index === 1 ? 
                <B /> : 
                index === 2 ? 
                <C /> :
                <D />
              }
              <Text
                style={[styles.text]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      }
      <Pressable
        onPressIn={() => setColors(['#E5A663', '#FAEE9E'])}
        onPressOut={() => setColors(['#FFE998', '#57370D'])}
        onPress={() => {
          question < 4 && setQuestion(question + 1)
          if(rightAnswers === 5) {
            setCoins(coins + 4000)
            setStars(stars + 500)
            navigation.navigate('Success')
          }
          if(rightAnswers !== 5 && question === 4) {
            navigation.navigate('Home')
          }
        }}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          {question === -1 ?
            <Text style={styles.buttonText}>Start Quest</Text>
            :
            <Text style={styles.buttonText}>Continue</Text>
          }
        </LinearGradient>
      </Pressable>
      {isModal === 'right' && 
        <RightAnswer setIsModal={setIsModal} setQuestion={setQuestion} question={question} />
      }
      {isModal === 'wrong' && 
        <WrongAnswer setIsModal={setIsModal} />
      }
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
  questionText: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 23,
    marginBottom: 20,
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
    width: '100%',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    height: 99,
    marginTop: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  options: {
    backgroundColor: "#1F1F1F",
    padding: 10,
    width: '100%',
    borderRadius: 30,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
})