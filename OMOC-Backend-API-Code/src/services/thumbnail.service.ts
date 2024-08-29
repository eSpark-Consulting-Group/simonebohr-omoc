import sharp from 'sharp';
class ThumbnailService {
  createThumbnail(inputBuffer: Buffer, fileName: string) {
    return sharp(inputBuffer)
      .jpeg({ quality: 100 })
      .resize(300, 300, {
        fit: 'contain',
        withoutEnlargement: true,
      })
      .toBuffer();
  }
}

export const thumbnailService = new ThumbnailService();
