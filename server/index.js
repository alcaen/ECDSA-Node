const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');
const { getAddress, hashMessage } = require('./lib/utils');
const { toHex } = require('ethereum-cryptography/utils');

app.use(cors());
app.use(express.json());

const balances = {
  // from generate.js also see readme.md
  b6919f2d7c4a91cef858adc2f2b883f786b09f2f: 100,
  '046daa97895826f19e3a13b25fcd31912ddd47a1': 50,
  e81d8ba213a4c8452feda92f08ef8e1aa9fff0ba: 75,
};

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { signature, message } = req.body;
  // get the signature as RecoveredSignatureType
  const sig = JSON.parse(signature);
  const signed = new secp.Signature(
    BigInt(sig.r),
    BigInt(sig.s)
  ).addRecoveryBit(sig.recovery);
  // get the hashed message
  const hashedMessage = hashMessage(JSON.stringify(message));
  // get the public key
  const publicKey = signed.recoverPublicKey(hashedMessage).toRawBytes();
  // verify the public key
  const isValid = secp.verify(signed, hashedMessage, publicKey);
  // get the address with the puclic key
  const address = toHex(getAddress(publicKey));
  if (!isValid || address !== message.sender) {
    res.status(400).send({ message: 'Not a valid signature!' });
  }
  // now manage the previous logic
  const { sender, recipient, amount } = message;
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
