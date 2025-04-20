import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Play, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VideoCategory } from '@/components/VideoCategory';
import { FeaturedVideo } from '@/components/FeaturedVideo';
import { ContinueWatchingRow } from '@/components/ContinueWatchingRow';
import { mockFeatured, mockContinueWatching, mockCategories } from '@/data/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleVideoPress = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading videos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>VideoStream</Text>
        </View>
        
        <FeaturedVideo 
          video={mockFeatured} 
          onPress={() => handleVideoPress(mockFeatured.id)} 
        />
        
        <ContinueWatchingRow 
          videos={mockContinueWatching} 
          onVideoPress={handleVideoPress} 
        />
        
        {mockCategories.map((category) => (
          <VideoCategory 
            key={category.id}
            category={category}
            onVideoPress={handleVideoPress}
          />
        ))}
      </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
});