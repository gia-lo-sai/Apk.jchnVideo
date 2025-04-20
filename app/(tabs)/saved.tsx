import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Bookmark, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { mockSavedVideos } from '@/data/mockData';

export default function SavedScreen() {
  const router = useRouter();
  const [savedVideos, setSavedVideos] = useState(mockSavedVideos);
  
  const handleVideoPress = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };
  
  const removeVideo = (videoId: string) => {
    setSavedVideos(savedVideos.filter(video => video.id !== videoId));
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Videos</Text>
        </View>
        
        {savedVideos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Bookmark size={64} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>No saved videos</Text>
            <Text style={styles.emptyText}>
              Videos you save will appear here for easy access
            </Text>
          </View>
        ) : (
          <FlatList
            data={savedVideos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.videoCard}>
                <TouchableOpacity 
                  style={styles.videoContent}
                  onPress={() => handleVideoPress(item.id)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                  <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.videoMeta}>{item.duration}</Text>
                    <Text style={styles.videoDate}>Saved on {item.savedDate}</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeVideo(item.id)}
                >
                  <Trash2 size={20} color={Colors.error} />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.videosList}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  videosList: {
    padding: 16,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  videoContent: {
    flex: 1,
    flexDirection: 'row',
  },
  thumbnail: {
    width: 120,
    height: 80,
  },
  videoInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
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
    marginBottom: 4,
  },
  videoDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  removeButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor,
  },
});