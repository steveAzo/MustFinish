import { StyleSheet, FlatList } from 'react-native';
import { tracks } from '@/assets/data/tracks';
import TrackListItem from '../../components/TractListItem';
import Player from '../../components/Player';

export default function HomeScreen() {
  return (
      
      <FlatList 
        data={tracks} 
        renderItem={({ item }) => <TrackListItem track={item}/>} 
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <Player />}
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
