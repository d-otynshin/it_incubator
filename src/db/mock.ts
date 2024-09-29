import { VideoDBType } from './video-db-type';
import { Resolutions } from '../input-output-types/video-types';

export const mockVideos: VideoDBType[] = [
  {
    id: 1,
    title: "Exploring the Universe",
    author: "John Doe",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2024-09-25T10:00:00Z",
    publicationDate: "2024-09-26T10:00:00Z",
    availableResolutions: [Resolutions.P144, Resolutions.P360, Resolutions.P720, Resolutions.P1080],
  },
  {
    id: 2,
    title: "JavaScript Tutorial for Beginners",
    author: "Jane Smith",
    canBeDownloaded: false,
    minAgeRestriction: 12,
    createdAt: "2024-08-20T08:00:00Z",
    publicationDate: "2024-08-21T09:00:00Z",
    availableResolutions: [Resolutions.P240, Resolutions.P360, Resolutions.P720],
  },
  {
    id: 3,
    title: "Nature Documentary: Wild Africa",
    author: "David Attenborough",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2024-07-15T12:00:00Z",
    publicationDate: "2024-07-16T12:30:00Z",
    availableResolutions: [Resolutions.P480, Resolutions.P720, Resolutions.P1080, Resolutions.P2160],
  },
  {
    id: 4,
    title: "Understanding Quantum Physics",
    author: "Albert Einstein",
    canBeDownloaded: false,
    minAgeRestriction: 16,
    createdAt: "2024-01-10T14:30:00Z",
    publicationDate: "2024-01-12T15:00:00Z",
    availableResolutions: [Resolutions.P144, Resolutions.P240, Resolutions.P360],
  },
  {
    id: 5,
    title: "Cooking 101: Beginner Recipes",
    author: "Gordon Ramsay",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2024-03-05T09:45:00Z",
    publicationDate: "2024-03-06T10:00:00Z",
    availableResolutions: [Resolutions.P360, Resolutions.P720, Resolutions.P1080],
  }
];
