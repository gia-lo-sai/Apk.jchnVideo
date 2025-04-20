import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Play } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Video } from '@/types/video';

interface ContinueWatchingRowProps {
  videos: Video[];
  onVideoPress: (videoId: string) => void;
}

export function ContinueWatchingRow({ videos, onVideoPress }: ContinueWatchingRowProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Continue Watching</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map((video) => (
          <TouchableOpacity 
            key={video.id} 
            style={styles.videoCard}
            onPress={() => onVideoPress(video.id)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${video.progress}%` }]} />
            </View>
            
            <View style={styles.videoInfo}>
              <View>
                <Text style={styles.videoTitle} numberOfLines={1}>{video.title}</Text>
                <Text style={styles.videoMeta}>{video.remainingTime} left</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.playIconContainer}
                onPress={() => onVideoPress(video.id)}
              >
                <Play color={Colors.text} size={16} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  videoCard: {
    width: 200,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: Colors.card,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  progressContainer: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  videoInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
    width: 140,
  },
  videoMeta: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  playIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});