import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Heart, Bookmark, Share2 } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import Colors from '@/constants/Colors';
import { mockAllVideos, mockRelatedVideos } from '@/data/mockData';
import { Video } from '@/types/video';
import { VideoCard } from '@/components/VideoCard';

export default function VideoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const webViewRef = useRef<WebView>(null);
  
  useEffect(() => {
    // Find the video by id
    const foundVideo = mockAllVideos.find(v => v.id === id);
    
    if (foundVideo) {
      setVideo(foundVideo);
      setIsLoading(false);
    } else {
      setError('Video not found');
      setIsLoading(false);
    }
  }, [id]);
  
  const toggleLike = () => setLiked(!liked);
  const toggleSave = () => setSaved(!saved);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);
  const handleShare = () => {
    // Share functionality would go here
    alert('Sharing this video!');
  };
  
  const handleRelatedVideoPress = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading video...</Text>
      </View>
    );
  }
  
  if (error || !video) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'An error occurred'}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: video.videoUrl || `https://www.youtube.com/embed/${video.youtubeId}` }}
            style={styles.webView}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
          
          <TouchableOpacity 
            style={styles.backButtonOverlay} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoMeta}>{video.views} views • {video.uploadDate}</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={toggleLike}>
                <Heart 
                  size={24} 
                  color={liked ? Colors.primary : Colors.text} 
                  fill={liked ? Colors.primary : 'transparent'} 
                />
                <Text style={styles.actionText}>Like</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={toggleSave}>
                <Bookmark 
                  size={24} 
                  color={saved ? Colors.primary : Colors.text} 
                  fill={saved ? Colors.primary : 'transparent'} 
                />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Share2 size={24} color={Colors.text} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.channelInfo}>
            <View style={styles.channelContainer}>
              <View style={styles.channelAvatar}>
                <Text style={styles.channelAvatarText}>{video.channel.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.channelName}>{video.channel}</Text>
                <Text style={styles.subscriberCount}>{video.subscribers} subscribers</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{video.description}</Text>
          </View>
          
          <View style={styles.relatedVideos}>
            <Text style={styles.relatedTitle}>Related Videos</Text>
            
            {mockRelatedVideos.map((relatedVideo) => (
              <VideoCard
                key={relatedVideo.id}
                video={relatedVideo}
                onPress={() => handleRelatedVideoPress(relatedVideo.id)}
              />
            ))}
          </View>
        </ScrollView>
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
  videoContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#000',
    position: 'relative',
  },
  webView: {
    width: '100%',
    height: '100%',
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
  },
  videoInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  videoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
  },
  videoMeta: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.text,
    marginTop: 4,
  },
  channelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  channelAvatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
  },
  channelName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 2,
  },
  subscriberCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  subscribeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  description: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  relatedVideos: {
    padding: 16,
  },
  relatedTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
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
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
});