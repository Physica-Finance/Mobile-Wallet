import matrixSdk from 'matrix-js-sdk';
const homeserverUrl = 'https://matrix.org'; 
const accessToken = '1265657653164562514'; 
const userId = 'alfset';

const matrixClient = matrixSdk.createClient({
  baseUrl: homeserverUrl,
  accessToken,
  userId
});

export default matrixClient;
