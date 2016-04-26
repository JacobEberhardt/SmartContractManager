/**
 * Created by jacobeberhardt on 22/04/16.
 */

var greeterSource = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) suicide(owner); } } contract greeter is mortal { string greeting; function greeter(string _greeting) public { greeting = _greeting; } function greet() constant returns (string) { return greeting; } }'
var greeterCompiled = web3.eth.compile.solidity(greeterSource);

var _greeting = "Hello Joe!"
var greeterContract = web3.eth.contract(greeterCompiled.greeter.info.abiDefinition);

var greeter = greeterContract.new(_greeting,{from:web3.eth.accounts[0], data: greeterCompiled.greeter.code, gas: 300000}, function(e, contract){
    if(!e) {

        if(!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

        } else {
            console.log("Contract mined! Address: " + contract.address);
            console.log(contract);
        }

    }
})

greeterCompiled.

greeter.greet();

/*

 To send money to the contract use:

 web3.eth.sendTransaction({from: web3.eth.accounts[0], to: '0x.......' ,value: 123000000000})

 */