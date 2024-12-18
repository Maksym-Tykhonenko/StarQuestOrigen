import React, { useState, useEffect, useContext, useRef, } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import Logo from '../../assets/svg/logo.svg';
import Reset from '../../assets/svg/reset.svg';
import Stars from '../../assets/svg/stars.svg';
import Coins from '../../assets/svg/coins.svg';
import EarthImg from '../../assets/png/earth.png';
import Star1Img from '../../assets/png/star-1.png';
import Star2Img from '../../assets/png/star-2.png';
import Star3Img from '../../assets/png/star-3.png';
import Star4Img from '../../assets/png/star-4.png';
import Star5Img from '../../assets/png/star-5.png';
import Back from '../../assets/svg/back-arrow.svg';
import Sound from 'react-native-sound';

const NUM_ROWS = 5;
const NUM_COLS = 4;
const TILE_SIZE = Dimensions.get('window').width / NUM_COLS - 18;

const tileImages = {
  earth: EarthImg,
  star1: Star1Img,
  star2: Star2Img,
  star3: Star3Img,
  star4: Star4Img,
  star5: Star5Img,
};

const soundInstance = new Sound(require('../../assets/music/sound.mp3'));
const musicInstance = new Sound(require('../../assets/music/music.mp3'));

const generateTile = () => {
  const tileTypes = Object.keys(tileImages);
  return tileTypes[Math.floor(Math.random() * tileTypes.length)];
};

const initializeGrid = (): string[][] =>
  Array.from({ length: NUM_ROWS }, () =>
    Array.from({ length: NUM_COLS }, () => generateTile())
  );

export default function Match3Game({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { sound, setSound } = useContext(TabContext);
  const { music, setMusic } = useContext(TabContext);
  const { stars, setStars } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);
  const [grid, setGrid] = useState<string[][]>(initializeGrid());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const soundRef = useRef<Sound | null>(null);
  const musicRef = useRef<Sound | null>(null);

  function checkSound() {
    soundRef.current = soundInstance;

    if (sound) {
      soundRef.current.play((success: any) => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Failed to play sound');
        }
      });
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }

  function checkMusic() {
    musicRef.current = musicInstance;
    musicRef.current.setNumberOfLoops(-1)

    if (music) {
      musicRef.current.play((success: any) => {
        if (success) {
          console.log('Music played successfully');
        } else {
          console.log('Failed to play music');
        }
      });
    }

    return () => {
      if (musicRef.current) {
        musicRef.current.release();
      }
    };
  }

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('match-3');
      checkSound();
      checkMusic();

      return () => {
        musicRef.current?.stop();
      };
    }, [])
  );

  useEffect(() => {
    if (music){
      musicRef.current.play()
    } else {
      musicRef.current.stop()
    }
  }, [music]);

  useEffect(() => {
    if (sound){
      soundRef.current.play()
    } else {
      soundRef.current.stop()
    }
  }, [sound]);

  useEffect(() => {
    checkMatches();
  }, [grid]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleRestart = () => {
    setGrid(initializeGrid());
    setElapsedTime(0);
    setIsRunning(true);
  };

  const handleSwipe = (row: number, col: number, dx: number, dy: number) => {
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && col < NUM_COLS - 1) {
        swapTiles(row, col, row, col + 1);
      } else if (dx < 0 && col > 0) {
        swapTiles(row, col, row, col - 1);
      }
    } else {
      if (dy > 0 && row < NUM_ROWS - 1) {
        swapTiles(row, col, row + 1, col);
      } else if (dy < 0 && row > 0) {
        swapTiles(row, col, row - 1, col);
      }
    }
  };

  const swapTiles = (row1: number, col1: number, row2: number, col2: number) => {
    const newGrid = [...grid];
    [newGrid[row1][col1], newGrid[row2][col2]] = [newGrid[row2][col2], newGrid[row1][col1]];
    setGrid(newGrid);
    if (sound) {
      soundRef.current.play((success: any) => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Failed to play sound');
        }
      });
    }
  };

  const checkMatches = () => {
    const matchedTiles = new Set<string>();

    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS - 2; col++) {
        const tile = grid[row][col];
        if (tile && tile === grid[row][col + 1] && tile === grid[row][col + 2]) {
          matchedTiles.add(`${row},${col}`);
          matchedTiles.add(`${row},${col + 1}`);
          matchedTiles.add(`${row},${col + 2}`);
        }
      }
    }

    for (let col = 0; col < NUM_COLS; col++) {
      for (let row = 0; row < NUM_ROWS - 2; row++) {
        const tile = grid[row][col];
        if (tile && tile === grid[row + 1][col] && tile === grid[row + 2][col]) {
          matchedTiles.add(`${row},${col}`);
          matchedTiles.add(`${row + 1},${col}`);
          matchedTiles.add(`${row + 2},${col}`);
        }
      }
    }

    if (matchedTiles.size > 0) {
      removeMatches(matchedTiles);
      setCoins(coins + 30)
      if (sound) {
        soundRef.current.play((success: any) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Failed to play sound');
          }
        });
      }
    }
  };

  const removeMatches = (matchedTiles: Set<string>) => {
    const newGrid = [...grid];

    matchedTiles.forEach((key) => {
      const [row, col] = key.split(',').map(Number);
      newGrid[row][col] = null;
    });

    for (let col = 0; col < NUM_COLS; col++) {
      for (let row = NUM_ROWS - 1; row >= 0; row--) {
        if (!newGrid[row][col]) {
          for (let r = row - 1; r >= 0; r--) {
            if (newGrid[r][col]) {
              newGrid[row][col] = newGrid[r][col];
              newGrid[r][col] = null;
              break;
            }
          }
        }
      }
    }

    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        if (!newGrid[row][col]) {
          newGrid[row][col] = generateTile();
        }
      }
    }

    setGrid(newGrid);
  };

  const createPanResponder = (row: number, col: number) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_: any, gestureState: { dx: any; dy: any; }) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          handleSwipe(row, col, dx, dy);
        }
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { height: 80 }]}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
              musicRef.current.stop();
              soundRef.current.stop();
            }}
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
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((tile, colIndex) => {
              const panResponder = createPanResponder(rowIndex, colIndex);

              return (
                <Animated.View
                  key={`${rowIndex}-${colIndex}`}
                  style={styles.tile}
                  {...panResponder.panHandlers}
                >
                  <Image source={tileImages[tile]} style={styles.tileImage} />
                </Animated.View>
              );
            })}
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Stars style={{marginBottom: 5}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={[styles.textCoins, {color: '#737373'}]}>Star </Text>
            <Text
              style={styles.textCoins}
            >
              300/500
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
            <Reset />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={[styles.textCoins, {color: '#737373'}]}>Timer: </Text>
            <Text
              style={styles.textCoins}
            >
              {formatTime(elapsedTime)}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Coins style={{marginBottom: 5}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={[styles.textCoins, {color: '#737373'}]}>Coins </Text>
            <Text
              style={styles.textCoins}
            >
              1100/2000
            </Text>
          </View>
        </View>
      </View>
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
  textCoins: {
    color: '#F2F2F2',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 14,
  },
  grid: {
    flexDirection: 'column',
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: '#D9D9D91F',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 8,
  },
  tileText: {
    fontSize: 20,
    color: '#fff',
  },
  restartButton: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  tileImage: {
    width: TILE_SIZE - 20,
    height: TILE_SIZE - 20,
    resizeMode: 'contain',
  },
});
