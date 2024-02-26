// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Doblier {
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowance;
    uint public totalSupply = 100;
    string public name = "Yazib";
    string public symbol = "Yzb";
    uint public decimals = 18;
    uint public buyTax = 10;
    uint public sellTax = 10;
    address public owner;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function balanceOf(address _owner) public view returns(uint) {
        return balances[_owner];
    }

    function transfer(address to, uint value) public returns(bool) {
        require(balanceOf(msg.sender) >= value, 'balance too low');
        uint taxedValue = applyTax(value, false);
        uint taxAmount = value - taxedValue;
        balances[to] += taxedValue;
        balances[msg.sender] -= value;
        balances[owner] += taxAmount;
        emit Transfer(msg.sender, to, taxedValue);
        return true;
    }

    function transferFrom(address from, address to, uint value) public returns(bool) {
        require(balanceOf(from) >= value, 'balance too low');
        require(allowance[from][msg.sender] >= value, 'allowance too low');
        uint taxedValue = applyTax(value, false);
        uint taxAmount = value - taxedValue;
        balances[to] += taxedValue;
        balances[from] -= value;
        balances[owner] += taxAmount;
        emit Transfer(from, to, taxedValue);
        return true;   
    }

    function approve(address spender, uint value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;   
    }

    function applyTax(uint value, bool isBuying) internal view returns(uint) {
        uint taxRate = isBuying ? buyTax : sellTax;
        uint taxAmount = value * taxRate / 100;
        return value - taxAmount;
    }
}