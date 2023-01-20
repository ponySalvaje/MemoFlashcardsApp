import {FlatList} from 'react-native';

import SpecialtyGridTile from '../../components/specialtyGridTile';

import {SPECIALTIES} from '../../data/dummy-data';

const SpecialtiesScreen = ({navigation}) => {
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
      data={SPECIALTIES}
      keyExtractor={item => item.id}
      renderItem={renderSpecialtyItem}
      numColumns={2}
    />
  );
};

export default SpecialtiesScreen;
