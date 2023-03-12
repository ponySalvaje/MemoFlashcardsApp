import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import TopicGridTile from '../../components/topicGridTile';
import {getTopics} from '../../api/topics.api';

const TopicsScreen = ({route, navigation}) => {
  const [topics, setTopics] = useState([]);

  const isFocused = useIsFocused();

  const topicsList = useCallback(async () => {
    const result = await getTopics(route.params.specialtyId);
    setTopics(result.data.content);
  }, [navigation, isFocused]);

  useEffect(() => {
    topicsList();
  }, [topicsList]);

  const renderTopicItem = itemData => {
    const pressHandler = () => {
      navigation.navigate('Questionnaire', {
        topicId: itemData.item.id,
        topicName: itemData.item.title,
      });
    };

    return <TopicGridTile item={itemData.item} onPress={pressHandler} />;
  };

  return (
    <FlatList
      data={topics}
      keyExtractor={item => item.id}
      renderItem={renderTopicItem}
      numColumns={2}
    />
  );
};

export default TopicsScreen;
