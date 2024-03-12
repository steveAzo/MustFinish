import { StyleSheet, FlatList, View, TextInput, Text } from 'react-native';
import { tracks } from '@/assets/data/tracks';
import TrackListItem from '@/src/components/TractListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function SearchScreen() {
  const [search, setSearch] = useState('')

  return (
    <SafeAreaView>
      <View style={styles.header}>
        {/* Header */}
        <FontAwesome 
          name='search' 
          size={16} 
          color='gray' 
        />
        <TextInput 
          value={search}
          onChangeText={setSearch}
          placeholder='What do you want to listen to?' 
          style={styles.input}
        />
        <Text style={{ color: 'white' }} onPress={() => setSearch('')}>
          Cancel
        </Text>
      </View>
      <FlatList 
        data={tracks} 
        renderItem={({ item }) => <TrackListItem track={item}/>} 
        showsHorizontalScrollIndicator={false}
        />
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#121314',
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 5,
    color: 'white',
  },

})


