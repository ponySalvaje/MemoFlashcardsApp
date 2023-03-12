import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../common/constants';

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/loading/loading.gif')}
        style={styles.animatedGif}
      />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  animatedGif: {
    width: 100,
    height: 100,
  },
  loadingText: {
    fontFamily: 'Raleway',
    fontSize: 25,
    color: colors.primary,
  },
});
