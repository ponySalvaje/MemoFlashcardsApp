import {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {AuthContext} from '../../store/auth-context';
import {colors} from '../../common/constants';
import CustomInputText from '../../components/customInputText';
import {login} from '../../api/auth.api';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const buttonOpacity = useSharedValue(1);

  const register = () => {
    navigation.navigate('SignUp');
  };

  const onStateChange = () => {
    buttonOpacity.value = 0;
  };

  const onCloseState = () => {
    buttonOpacity.value = 1;
  };

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const backgroundY = interpolate(
      buttonOpacity.value,
      [0, 1],
      [-height / 3, 0],
    );
    return {
      transform: [{translateY: withTiming(backgroundY, {duration: 1000})}],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const buttonY = interpolate(buttonOpacity.value, [0, 1], [100, 0]);
    return {
      opacity: buttonOpacity.value,
      transform: [{translateY: withTiming(buttonY, {duration: 1000})}],
    };
  });

  const textInputAnimatedStyle = useAnimatedStyle(() => {
    const textInputY = interpolate(buttonOpacity.value, [0, 1], [0, 100]);
    const textInputOpacity = interpolate(buttonOpacity.value, [0, 1], [1, 0]);
    const textInputZIndex = interpolate(buttonOpacity.value, [0, 1], [1, -1]);
    return {
      zIndex: textInputZIndex,
      opacity: textInputOpacity,
      transform: [{translateY: withTiming(textInputY, {duration: 1000})}],
    };
  });

  const loginHandler = async () => {
    setIsAuthenticating(true);
    try {
      const result = await login(username, password);
      authCtx.authenticate(result.data.token);
    } catch (error) {
      Alert.alert(
        '¡Ups! Algo salió mal',
        'Estas credenciales no coinciden con nuestros registros',
      );
      setIsAuthenticating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={require('../../assets/login/login_background_image.png')}
          style={styles.imageBackground}
        />
      </Animated.View>
      <Animated.View>
        <Image
          source={require('../../assets/logo/memo_logo.png')}
          style={styles.imageLogo}></Image>
      </Animated.View>
      <Animated.View
        style={[styles.bottomAnimationContent, backgroundAnimatedStyle]}>
        <Pressable onPress={onStateChange}>
          <Animated.View
            style={[styles.button, styles.loginLabel, buttonAnimatedStyle]}>
            <Text style={styles.textButton}>Iniciar Sesión</Text>
          </Animated.View>
        </Pressable>
        <Pressable onPress={register}>
          <Animated.View style={[styles.button, buttonAnimatedStyle]}>
            <Text style={styles.textButton}>Registrarse</Text>
          </Animated.View>
        </Pressable>
        <Animated.View style={[buttonAnimatedStyle]}>
          <Text style={styles.forgotPasswordText}>
            ¿Olvidaste tu contraseña?
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.inputFieldsContent,
            StyleSheet.absoluteFillObject,
            textInputAnimatedStyle,
          ]}>
          <Animated.View style={styles.contentContainer}>
            <Text style={styles.loginText}>Iniciar Sesión</Text>
            <Animated.View style={styles.username}>
              <CustomInputText
                label="Correo electrónico"
                name="email"
                keyboardType="email-address"
                value={username}
                onChange={ev => setUsername(ev)}
              />
            </Animated.View>
            <Animated.View style={styles.password}>
              <CustomInputText
                label="Contraseña"
                name="password"
                secureTextEntry={true}
                value={password}
                onChange={ev => setPassword(ev)}
              />
            </Animated.View>
            <Animated.View style={styles.bottomButtons}>
              <Animated.View style={styles.loginButton}>
                <Pressable
                  onPress={loginHandler}
                  style={styles.loginButtonAction}>
                  <Text style={{color: colors.white, fontFamily: 'Raleway'}}>
                    Iniciar Sesión
                  </Text>
                </Pressable>
              </Animated.View>
              <Animated.View>
                <Pressable onPress={onCloseState}>
                  <Animated.View style={styles.cancelButton}>
                    <Text style={{color: colors.white, fontFamily: 'Raleway'}}>
                      Cancelar
                    </Text>
                  </Animated.View>
                </Pressable>
              </Animated.View>
              <Text style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  imageBackground: {
    height: height,
    width: width,
  },
  imageLogo: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
    top: 80,
  },
  bottomAnimationContent: {
    top: (2 * height) / 3,
    height: (2 * height) / 3,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: colors.primary,
    color: 'white',
    borderRadius: 4,
    height: 40,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  loginLabel: {
    marginTop: 40,
  },
  inputFieldsContent: {
    height: height / 3,
    justifyContent: 'center',
  },
  textButton: {
    fontFamily: 'Raleway',
    fontSize: 15,
    color: colors.white,
  },
  contentContainer: {
    flex: 1,
  },
  loginText: {
    marginTop: 40,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
  },
  username: {
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 50,
    fontSize: 18,
  },
  password: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 50,
    fontSize: 18,
  },
  inputText: {
    marginTop: 10,
    marginEnd: 50,
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  bottomButtons: {
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontFamily: 'Raleway',
    color: '#727377',
    textAlign: 'center',
    marginTop: 20,
  },
  loginButton: {
    marginStart: 50,
    marginEnd: 50,
    marginBottom: 10,
  },
  loginButtonAction: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  cancelButton: {
    backgroundColor: colors.danger,
    marginStart: 50,
    marginEnd: 50,
    marginBottom: 10,
    color: colors.white,
    borderRadius: 4,
    height: 40,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
