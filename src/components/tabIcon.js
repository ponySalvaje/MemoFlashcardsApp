import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../common/constants';

function TabIcon({item}) {
  return (
    <View>
      <Icon
        size={22}
        name={item.icon}
        color={item.focused ? colors.primary : colors.gray}
      />
    </View>
  );
}

export default TabIcon;
