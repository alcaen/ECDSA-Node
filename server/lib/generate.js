const { keccak256 } = require('ethereum-cryptography/keccak');
const { toHex } = require('ethereum-cryptography/utils');
const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');
const { getAddress } = require('./utils');

const keys = [];
const numberOfKeys = 3;

for (let index = 0; index < numberOfKeys; index++) {
  const privateKey = secp.utils.randomPrivateKey();
  const publicKey = secp.getPublicKey(privateKey);
  const address = getAddress(publicKey);
  const hexPrivateKey = toHex(privateKey);
  const hexPublicKey = toHex(publicKey);
  const hexAddress = toHex(address);

  keys.push({ hexPrivateKey, hexPublicKey, hexAddress });
}

console.log(keys);
