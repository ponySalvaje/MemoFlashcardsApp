import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Questionnaire,
  Specialties,
  Topics,
  CulqiCheckout,
  CulqiError,
} from '../screens';
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
        options={{
          title: 'Añade el tema que desees estudiar',
          headerTitleStyle: {fontFamily: 'Raleway-Bold'},
        }}
      />
      <Stack.Screen
        name="Topics"
        component={Topics}
        options={({route}) => ({
          title: route.params.topicTitle || 'Temas de estudio',
          headerTitleStyle: {fontSize: 15, fontFamily: 'Raleway-Bold'},
        })}
      />
      <Stack.Screen
        name="Questionnaire"
        component={Questionnaire}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CulqiCheckout"
        component={CulqiCheckout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CulqiError"
        component={CulqiError}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SpecialtiesStack;
