import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import TopicGridTile from '../../components/topicGridTile';
import {getTopics} from '../../api/topics.api';
import LoadingScreen from '../../components/loadingScreen';

const TopicsScreen = ({route, navigation}) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const topicsList = useCallback(async () => {
    setLoading(true);
    const result = await getTopics(route.params.specialtyId);
    setTopics(result.data.content);
    setLoading(false);
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

  const renderTopics = () => {
    return (
      <FlatList
        data={topics}
        keyExtractor={item => item.id}
        renderItem={renderTopicItem}
        numColumns={2}
      />
    );
  };

  return <>{!loading ? renderTopics() : <LoadingScreen />}</>;
};

export default TopicsScreen;
