export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  duration: string;
  views: string;
  uploadDate: string;
  channel: string;
  subscribers: string;
  videoUrl?: string;
  youtubeId?: string;
  
  // For continue watching section
  progress?: number;
  remainingTime?: string;
  
  // For saved videos
  savedDate?: string;
}

export interface VideoCategory {
  id: string;
  name: string;
  videos: Video[];
}