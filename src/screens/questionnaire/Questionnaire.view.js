import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../common/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';

const QuestionnaireScreen = () => {
  const flipDegree = useSharedValue(0);

  const [discontinueCardModalVisible, setDiscontinueCardModalVisible] =
    useState(false);

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
          <View style={styles.discontinueCardButton}>
            <Pressable
              onPress={() => {
                setDiscontinueCardModalVisible(!discontinueCardModalVisible);
              }}>
              <Text style={styles.discontinueCardText}>Suspender tarjeta</Text>
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
          <Text style={styles.gradeQuestion}>
            Califica el nivel de la pregunta
          </Text>
          <View style={styles.bottomLevelButtons}>
            <Pressable style={styles.easyLevelButton}>
              <Text style={styles.levelText}>Fácil</Text>
            </Pressable>
            <Pressable style={styles.normalLevelButton}>
              <Text style={styles.levelText}>Normal</Text>
            </Pressable>
            <Pressable style={styles.hardLevelButton}>
              <Text style={styles.levelText}>Difícil</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={discontinueCardModalVisible}>
        <View style={styles.container}>
          <View style={styles.flipCard}>
            <Text style={styles.cardTitle}>
              ¿Estás seguro de que quieres suspender?
            </Text>
            <Text style={styles.cardTextModal}>
              Suspender una tarjeta la sacará de tus sesiones de estudio de
              ahora en adelante. Pero tranquilo, podrás volverla a activar en el
              buscador de suspendidas.
            </Text>
            <View style={styles.bottomButtonsModal}>
              <Pressable
                onPress={() =>
                  setDiscontinueCardModalVisible(!discontinueCardModalVisible)
                }
                style={styles.previousQuestionButton}>
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  setDiscontinueCardModalVisible(!discontinueCardModalVisible)
                }
                style={styles.seeAnswerButton}>
                <Text style={styles.seeAnswerButtonText}>Suspender</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    marginTop: 10,
    padding: 5,
  },
  cardTextFront: {
    marginTop: 35,
  },
  cardTextModal: {
    padding: 10,
    marginTop: 50,
    textAlign: 'justify',
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
  bottomButtonsModal: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  discontinueCardButton: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  discontinueCardText: {
    color: colors.skyblue,
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
  gradeQuestion: {
    marginTop: 10,
  },
  bottomLevelButtons: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  easyLevelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    marginStart: 4,
    marginEnd: 2,
    backgroundColor: colors.green,
  },
  normalLevelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    marginStart: 2,
    marginEnd: 2,
    backgroundColor: colors.yellow,
  },
  hardLevelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    marginStart: 2,
    marginEnd: 4,
    backgroundColor: colors.red,
  },
  levelText: {
    color: colors.backgroundWhite,
  },
});

export default QuestionnaireScreen;
