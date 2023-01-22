import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {getSpecialties} from '../../api/specialties.api';

import SpecialtyGridTile from '../../components/specialtyGridTile';

import {SPECIALTIES} from '../../data/dummy-data';

const SpecialtiesScreen = ({navigation}) => {
  const [specialties, setSpecialties] = useState([]);

  const isFocused = useIsFocused();

  const specialtiesList = useCallback(async () => {
    const result = await getSpecialties();
    setSpecialties(result.data.content);
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
