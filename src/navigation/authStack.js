import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import {Login, SignUp} from '../screens';

const Stack = createNativeStackNavigator();

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
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Registrarse',
          headerTitleStyle: {fontSize: 18, fontFamily: 'Raleway-Bold'},
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
