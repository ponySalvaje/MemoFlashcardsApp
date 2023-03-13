import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getProgress} from '../../api/progress.api';
import LoadingScreen from '../../components/loadingScreen';
import ProgressItem from '../../components/progressItem';

const ProgressScreen = ({navigation}) => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const progressList = useCallback(async () => {
    setLoading(true);
    const result = await getProgress();
    setProgress(result.data);
    setLoading(false);
  }, [navigation, isFocused]);

  useEffect(() => {
    progressList();
  }, [progressList]);

  const renderProgressItem = itemData => {
    const pressHandler = () => {
      navigation.navigate('Topics', {
        specialtyId: itemData.item.lessonId,
        topicTitle: `Temas de estudio para ${itemData.item.subjectName}`,
      });
    };

    return <ProgressItem item={itemData.item} onPress={pressHandler} />;
  };

  const renderProgress = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={progress}
          keyExtractor={item => item.subjectName}
          renderItem={renderProgressItem}
          numColumns={1}
        />
      </View>
    );
  };

  return <>{!loading ? renderProgress() : <LoadingScreen />}</>;
};

export default ProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
