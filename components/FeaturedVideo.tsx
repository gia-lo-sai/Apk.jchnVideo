import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { Video } from '@/types/video';

interface FeaturedVideoProps {
  video: Video;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

export function FeaturedVideo({ video, onPress }: FeaturedVideoProps) {
  return (
    <TouchableOpacity 
      style={styles.featuredContainer} 
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image 
        source={{ uri: video.thumbnail }} 
        style={styles.featuredImage} 
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      
      <View style={styles.featuredContent}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>Featured</Text>
        </View>
        
        <Text style={styles.featuredTitle}>{video.title}</Text>
        <Text style={styles.featuredDuration}>{video.duration}</Text>
        
        <TouchableOpacity style={styles.playButton} onPress={onPress}>
          <Play color={Colors.text} size={20} />
          <Text style={styles.playButtonText}>Play Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  featuredContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.card,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  featuredBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: Colors.text,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  featuredTitle: {
    color: Colors.text,
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  featuredDuration: {
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: Colors.text,
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});