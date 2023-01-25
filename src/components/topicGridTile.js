import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {colors} from '../common/constants';

const {width} = Dimensions.get('window');
const cardWithSize = (width - 16 * 2 * 2) / 2;

function TopicGridTile({item, onPress}) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{color: '#ccc'}}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}>
        <View
          style={[
            styles.innerContainer,
            {backgroundColor: colors.backgroundWhite},
          ]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.free}>{item.free} Tarjetas Gratuitas</Text>
          <Text style={styles.premium}>{item.premium} Tarjetas Premium</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default TopicGridTile;

const styles = StyleSheet.create({
  gridItem: {
    width: cardWithSize,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  free: {
    fontSize: 13,
  },
  premium: {
    fontSize: 13,
    color: colors.primary,
  },
  specialtyIcon: {
    width: 40,
    height: 40,
  },
});
