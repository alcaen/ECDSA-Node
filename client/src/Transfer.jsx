import { useState } from 'react';
import { signMessage } from './lib/utils';
import server from './server';

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    // message to send
    const message = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    };
    // signed message
    const signed = signMessage(JSON.stringify(message), privateKey);
    // get the signature properties
    const signature = JSON.stringify({
      ...signed,
      r: signed.r.toString(),
      s: signed.s.toString(),
    });
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature,
        message,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form
      className='container transfer'
      onSubmit={transfer}
    >
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder='1, 2, 3...'
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder='Type an address, for example: 0x2'
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input
        type='submit'
        className='button'
        value='Transfer'
        disabled={!address || !sendAmount || !privateKey || !recipient}
      />
    </form>
  );
}

export default Transfer;
