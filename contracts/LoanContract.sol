// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanContract {
    struct Loan {
        string name;
        uint256 amount;
        uint256 date;
    }

    Loan[] public loans;

    function createLoan(string memory _name, uint256 _amount) public {
        loans.push(Loan(_name, _amount, block.timestamp));
    }

    function getLoansCount() public view returns (uint256) {
        return loans.length;
    }

    function getLoan(uint256 _index) public view returns (string memory, uint256, uint256) {
        require(_index < loans.length, "Invalid index");
        return (loans[_index].name, loans[_index].amount, loans[_index].date);
    }
}
