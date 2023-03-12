import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {colors} from '../common/constants';

const {width} = Dimensions.get('window');
const barWidth = width - 100;

function ProgressItem({item, onPress}) {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.specialty}>{item.subjectName}</Text>
        <Text style={styles.freeCards}>
          {item.freeCards} tarjetas gratuitas
        </Text>
      </View>
      <View style={styles.progressBar}>
        <Progress.Bar
          progress={item.percentageProgress / 100}
          width={barWidth}
          height={20}
          borderRadius={20}
          color={colors.primary}
        />
        <Text style={styles.percentageText}>
          {item.percentageProgress.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
}

export default ProgressItem;

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    padding: 10,
  },
  specialty: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
  },
  freeCards: {
    fontFamily: 'Raleway',
    fontSize: 16,
    marginStart: 20,
  },
  progressBar: {
    flexDirection: 'row',
    paddingStart: 10,
  },
  percentageText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    paddingStart: 10,
  },
});
