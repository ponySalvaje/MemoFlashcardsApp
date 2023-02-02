import {useIsFocused} from '@react-navigation/native';
import {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {getSpecialties} from '../../api/specialties.api';

import SpecialtyGridTile from '../../components/specialtyGridTile';
import {AuthContext} from '../../store/auth-context';

const SpecialtiesScreen = ({navigation}) => {
  const [specialties, setSpecialties] = useState([]);

  const isFocused = useIsFocused();

  const authCtx = useContext(AuthContext);

  const specialtiesList = useCallback(async () => {
    try {
      const result = await getSpecialties();
      setSpecialties(result.data.content);
    } catch (error) {
      authCtx.logout();
    }
  }, [navigation, isFocused]);

  useEffect(() => {
    specialtiesList();
  }, [specialtiesList]);

  const renderSpecialtyItem = itemData => {
    const pressHandler = () => {
      navigation.navigate('Topics', {
        specialtyId: itemData.item.id,
        topicTitle: `Temas de estudio para ${itemData.item.title}`,
      });
    };

    return <SpecialtyGridTile item={itemData.item} onPress={pressHandler} />;
  };

  return (
    <FlatList
      data={specialties}
      keyExtractor={item => item.id}
      renderItem={renderSpecialtyItem}
      numColumns={2}
    />
  );
};

export default SpecialtiesScreen;
