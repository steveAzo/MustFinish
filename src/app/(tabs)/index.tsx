import { StyleSheet, FlatList } from 'react-native';
import { View, Text} from '../../components/Themed';
import { tracks } from '@/assets/data/tracks';
import TrackListItem from '@/src/components/TractListItem';

export default function HomeScreen() {
  return (
      <FlatList 
        data={tracks} 
        renderItem={({ item }) => <TrackListItem track={item}/>} 
        showsHorizontalScrollIndicator={false}
        />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
