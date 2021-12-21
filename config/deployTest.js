import S3 from 'aws-s3';

const config = {
  bucketName: 'myBucket',
  dirName: 'photos' /* optional */,
  region: 'eu-west-1',
  accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE',
  secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
  s3Url: 'https://my-s3-url.com/' /* optional */,
};

const S3Client = new S3(config);
/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */

/* This is optional */
const newFileName = 'my-awesome-file';

S3Client.uploadFile(file, newFileName)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

/**
 * {
 *   Response: {
 *     bucket: "your-bucket-name",
 *     key: "photos/image.jpg",
 *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
 *   }
 * }
 */
