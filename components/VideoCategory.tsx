import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { VideoCategory as CategoryType } from '@/types/video';

interface VideoCategoryProps {
  category: CategoryType;
  onVideoPress: (videoId: string) => void;
}

export function VideoCategory({ category, onVideoPress }: VideoCategoryProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{category.name}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {category.videos.map((video) => (
          <TouchableOpacity 
            key={video.id} 
            style={styles.videoCard}
            onPress={() => onVideoPress(video.id)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
              <Text style={styles.videoMeta}>{video.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
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
    width: 160,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: Colors.card,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 90,
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  videoMeta: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
});