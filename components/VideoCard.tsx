import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
  onPress: () => void;
}

export function VideoCard({ video, onPress }: VideoCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{video.title}</Text>
        <Text style={styles.channel}>{video.channel}</Text>
        <Text style={styles.meta}>{video.views} views • {video.uploadDate}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  thumbnail: {
    width: 120,
    height: 68,
    borderRadius: 8,
    backgroundColor: Colors.card,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  channel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  meta: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
});