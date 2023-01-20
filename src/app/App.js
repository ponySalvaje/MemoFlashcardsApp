import {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Profile, SignUp, Specialties} from '../screens';
import {Image, Text, View} from 'react-native';
import AuthContextProvider, {AuthContext} from '../store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../common/constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
        },
        headerTitleAlign: 'center',
        headerLeft: () => {
          return (
            <Image
              style={{marginHorizontal: 15, width: 40, height: 40}}
              source={require('../assets/logo/memo_logo.png')}
            />
          );
        },
      }}
      initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Signup" component={SignUp} />
    </Stack.Navigator>
  );
};

const SpecialtiesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.backgroundWhite},
        headerTitleAlign: 'center',
        headerTintColor: colors.primary,
        contentStyle: {backgroundColor: colors.backgroundWhite},
        initialRouteName: 'Specialties',
      }}>
      <Stack.Screen
        name="Añade el tema que desees estudiar"
        component={Specialties}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.backgroundWhite},
        headerTitleAlign: 'center',
        headerTintColor: colors.primary,
        contentStyle: {backgroundColor: colors.backgroundWhite},
        initialRouteName: 'Profile',
      }}>
      <Stack.Screen name="Mi perfil" component={Profile} />
    </Stack.Navigator>
  );
};

const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        keyboardHidesTabBar: true,
        headerShown: false,
      }}
      initialRouteName="SpecialtiesStack">
      <Tab.Screen
        name="SpecialtiesStack"
        component={SpecialtiesStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <Text>Ícono</Text>;
          },
          tabBarLabel: ({focused}) => {
            return <Text>Inicio</Text>;
          },
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <Text>Ícono</Text>;
          },
          tabBarLabel: ({focused}) => {
            return <Text>Inicio</Text>;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    /*
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.backgroundWhite},
        headerTitleAlign: 'center',
        headerTintColor: colors.primary,
        contentStyle: {backgroundColor: colors.backgroundWhite},
      }}>
      <Stack.Screen
        name="Añade el tema que desees estudiar"
        component={Specialties}
      />
    </Stack.Navigator>
    */
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabNavigation"
        component={MainTabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return (
      <View>
        <Text>Cargando</Text>
      </View>
    );
  }

  return <Navigation />;
};

const App = () => {
  return (
    /*
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    */
    <>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
};

export default App;
