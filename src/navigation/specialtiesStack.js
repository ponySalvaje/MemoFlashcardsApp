import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Specialties, Topics} from '../screens';
import {colors} from '../common/constants';

const Stack = createNativeStackNavigator();

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
        name="Specialties"
        component={Specialties}
        options={{title: 'Añade el tema que desees estudiar'}}
      />
      <Stack.Screen
        name="Topics"
        component={Topics}
        options={({route}) => ({
          title: route.params.topicTitle || 'Temas de estudio',
          headerTitleStyle: {fontSize: 15},
        })}
      />
    </Stack.Navigator>
  );
};

export default SpecialtiesStack;
