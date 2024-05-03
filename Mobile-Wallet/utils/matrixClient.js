import matrixSdk from 'matrix-js-sdk';
const homeserverUrl = 'https://matrix.org'; 
const accessToken = 'YOUR_ACCESS_TOKEN'; 
const userId = '@youraddress:matrix.org';

const matrixClient = matrixSdk.createClient({
  baseUrl: homeserverUrl,
  accessToken,
  userId
});

export default matrixClient;
