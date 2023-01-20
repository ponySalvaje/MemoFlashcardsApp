import {FlatList} from 'react-native';

import TopicGridTile from '../../components/topicGridTile';

import {TOPICS} from '../../data/dummy-data';

const TopicsScreen = ({navigation}) => {
  const renderTopicItem = itemData => {
    const pressHandler = () => {
      navigation.navigate('Questionnaire', {
        topicId: itemData.item.id,
      });
    };

    return <TopicGridTile item={itemData.item} onPress={pressHandler} />;
  };

  return (
    <FlatList
      data={TOPICS}
      keyExtractor={item => item.id}
      renderItem={renderTopicItem}
      numColumns={2}
    />
  );
};

export default TopicsScreen;
