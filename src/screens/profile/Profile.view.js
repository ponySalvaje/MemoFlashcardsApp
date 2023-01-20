import {useContext} from 'react';
import {Pressable, Text, View} from 'react-native';
import {AuthContext} from '../../store/auth-context';

const ProfileScreen = () => {
  const authCtx = useContext(AuthContext);
  return (
    <View>
      <Pressable onPress={authCtx.logout}>
        <Text>Cerrar Sesion</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
