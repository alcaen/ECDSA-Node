const { keccak256 } = require('ethereum-cryptography/keccak');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');
const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');

async function recoverKey(message, signature, recoveryBit) {
  // get the hash
  const hash = hashMessage(message);
  // https://github.com/paulmillr/noble-secp256k1/tree/1.7.1#recoverpublickeyhash-signature-recovery
  const publicKey = secp.recoverPublicKey(hash, signature, recoveryBit);
  return publicKey;
}

function getAddress(publicKey) {
  // First byte is format of the key slice it
  const slicedPublicKey = publicKey.slice(1);
  // Get the hash
  const hash = keccak256(slicedPublicKey);
  // Last 20 bytes are the address so slice it again
  const address = hash.slice(-20);
  return address;
}

function hashMessage(message) {
  // to bytes
  const bytes = utf8ToBytes(message);
  // hash the bytes
  return toHex(keccak256(bytes));
}

module.exports = { recoverKey, getAddress, hashMessage };
