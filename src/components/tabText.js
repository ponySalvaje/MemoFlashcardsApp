import {Text} from 'react-native';
import {colors} from '../common/constants';

function TabText({item}) {
  return (
    <Text
      style={{
        color: item.focused ? colors.primary : colors.gray,
        fontFamily: item.focused ? 'Raleway-Bold' : 'Raleway',
      }}>
      {item.title}
    </Text>
  );
}

export default TabText;
