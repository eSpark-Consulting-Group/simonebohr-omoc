export const ALLOWED_IMG_TYPES = ['image/jpeg', 'image/jpg', 'image/tiff', 'image/png'];

export enum MAX_FILES_COUNTS {
  FIVE = 5,
  TEN = 10,
}

export const MULTER_ERROR: Record<string, string> = {
  LIMIT_PART_COUNT: 'Number of parts exceeds the specified limit.',
  LIMIT_FILE_SIZE: 'File exceeds the specified size limit.',
  LIMIT_FILE_COUNT: 'The number of files exceeds the specified limit',
  LIMIT_FIELD_KEY: 'Field key or name does not meet certain criteria or exceeds a specified limit',
  LIMIT_UNEXPECTED_FILE: 'Unexpected file is encountered, Check files length or field Name',
};

export enum FILE_FIELDS {
  FILE = 'file',
  PRODUCTS = 'product',
  OMOC = 'omoc',
  PROFILE = 'profile',
  VIDEOS = 'videos',
}

export enum CLOUD_FOLDERS {
  PRODUCTS = 'Products',
  PROFILES = 'Profiles',
  CATEGORIES = 'Categories',
  THUMBNAILS = 'Thumbnails',
  STORIES = 'Stories',
  FILES = 'Files',
}

export const audioExtensions = ['.mp3', '.wav', '.aac', '.ogg', '.wma', '.flac', '.m4a', '.aiff'];

export const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm', '.m4v'];

export const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tif', '.tiff', '.webp'];
