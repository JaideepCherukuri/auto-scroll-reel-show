
export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  label?: 'Top Choice' | 'New' | 'Mixed' | 'Collection';
  background: string;
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16';
}

export const videos: Video[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    title: 'Mountain Wildlife',
    description: 'Majestic deer wandering through mountain landscapes',
    label: 'Top Choice',
    background: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    aspectRatio: '16:9',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    title: 'Waterfall Bridge',
    description: 'Serene waterfall cascading under a stone bridge',
    label: 'New',
    background: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    aspectRatio: '9:16',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    title: 'Mountain River Valley',
    description: 'Crystal clear river winding through majestic mountains',
    label: 'Mixed',
    background: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    aspectRatio: '1:1',
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    title: 'Pine Forest Vista',
    description: 'Ancient pine trees reaching towards the sky',
    label: 'Collection',
    background: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    aspectRatio: '16:9',
  },
  {
    id: '5',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    title: 'Forest Canopy',
    description: 'Sunlight filtering through dense forest canopy',
    label: 'Top Choice',
    background: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    aspectRatio: '4:5',
  },
  {
    id: '6',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    title: 'Golden Sunlight',
    description: 'Warm sunbeams piercing through forest leaves',
    label: 'New',
    background: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    aspectRatio: '1:1',
  },
  {
    id: '7',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    title: 'Mountain Majesty',
    description: 'Sunrays illuminating mountain peaks at dawn',
    label: 'Mixed',
    background: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    aspectRatio: '9:16',
  },
  {
    id: '8',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    title: 'Foggy Summit',
    description: 'Mystical fog rolling over mountain peaks',
    label: 'Collection',
    background: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    aspectRatio: '16:9',
  },
  {
    id: '9',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    title: 'Ocean Waves',
    description: 'Powerful waves crashing on a pristine beach',
    label: 'New',
    background: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    aspectRatio: '4:5',
  },
  {
    id: '10',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed',
    title: 'Alpine Peaks',
    description: 'Majestic mountain alps touching the clouds',
    label: 'Top Choice',
    background: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed',
    aspectRatio: '16:9',
  }
];
