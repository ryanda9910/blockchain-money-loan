import React, { useState } from 'react';
import axios from 'axios';

const LoanForm = ({ onLoanSubmit,web3,contract }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.createLoan(name, amount).send({ from: accounts[0] });

      const loansCount = await contract.methods.getLoansCount().call();
      const newLoan = await contract.methods.getLoan(loansCount - 1).call();
      
      onLoanSubmit({
        name: newLoan[0],
        amount: newLoan[1],
        date: newLoan[2]
      });

      setName('');
      setAmount('');
    } catch (error) {
      console.error('Error submitting loan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanForm;
