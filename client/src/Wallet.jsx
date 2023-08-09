import server from './server';
import { useState } from 'react';
import { getAddress, getPublicKey } from './lib/utils';

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  const [hidden, setHidden] = useState(true);

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = getPublicKey(privateKey);
    const address = getAddress(publicKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className='container wallet'>
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder='Type an address, for example: 0x1'
          disabled
          value={address}
        ></input>
      </label>

      <label>Private Key</label>
      <div className='flexc'>
        <input
          className='key'
          type={hidden ? 'password' : 'text'}
          placeholder='Type your private key to sign the transaction'
          value={privateKey}
          onChange={onChange}
        ></input>
        <button onClick={() => setHidden(!hidden)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-eye'
            viewBox='0 0 16 16'
          >
            <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z' />{' '}
            <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z' />{' '}
          </svg>
        </button>
      </div>

      <div className='balance'>Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
