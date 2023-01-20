import {FlatList} from 'react-native';

import SpecialtyGridTile from '../../components/specialtyGridTile';

import {SPECIALTIES} from '../../data/dummy-data';

const SpecialtiesScreen = ({navigation}) => {
  function renderSpecialtyItem(itemData) {
    function pressHandler() {
      navigation.navigate('Topic', {
        specialtyId: itemData.item.id,
      });
    }

    return <SpecialtyGridTile item={itemData.item} onPress={pressHandler} />;
  }

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
