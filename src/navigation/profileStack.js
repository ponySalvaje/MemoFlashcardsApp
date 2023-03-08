import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Profile} from '../screens';
import {colors} from '../common/constants';

const Stack = createNativeStackNavigator();

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
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Mi perfil',
          headerTitleStyle: {fontFamily: 'Raleway-Bold'},
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
