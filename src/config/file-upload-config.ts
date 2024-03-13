export class FileUploadConfig {
  public static maxFileSizeInMb(): number {
    const propertyPath = 'FILE_UPLOAD_MAX_SIZE_IN_MB';

    const propertyValue = process.env[propertyPath] || undefined;

    if (propertyValue) {
      return Number(propertyValue) * 1024 * 1024;
    }

    throw new Error(`${propertyPath} is not a valid environment variable.`);
  }

  public static generateAllowedFileTypesRegexPattern(): RegExp {
    const propertyPath = 'FILE_UPLOAD_ALLOWED_MIME_TYPES';

    const propertyValue = process.env[propertyPath] || undefined;

    if (propertyValue) {
      const fileTypes = propertyValue.split(',');

      const escapedTerms = fileTypes.map((fileType) =>
        fileType.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      );

      const combinedPattern = `(${escapedTerms.join('|')})`;

      return new RegExp(combinedPattern);
    }

    throw new Error(`${propertyPath} is not a valid environment variable.`);
  }
}
