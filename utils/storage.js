import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLastGame = async (gameData) => {
  try {
    await AsyncStorage.setItem('last_game', JSON.stringify(gameData));
  } catch (e) {
    console.warn('Error guardando:', e);
  }
};

export const getLastGame = async () => {
  try {
    const json = await AsyncStorage.getItem('last_game');
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.warn('Error leyendo:', e);
    return null;
  }
};