import * as crypto from 'node:crypto';

export class AppCrypto {
  private readonly algorithm =
    process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm';
  private readonly ivLength = 16;
  private readonly saltLength = 64;
  private readonly tagLength = 16;
  private readonly tagPosition: number;
  private readonly encryptedPosition: number;
  private readonly iv = Buffer.from(
    String(process.env.STATIC_IV_ENCRYPTION_KEY),
    'hex',
  );
  private readonly salt = Buffer.from(
    String(process.env.STATIC_SALT_ENCRYPTION_KEY),
    'hex',
  );
  private readonly nonce = Buffer.from(
    String(process.env.STATIC_NONCE_ENCRYPTION_KEY).padEnd(12),
    'utf-8',
  );

  constructor() {
    this.tagPosition = this.saltLength + this.ivLength;

    this.encryptedPosition = this.tagPosition + this.tagLength;
  }

  public encrypt(value: string, secretKey: string): string {
    if (!value) {
      throw new Error('value must not be null or undefined');
    }

    if (!secretKey) {
      throw new Error('secretKey must not be null or undefined.');
    }

    if (this.algorithm === 'aes-256-gcm') {
      return this.encryptAes256Gcm(value, secretKey);
    }

    if (this.algorithm === 'chacha20-poly1305') {
      return this.encryptChacha20Poly1305(value, secretKey);
    }

    throw new Error('An encryption algorithm was not provided.');
  }

  public decrypt(value: string, secretKey: string): string {
    if (!value) {
      throw new Error('value must not be null or undefined.');
    }

    if (!secretKey) {
      throw new Error('secretKey must not be null or undefined.');
    }

    if (this.algorithm === 'aes-256-gcm') {
      return this.decryptAes256Gcm(value, secretKey);
    }

    if (this.algorithm === 'chacha20-poly1305') {
      return this.decryptChacha20Poly1305(value, secretKey);
    }

    throw new Error('An encryption algorithm was not provided.');
  }

  public encryptData<T extends { [key: string]: any }>(
    data: T,
    encryptionKeys: { [key: string]: any },
  ): T {
    const parsedData: { [key: string]: any } = {};

    Object.entries(data).forEach(([key, value]) => {
      const secretKey = encryptionKeys[key];

      if (secretKey && value) {
        const encryptedString = this.encrypt(value, secretKey);

        parsedData[key] = encryptedString;

        if (value === encryptedString) {
          throw new Error('Data encryption failed.');
        }
      } else {
        parsedData[key] = value;
      }
    });

    return parsedData as T;
  }

  public decryptData<T extends { [key: string]: any }>(
    data: T,
    encryptionKeys: { [key: string]: any },
  ): T {
    const parsedData: { [key: string]: any } = {};

    Object.entries(data).forEach(([key, value]) => {
      const secretKey = encryptionKeys[key];

      if (secretKey && value) {
        const decryptedString = this.decrypt(value, secretKey);

        parsedData[key] = decryptedString;

        if (value === decryptedString) {
          throw new Error('Data encryption failed.');
        }
      } else {
        parsedData[key] = value;
      }
    });

    return parsedData as T;
  }

  private encryptAes256Gcm(value: string, secretKey: string): string {
    const key = this.getKey(this.salt, secretKey);

    const cipher = crypto.createCipheriv('aes-256-gcm', key, this.iv);

    const encrypted = Buffer.concat([
      cipher.update(String(value), 'utf8'),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([tag, encrypted]).toString('hex');
  }

  private encryptChacha20Poly1305(value: string, secretKey: string): string {
    const cipher = crypto.createCipheriv(
      'chacha20-poly1305',
      secretKey,
      this.nonce,
      {
        authTagLength: this.tagLength,
      },
    );

    const valueBuffer = Buffer.from(value, 'utf8');

    const encryptedValue = Buffer.concat([
      cipher.update(valueBuffer),
      cipher.final(),
      cipher.getAuthTag(),
    ]);

    const encryptedValueString = encryptedValue.toString('hex');

    const nonceString = this.nonce.toString('hex');

    return `${encryptedValueString}.${nonceString}`;
  }

  private decryptAes256Gcm(value: string, secretKey: string): string {
    const encryptedString = Buffer.from(String(value), 'hex');

    const stringValue = Buffer.concat([this.salt, this.iv, encryptedString]);

    const tag = stringValue.subarray(this.tagPosition, this.encryptedPosition);

    const encrypted = stringValue.subarray(this.encryptedPosition);

    const key = this.getKey(this.salt, secretKey);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, this.iv);

    decipher.setAuthTag(tag);

    return decipher.update(encrypted) + decipher.final('utf8');
  }

  private decryptChacha20Poly1305(value: string, secretKey: string): string {
    const parts = value.split('.');

    if (parts.length !== 2) {
      throw new Error('Invalid encrypted value format');
    }

    const cipherBuffer = Buffer.from(parts[0], 'hex');
    const nonce = Buffer.from(parts[1], 'hex');

    const tag = cipherBuffer.subarray(-this.tagLength);

    const encrypted = cipherBuffer.subarray(0, -this.tagLength);

    const decipher = crypto.createDecipheriv(
      'chacha20-poly1305',
      secretKey,
      nonce,
      {
        authTagLength: this.tagLength,
      },
    );

    decipher.setAuthTag(tag);

    return decipher.update(encrypted).toString('utf8');
  }

  private getKey(salt: Buffer, secretKey: string): Buffer {
    return crypto.pbkdf2Sync(secretKey, salt, 100000, 32, 'sha512');
  }
}
