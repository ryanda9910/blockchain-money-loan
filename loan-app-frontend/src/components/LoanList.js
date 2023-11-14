import React from 'react';

const LoanList = ({ loans, onLoanUpdate, onLoanDelete }) => {
  return (
    <ul>
      {loans.map((loan) => (
        <li key={loan._id}>
          <span>{loan.name}</span>
          <span>{loan.amount}</span>
          <button onClick={() => onLoanUpdate(loan)}>Update</button>
          <button onClick={() => onLoanDelete(loan._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default LoanList;
