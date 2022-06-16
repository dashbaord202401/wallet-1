// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;
contract Wallet {
    
    address owner;
    mapping(address=> uint256)balance;
    event Deposit(address indexed Account, uint balance);
    event withdraw(address indexed Account, uint amount);
    event Transfer(address indexed Account, uint amount);

    constructor() {
        owner = msg.sender;
    }
    
        receive() external payable {
        require(msg.value>0 , "Value Can't be Zero");
        balance[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function my_balance() public view returns(uint) {
        uint bal = balance[msg.sender];
        return bal;
    }
    function total_balance() public view returns(uint) {
        require(owner==msg.sender , "Only Owner Can Check Total Balance");
        uint bal = address(this).balance;
        return bal;
    }
    function withdraw_balance (uint256 amount) public returns (uint) {
        require(amount >0, "Can't be zero");
        require(amount <= balance[msg.sender], "Insuffecient Fund");
        uint bal = balance[msg.sender] -=amount;
        payable(msg.sender).transfer(amount);
        emit withdraw(msg.sender, amount);
        return bal;
    }
    function transfer_balance (address payable _to, uint256 amount) public returns (uint) {
        require(amount <= balance[msg.sender], "Insuffecient Fund");
        uint bal = balance[msg.sender] -=amount;
        _to.transfer(amount);
        emit Transfer(_to,amount);
        return bal;
    }


}