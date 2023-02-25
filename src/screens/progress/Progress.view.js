import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getProgress} from '../../api/progress.api';
import ProgressItem from '../../components/progressItem';

const ProgressScreen = ({navigation}) => {
  const [progress, setProgress] = useState([]);

  const isFocused = useIsFocused();

  const progressList = useCallback(async () => {
    const result = await getProgress();
    setProgress(result.data);
  }, [navigation, isFocused]);

  useEffect(() => {
    progressList();
  }, [progressList]);

  const renderProgressItem = itemData => {
    const pressHandler = () => {
      navigation.navigate('Topics', {
        specialtyId: 1,
        topicTitle: `Temas de estudio para ${itemData.subjectName}`,
      });
    };

    return <ProgressItem item={itemData.item} onPress={pressHandler} />;
  };

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

export default ProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
