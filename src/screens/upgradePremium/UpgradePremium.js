import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../common/constants';

const {width} = Dimensions.get('window');
const widthCard = width - 40;

const UpgradePremium = ({navigation}) => {
  const benefitList = [
    {
      id: 1,
      text: '450 mazos desbloqueados (+10 000 flashcards)',
    },
    {
      id: 2,
      text: 'Algoritmo de repetición espaciada',
    },
    {
      id: 3,
      text: 'Tarjetas de imágenes médicas',
    },
    {
      id: 4,
      text: 'Tarjetas de "casos clínicos"',
    },
    {
      id: 5,
      text: 'Tarjeta de Alto Rendimiento Essalud / ENAM / RM',
    },
    {
      id: 6,
      text: 'Tarjetas "perlas clínicas"',
    },
  ];

  const goToCulqiCheckout = () => {
    navigation.navigate('CulqiCheckout');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizaste tus tarjetas gratuitas</Text>
      <Text style={styles.upgradeText}>
        Sube a Plan Premium para poder {'\n'} seguir estudiando y dominar este
        tema
      </Text>
      <View style={styles.card}>
        <Text style={styles.currentPlan}>PLAN Gratuito</Text>
        <Text style={styles.upgradePlanText}>Subir a Premium</Text>
        <Text style={styles.upgradePriceText}>S/. 34.90 / mes</Text>
        <View style={styles.benefitContainer}>
          {benefitList.map(item => {
            return (
              <View key={item.id} style={styles.benefitRow}>
                <Icon size={22} name={'checkmark-outline'} color={'#070518'} />
                <Text style={styles.benefitText}>{item.text}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.bottomButtons}>
          <Pressable style={styles.upgradeButton} onPress={goToCulqiCheckout}>
            <Text style={styles.upgradeButtonText}>Pagar</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continuar Gratuito</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Raleway-Bold',
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
  },
  upgradeText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    textAlign: 'center',
    color: '#070518',
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
  currentPlan: {
    fontFamily: 'Raleway',
    fontSize: 14,
    color: '#070518',
  },
  upgradePlanText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    color: '#070518',
  },
  upgradePriceText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    color: colors.secondary,
  },
  benefitContainer: {
    marginTop: 15,
  },
  benefitRow: {
    flexDirection: 'row',
    padding: 2,
  },
  benefitText: {
    fontFamily: 'Raleway',
    fontSize: 16,
    color: '#070518',
  },
  bottomButtons: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeButton: {
    flex: 1,
    marginStart: 10,
    marginEnd: 5,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  upgradeButtonText: {
    fontFamily: 'Raleway',
    color: '#fff',
  },
  continueButton: {
    flex: 1,
    marginStart: 10,
    marginEnd: 5,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  continueButtonText: {
    fontFamily: 'Raleway',
  },
});

export default UpgradePremium;
