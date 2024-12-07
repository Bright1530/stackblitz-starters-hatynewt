import AWS from 'aws-sdk';
import { MongoClient } from 'mongodb';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import schedule from 'node-schedule';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'backup-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'backup.log' })
  ]
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function createBackup() {
  const date = new Date().toISOString().split('T')[0];
  const filename = `backup-${date}.gz`;
  const writeStream = createWriteStream(filename);
  const gzip = createGzip();

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const dump = await db.collection('users').find().toArray();

    await pipeline(
      JSON.stringify(dump),
      gzip,
      writeStream
    );

    const fileStream = createReadStream(filename);
    
    await s3.upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `backups/${filename}`,
      Body: fileStream
    }).promise();

    logger.info(`Backup ${filename} created and uploaded successfully`);
    
    await client.close();
  } catch (error) {
    logger.error('Backup failed:', error);
    throw error;
  }
}

// Schedule daily backup at 2 AM
schedule.scheduleJob('0 2 * * *', createBackup);