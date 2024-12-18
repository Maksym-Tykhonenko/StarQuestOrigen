import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Pressable } from 'react-native';
import { createContext, useState } from 'react';
import ActiveHome from '../../assets/svg/active-home.svg'
import NonActiveHome from '../../assets/svg/nonactive-home.svg'
import ActiveBonus from '../../assets/svg/active-bonus.svg'
import NonActiveBonus from '../../assets/svg/nonactive-bonus.svg'
import NonActiveSettings from '../../assets/svg/nonactive-settings.svg'
import ActiveAccount from '../../assets/svg/active-account.svg'
import NonActiveAccount from '../../assets/svg/nonactive-account.svg'
import Home from './home';
import Bonus from './bonus';
import Settings from './settings';
import Account from './account';
import Match3Game from './match-3';
import Facts from './facts';
import AddFact from './add-fact';
import Quest from './quest';
import Success from '../components/success';

interface TabContextType {
  routeName: string;
  setRouteName: (name: string) => void;
  stars: number;
  setStars: (name: number) => void;
  coins: number;
  setCoins: (name: number) => void;
  sound: boolean;
  setSound: (name: boolean) => void;
  music: boolean;
  setMusic: (name: boolean) => void;
}

export const TabContext = createContext<TabContextType>({
  routeName: '',
  setRouteName: () => {},
  stars: 42200,
  setStars: () => {},
  coins: 42200,
  setCoins: () => {},
  sound: true,
  setSound: () => {},
  music: true,
  setMusic: () => {},
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        component={Home}
        options={{ 
          headerShown: false,
          gestureEnabled: false,
          headerLeft: null,
        }} 
      />
      <Stack.Screen
        name="Match3"
        component={Match3Game}
        options={{ 
          headerShown: false,
          headerLeft: null,
        }} 
      />
      <Stack.Screen
        name="Facts"
        component={Facts}
        options={{ 
          headerShown: false,
          headerLeft: null,
        }} 
      />
      <Stack.Screen
        name="AddFact"
        component={AddFact}
        options={{ 
          headerShown: false,
          headerLeft: null,
        }} 
      />
      <Stack.Screen
        name="Quest"
        component={Quest}
        options={{ 
          headerShown: false,
          headerLeft: null,
        }} 
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{ 
          headerShown: false,
          headerLeft: null,
        }} 
      />
    </Stack.Navigator>
  );
}

export default function Tabs() {
  const [routeName, setRouteName] = useState<string>('')
  const [stars, setStars] = useState<number>(42200)
  const [coins, setCoins] = useState<number>(42200)
  const [sound, setSound] = useState<boolean>(true)
  const [music, setMusic] = useState<boolean>(true)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalToggle = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <TabContext.Provider value={{ routeName, setRouteName, stars, setStars, coins, setCoins, sound, setSound, music, setMusic }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#1F1F1F',
            height: 74,
            paddingTop: 15,
            position: 'absolute',
            bottom: 30,
            marginHorizontal: 20,
            borderRadius: 24,
            borderTopColor: 'transparent',
          },
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View>
                {routeName === 'home' ?
                  <ActiveHome />
                  :
                  <NonActiveHome />
                }
              </View>
            )
          }}
        />
        <Tab.Screen 
          name="Bonus"
          component={Bonus}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View>
                {routeName === 'bonus' ?
                  <ActiveBonus />
                  :
                  <NonActiveBonus />
                }
              </View>
            )
          }}
        />
        <Tab.Screen 
          name="Settings"
          component={View}
          options={{
            tabBarLabel: '',
            tabBarIcon: (props: any) => (
              <Pressable
                onPress={handleModalToggle} {...props}
              >
                <NonActiveSettings />
              </Pressable>
            ),
          }}
          listeners={{
            tabPress: (e: { preventDefault: () => void; }) => {
              e.preventDefault();
              handleModalToggle();
            },
          }}
        />
        <Tab.Screen 
          name="Account"
          component={Account}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View>
                {routeName === 'account' ?
                  <ActiveAccount />
                  :
                  <NonActiveAccount />
                }
              </View>
            )
          }}
        />
      </Tab.Navigator>
      <Settings visible={isModalVisible} onClose={handleModalToggle} />
    </TabContext.Provider>
  );
}