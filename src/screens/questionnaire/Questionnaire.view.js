import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../common/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const QuestionnaireScreen = () => {
  const flipDegree = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const frontInterpolate = interpolate(flipDegree.value, [0, 1], [0, 180]);
    const frontOpacity = interpolate(flipDegree.value, [0, 1], [1, 0]);
    const frontZIndex = interpolate(flipDegree.value, [0, 1], [1, -1]);
    return {
      transform: [
        {rotateY: withTiming(frontInterpolate + 'deg', {duration: 1000})},
      ],
      opacity: withTiming(frontOpacity, {duration: 1000}),
      zIndex: withTiming(frontZIndex, {duration: 1000}),
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const backInterpolate = interpolate(flipDegree.value, [0, 1], [180, 360]);
    const backOpacity = interpolate(flipDegree.value, [1, 0], [1, 0]);
    const backZIndex = interpolate(flipDegree.value, [0, 1], [-1, 1]);
    return {
      transform: [
        {rotateY: withTiming(backInterpolate + 'deg', {duration: 1000})},
      ],
      opacity: withTiming(backOpacity, {duration: 1000}),
      zIndex: withTiming(backZIndex, {duration: 1000}),
    };
  });

  const flipCard = () => {
    if (flipDegree.value == 0) flipDegree.value = 1;
    if (flipDegree.value == 1) flipDegree.value = 0;
  };

  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Text style={styles.cardTitle}>Tumores</Text>
          <Text style={[styles.cardText, styles.cardTextFront]}>
            Tumor primario cardiaco más frecuente:
          </Text>
          <Text style={styles.cardAnswer}>_ _ _ _ _ _ _ _ _</Text>
          <View style={styles.bottomButtons}>
            <Pressable style={styles.previousQuestionButton}>
              <Text>Ver Anterior</Text>
            </Pressable>
            <Pressable onPress={flipCard} style={styles.seeAnswerButton}>
              <Text style={styles.seeAnswerButtonText}>Ver Respuesta</Text>
            </Pressable>
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
          <View style={styles.flipCardGroup}>
            <Pressable onPress={flipCard} style={styles.flipIcon}>
              <Ionicons size={22} name="sync" />
            </Pressable>
          </View>
          <Text style={styles.cardTitle}>Respuesta</Text>
          <Text style={styles.cardText}>
            Tumor primario cardiaco más frecuente:
          </Text>
          <Text style={styles.cardAnswer}>Mixoma</Text>
        </Animated.View>
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
  flipCardGroup: {
    flexDirection: 'row',
  },
  flipIcon: {
    flex: 1,
    top: 5,
    left: 20,
  },
  flipCard: {
    width: 300,
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: colors.backgroundWhite,
    backfaceVisibility: 'hidden',
    elevation: 3,
    shadowColor: '#171717',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },
  cardTitle: {
    marginTop: 10,
    position: 'absolute',
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    marginTop: 10,
    padding: 5,
  },
  cardTextFront: {
    marginTop: 35,
  },
  cardAnswer: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtons: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  previousQuestionButton: {
    flex: 1,
    marginStart: 10,
    marginEnd: 5,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  seeAnswerButton: {
    flex: 1,
    marginStart: 5,
    marginEnd: 10,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  seeAnswerButtonText: {
    color: colors.secondary,
  },
});

export default QuestionnaireScreen;
