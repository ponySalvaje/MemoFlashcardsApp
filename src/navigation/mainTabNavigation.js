import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabIcon from '../components/tabIcon';
import TabText from '../components/tabText';
import ProfileStack from './profileStack';
import SpecialtiesStack from './specialtiesStack';
import ProgressStack from './progressStack';

const Tab = createBottomTabNavigator();

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
            return <TabIcon item={{icon: 'medkit', focused: focused}} />;
          },
          tabBarLabel: ({focused}) => {
            return <TabText item={{title: 'Especialidad', focused: focused}} />;
          },
        }}
      />
      <Tab.Screen
        name="ProgressStack"
        component={ProgressStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <TabIcon item={{icon: 'pulse', focused: focused}} />;
          },
          tabBarLabel: ({focused}) => {
            return <TabText item={{title: 'Progreso', focused: focused}} />;
          },
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <TabIcon item={{icon: 'person', focused: focused}} />;
          },
          tabBarLabel: ({focused}) => {
            return <TabText item={{title: 'Perfil', focused: focused}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigation;
