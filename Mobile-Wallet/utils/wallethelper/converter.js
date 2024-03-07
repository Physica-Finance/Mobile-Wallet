const { bech32 } = require('bech32');

function convertToPlanqAddress(ethAddress) {
    const addressBuffer = Buffer.from(ethAddress.substring(2), 'hex');
    const planqAddress = bech32.encode('plq', bech32.toWords(addressBuffer));
    return planqAddress;
}

function convertToEthAddress(planqAddress) {
    const decodedData = bech32.decode(planqAddress);
    const hex = Buffer.from(bech32.fromWords(decodedData.words)).toString('hex');
    const ethAddress = '0x' + hex;
    return ethAddress;
}

module.exports = {
  convertToPlanqAddress,
  convertToEthAddress
};
