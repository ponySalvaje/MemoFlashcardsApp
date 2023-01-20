import {Text} from 'react-native';
import {colors} from '../common/constants';

function TabText({item}) {
  return (
    <Text
      style={{
        color: item.focused ? colors.primary : colors.gray,
        fontWeight: item.focused ? 'bold' : '',
      }}>
      {item.title}
    </Text>
  );
}

export default TabText;
