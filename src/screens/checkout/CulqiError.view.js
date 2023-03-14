import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../common/constants';

const {width} = Dimensions.get('window');
const widthCard = width - 40;

const CulqiErrorScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>¡Lo sentimos!</Text>
        <Text style={styles.messageText}>
          Hubo un problema al procesar tu pago:{' '}
        </Text>
        <Text style={styles.messageText}>
          Error: {route.params.errorMessage}
        </Text>
        <View style={styles.goBackButtonContainer}>
          <Pressable
            style={styles.goBackButton}
            onPress={() => navigation.navigate('Specialties')}>
            <Text style={styles.goBackButtonText}>
              Volver al menú principal
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CulqiErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  card: {
    width: widthCard,
    marginTop: 30,
    borderRadius: 10,
    padding: 20,
    backgroundColor: colors.backgroundWhite,
    backfaceVisibility: 'hidden',
    elevation: 3,
    shadowColor: '#171717',
  },
  title: {
    fontFamily: 'Raleway-Bold',
    marginTop: 15,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
  },
  messageText: {
    fontFamily: 'Raleway',
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
    color: '#070518',
  },
  goBackButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackButton: {
    flex: 1,
    marginStart: 10,
    marginEnd: 5,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  goBackButtonText: {
    fontFamily: 'Raleway-Bold',
    color: '#fff',
  },
});
