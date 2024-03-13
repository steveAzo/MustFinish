import { View, Text, StyleSheet, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { usePlayerContext } from '../providers/PlayerProvider'
import { useEffect, useState } from 'react'
import { AVPlaybackStatus, Audio } from 'expo-av'


const Player = () => {
    const [sound, setSound] = useState<Sound>()
    const [isplaying, setIsPlaying] = useState(false)
    const { track } = usePlayerContext()
    

    useEffect(() => {
        playTrack()   
    }, [track])

    useEffect(() => {
        return sound
         ? () => {
            console.log('Unloading Sound')
            sound.unloadAsync()
           }
        : undefined
    }, [sound]);

    const playTrack = async () => {
        if (sound) {
            await sound.unloadAsync()
        }

        if (!track?.preview_url) {
            return;
        }
        console.log('Playing: ', track.id)

        const { sound: newSound } = await Audio.Sound.createAsync({
            uri: track.preview_url,
        })

        setSound(newSound)
        newSound.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate)
        await newSound.playAsync()
    }

    const onPlayBackStatusUpdate = (status: AVPlaybackStatus) => {
        console.log(status)
        if (!status.isLoaded) {
            return
        }

        setIsPlaying(status.isPlaying)
    }


    const onPlayPause = async () => {
        if (!sound) {
            return
        } 

        if (isplaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    }

    if (!track) {
        return null;
    }

    console.log('Selected track:', track);

    const image = track.album.images?.[0]

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                {image && <Image source={{ uri: image.url }} style={styles.image} />}

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{track.name}</Text>
                    <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
                </View>  

                <Ionicons
                    name={'heart-outline'}
                    size={20}
                    color={'white'}
                    style={{ marginHorizontal: 10 }}
                />
                <Ionicons
                    onPress={onPlayPause}
                    disabled={!track?.preview_url}
                    name={isplaying ? 'pause': 'play'}
                    size={22}
                    color={track?.preview_url ? 'white': 'gray'}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        top: -75,
        height: 75,
        padding: 10,
    },
    player: {
        backgroundColor: '#286660',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 3,
        paddingRight: 15,
    },
    title: {
        color: 'white',
    },
    subtitle: {
        color: 'lightweight',
        fontSize: 12,
    },
    image: {
        height: '100%',
        aspectRatio: 1,
        marginRight: 10,
        borderRadius: 5,
    },
})

export default Player; 