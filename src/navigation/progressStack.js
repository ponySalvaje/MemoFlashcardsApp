import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Progress} from '../screens';
import {colors} from '../common/constants';

const Stack = createNativeStackNavigator();

const ProgressStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.backgroundWhite},
        headerTitleAlign: 'center',
        headerTintColor: colors.primary,
        contentStyle: {backgroundColor: colors.backgroundWhite},
        initialRouteName: 'Progress',
      }}>
      <Stack.Screen name="Mi progreso" component={Progress} />
    </Stack.Navigator>
  );
};

export default ProgressStack;
