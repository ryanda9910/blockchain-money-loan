import React, { useState, useEffect } from "react";
import LoanContract from "./contracts/LoanContract.sol";
import LoanForm from "./components/LoanForm";
import LoanList from "./components/LoanList";
function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const w3 = new web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(w3);

          const networkId = await w3.eth.net.getId();
          const deployedNetwork = LoanContract.networks[networkId];
          const instance = new w3.eth.Contract(
            LoanContract.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(instance);
        }
      } catch (error) {
        console.error("Error initializing web3:", error);
      }
    };

    initWeb3();
  }, []);

  const fetchLoans = async () => {
    try {
      const loansCount = await contract.methods.getLoansCount().call();
      const fetchedLoans = await Promise.all(
        Array.from({ length: loansCount }, (_, index) =>
          contract.methods.getLoan(index).call()
        )
      );

      setLoans(
        fetchedLoans.map((loan) => ({
          name: loan[0],
          amount: loan[1],
          date: loan[2],
        }))
      );
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };
  const handleLoanSubmit = async (loan) => {};
  const handleLoanUpdate = async (loan) => {};
  const handleLoanDelete = async (loanId) => {};
  return (
    <div>
      {web3 && contract && (
        <LoanForm
          onLoanSubmit={handleLoanSubmit}
          web3={web3}
          contract={contract}
        />
      )}
      <LoanList
        loans={loans}
        onLoanUpdate={handleLoanUpdate}
        onLoanDelete={handleLoanDelete}
      />
    </div>
  );
}

export default App;
