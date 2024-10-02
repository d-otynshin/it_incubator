import { Resolutions } from '../input-output-types/video-types';
import { VideoDBType } from '../db/video-db-type';

const isValidISODate = (dateStr?: string): boolean => {
  if (!dateStr) return false;

  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && dateStr === date.toISOString();
};

type ValidationError = { message: string, field: string }

// Validation function for VideoType with error objects
export const validateVideo = (video?: VideoDBType): { errorsMessages: ValidationError[] } => {
  const errors: { message: string, field: string }[] = [];

  // Validate title (required and non-empty)
  if (typeof video?.title !== 'string' || video?.title.trim().length === 0) {
    errors.push({ message: "must be a non-empty string", field: "title" });
  }

  if (video?.title) {
    const validTitlePattern = /^[^-_]+$/;

    if (!validTitlePattern.test(video?.title)) {
      errors.push({ message: "invalid title", field: "title" });
    }
  }

  // Validate author (required and non-empty)
  if (typeof video?.author !== 'string' || video?.author.trim().length === 0) {
    errors.push({ message: "must be a non-empty string", field: "author" });
  }

  if (video?.author) {
    const validTitlePattern = /^[^-_]+$/;

    if (!validTitlePattern.test(video?.author)) {
      errors.push({ message: "invalid author", field: "author" });
    }
  }

  // Validate canBeDownloaded
  if (video?.canBeDownloaded && typeof video?.canBeDownloaded !== 'boolean') {
    errors.push({ message: "must be a boolean", field: "canBeDownloaded" });
  }

  // Validate minAgeRestriction
  if (video?.minAgeRestriction &&
    (typeof video?.minAgeRestriction !== 'number' ||
      video?.minAgeRestriction < 1 ||
      video?.minAgeRestriction > 18)) {
    errors.push({ message: "must be null or an integer between 1 and 18", field: "minAgeRestriction" });
  }

  // Validate publicationDate
  if (video?.publicationDate && !isValidISODate(video?.publicationDate)) {
    errors.push({ message: "must be a valid ISO 8601 date string", field: "publicationDate" });
  }

  // Validate availableResolutions
  if (video?.availableResolutions !== null) {
    const validResolutions = Object.values(Resolutions); // Get the enum values
    // @ts-ignore
    for (const res of video?.availableResolutions) {
      if (!validResolutions.includes(res)) {
        errors.push({ message: `${res} is not a valid resolution`, field: "availableResolutions" });
      }
    }
  }

  return { errorsMessages: errors };
};
