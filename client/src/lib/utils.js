import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils';
import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1';

export function hashMessage(message) {
  // to bytes
  const bytes = utf8ToBytes(message);
  // hash the bytes
  return toHex(keccak256(bytes));
}

export function signMessage(msg, privateKey) {
  const messageHash = hashMessage(msg);
  // recovered:true => return the recovered bit so that the public key can be recovered from this signature.
  const signed = secp.sign(messageHash, privateKey);

  return signed;
}

export function getAddress(publicKey) {
  // First byte is format of the key slice it
  const slicedPublicKey = publicKey.slice(1);
  // Get the hash
  const hash = keccak256(slicedPublicKey);
  // Last 20 bytes are the address so slice it again
  const address = hash.slice(-20);
  return toHex(address);
}

export function getPublicKey(privateKey) {
  return secp.getPublicKey(privateKey);
}
