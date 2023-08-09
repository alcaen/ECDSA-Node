## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

## Solution

Solution by: _Alcaen_ [GitHub](https://github.com/alcaen)

**Tips:**

- [x] Slice the public key to be like ETH ones.
- [x] Pass a signature instead of the private key for security purposes.
- [ ] Sign the signature offline.

### Addresses used

```js
// This array came from generate.js. This is the address that have been used.
const temp = [
  {
    hexPrivateKey:
      '89a1f417483703a57b6c1d75c3946f5e1a722bcbb76e98047e4b3e6a57734bb4',
    hexPublicKey:
      '02ee563c2fea234aea3b6ae53c353b0c3a11a8e1b1a1155d0c4840b83658a57003',
    hexAddress: 'b6919f2d7c4a91cef858adc2f2b883f786b09f2f',
  },
  {
    hexPrivateKey:
      '9b787fcb7ba97f49f03a7a1546e7b507cc6b876c867d8b95f5d698281f1beafc',
    hexPublicKey:
      '03b58734ace56fd3ff4d30a7d8e511d7883ef1a00c0c10f2d9250b9222261bb941',
    hexAddress: '046daa97895826f19e3a13b25fcd31912ddd47a1',
  },
  {
    hexPrivateKey:
      '707d6717726c43b6725487f6b9cf4985c2365a60e36c9c36844507dd30e4ccc2',
    hexPublicKey:
      '030fa0cbb2b46d7e9b19cfcdc9d4f73bdc55dc7f08e43763aa84d4cbfb5c7afcdd',
    hexAddress: 'e81d8ba213a4c8452feda92f08ef8e1aa9fff0ba',
  },
];
```
