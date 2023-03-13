import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../common/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCallback, useEffect, useState} from 'react';
import {getCards} from '../../api/cards.api';
import {useIsFocused} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import {scoreCard} from '../../api/scores.api';
import UpgradePremium from '../upgradePremium/UpgradePremium';
import LoadingScreen from '../../components/loadingScreen';

const {width} = Dimensions.get('window');
const widthCard = width - 20;

const QuestionnaireScreen = ({route, navigation}) => {
  const flipDegree = useSharedValue(0);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentCard, setCurrentCard] = useState();

  const isFocused = useIsFocused();

  const cardsList = useCallback(async () => {
    setLoading(true);
    const result = await getCards(route.params.topicId);
    setCards(result.data.content);
    setCurrentCard(0);
    setLoading(false);
  }, [navigation, isFocused]);

  useEffect(() => {
    cardsList();
  }, [cardsList]);

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

  const goToNextCard = () => {
    setTimeout(() => {
      setCurrentCard(previousCard => previousCard + 1);
    }, 500); // change question in the middle of animation
  };

  const gradeQuestion = async difficulty => {
    try {
      await scoreCard(cards[currentCard].id, difficulty);
    } catch (error) {
      Alert.alert(
        '¡Ups! Algo salió mal',
        'Hubo un problema al evaluar la pregunta anterior',
      );
    }
    if (difficulty != 'SUSPENDED') flipCard();
    goToNextCard();
  };

  const seePreviousCard = () => {
    setCurrentCard(previousCard => previousCard - 1);
  };

  const prepareHtml = html => {
    newHtml = html
      .replaceAll('<font', '<span')
      .replaceAll('</font>', '</span>');
    return newHtml;
  };

  const renderQuestionnaire = () => {
    return (
      <View style={styles.container}>
        {cards[currentCard] ? (
          <>
            <View style={styles.topicTitle}>
              <Text style={styles.topicTitleText}>
                Tema: {route.params.topicName}
              </Text>
              <Text style={styles.progressIndicator}>
                {currentCard + 1} / {cards.length} Tarjetas
              </Text>
            </View>
            <View>
              <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <Text style={styles.cardTitle}>{cards[currentCard].name}</Text>
                <View style={[styles.cardText, styles.cardTextFront]}>
                  <RenderHTML
                    contentWidth={100}
                    source={{html: prepareHtml(cards[currentCard].question)}}
                  />
                </View>
                <View style={styles.bottomButtons}>
                  {currentCard == 0 ? (
                    <></>
                  ) : (
                    <Pressable
                      style={styles.previousQuestionButton}
                      onPress={seePreviousCard}>
                      <Text style={styles.seePreviousButtonText}>
                        Ver Anterior
                      </Text>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={flipCard}
                    style={[
                      styles.seeAnswerButton,
                      currentCard == 0
                        ? styles.onlyBottomButton
                        : styles.notOnlyBottomButton,
                    ]}>
                    <Text style={styles.seeAnswerButtonText}>
                      Ver Respuesta
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.discontinueCardButton}>
                  <Pressable
                    onPress={() => {
                      gradeQuestion;
                      setDiscontinueCardModalVisible(
                        !discontinueCardModalVisible,
                      );
                    }}>
                    <Text style={styles.discontinueCardText}>
                      Suspender tarjeta
                    </Text>
                  </Pressable>
                </View>
              </Animated.View>
              <Animated.View
                style={[
                  styles.flipCard,
                  styles.flipCardBack,
                  backAnimatedStyle,
                ]}>
                <View style={styles.flipCardGroup}>
                  <Pressable onPress={flipCard} style={styles.flipIcon}>
                    <Ionicons size={22} name="sync" />
                  </Pressable>
                </View>
                <Text style={styles.cardTitle}>Respuesta</Text>
                <RenderHTML
                  contentWidth={100}
                  source={{html: prepareHtml(cards[currentCard].answer)}}
                />
                <View style={styles.bottomLevelButtons}>
                  <Pressable
                    style={styles.easyLevelButton}
                    onPress={() => {
                      gradeQuestion('EASY');
                    }}>
                    <Text style={styles.levelText}>Fácil</Text>
                  </Pressable>
                  <Pressable
                    style={styles.normalLevelButton}
                    onPress={() => {
                      gradeQuestion('MEDIUM');
                    }}>
                    <Text style={styles.levelText}>Normal</Text>
                  </Pressable>
                  <Pressable
                    style={styles.hardLevelButton}
                    onPress={() => {
                      gradeQuestion('HARD');
                    }}>
                    <Text style={styles.levelText}>Difícil</Text>
                  </Pressable>
                </View>
              </Animated.View>
              {cards[currentCard].help != '' ? (
                <Animated.View style={backAnimatedStyle}>
                  <View style={styles.helpGroup}>
                    <View style={styles.helpHeader}>
                      <Text style={styles.helpHeaderText}>Ayuda</Text>
                    </View>
                    <RenderHTML
                      contentWidth={100}
                      source={{html: prepareHtml(cards[currentCard].help)}}
                    />
                  </View>
                </Animated.View>
              ) : (
                <></>
              )}
            </View>
          </>
        ) : (cards.length > 0 && currentCard == cards.length) ||
          cards.length === 0 ? (
          <UpgradePremium navigation={navigation} />
        ) : (
          <></>
        )}
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
                ahora en adelante. Pero tranquilo, podrás volverla a activar en
                el buscador de suspendidas.
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
                  onPress={() => {
                    setDiscontinueCardModalVisible(
                      !discontinueCardModalVisible,
                    );
                    gradeQuestion('SUSPENDED');
                  }}
                  style={styles.dismissQuestionButton}>
                  <Text style={styles.seeAnswerButtonText}>Suspender</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return <>{!loading ? renderQuestionnaire() : <LoadingScreen />}</>;
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
    width: widthCard,
    height: 250,
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
    fontFamily: 'Raleway-Bold',
    marginTop: 10,
    position: 'absolute',
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    marginTop: 10,
    padding: 5,
  },
  cardTextFront: {
    marginTop: 25,
  },
  cardTextModal: {
    padding: 10,
    marginTop: 50,
    textAlign: 'justify',
  },
  cardAnswer: {
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
    fontFamily: 'Raleway',
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
    marginStart: 5,
    marginEnd: 10,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  onlyBottomButton: {
    width: widthCard / 2,
  },
  notOnlyBottomButton: {
    flex: 1,
  },
  seePreviousButtonText: {
    fontFamily: 'Raleway',
  },
  seeAnswerButtonText: {
    fontFamily: 'Raleway',
    color: colors.secondary,
  },
  dismissQuestionButton: {
    flex: 1,
    marginStart: 5,
    marginEnd: 10,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  gradeQuestion: {
    marginTop: 10,
  },
  bottomLevelButtons: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
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
    fontFamily: 'Raleway',
    color: colors.backgroundWhite,
  },
  helpGroup: {
    margin: 20,
    backgroundColor: colors.backgroundGray,
  },
  helpHeader: {
    backgroundColor: colors.backgroundPurple,
    alignItems: 'center',
  },
  helpHeaderText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    padding: 5,
  },
  topicTitle: {
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingBottom: 15,
  },
  topicTitleText: {
    flex: 1,
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    padding: 5,
  },
  progressIndicator: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Raleway',
    fontSize: 16,
    padding: 5,
  },
});

export default QuestionnaireScreen;
