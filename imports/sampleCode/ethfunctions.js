/**
 * Created by jacobeberhardt on 22/04/16.
 */

function checkAllBalances() {
    var i =0;
    web3.eth.accounts.forEach( function(e){
        console.log("  eth.accounts["+i+"]: " +  e + " \tbalance: " + web3.fromWei(eth.getBalance(e), "ether") + " ether");
        i++;
    })
};


function printTransaction(txHash) {
    var tx = web3.eth.getTransaction(txHash);
    if (tx != null) {
        console.log("  tx hash          : " + tx.hash + "\n"
            + "   nonce           : " + tx.nonce + "\n"
            + "   blockHash       : " + tx.blockHash + "\n"
            + "   blockNumber     : " + tx.blockNumber + "\n"
            + "   transactionIndex: " + tx.transactionIndex + "\n"
            + "   from            : " + tx.from + "\n"
            + "   to              : " + tx.to + "\n"
            + "   value           : " + tx.value + "\n"
            + "   gasPrice        : " + tx.gasPrice + "\n"
            + "   gas             : " + tx.gas + "\n"
            + "   input           : " + tx.input);
    }
}

function printBlock(block) {
    console.log("Block number     : " + block.number + "\n"
        + " hash            : " + block.hash + "\n"
        + " parentHash      : " + block.parentHash + "\n"
        + " nonce           : " + block.nonce + "\n"
        + " sha3Uncles      : " + block.sha3Uncles + "\n"
        + " logsBloom       : " + block.logsBloom + "\n"
        + " transactionsRoot: " + block.transactionsRoot + "\n"
        + " stateRoot       : " + block.stateRoot + "\n"
        + " miner           : " + block.miner + "\n"
        + " difficulty      : " + block.difficulty + "\n"
        + " totalDifficulty : " + block.totalDifficulty + "\n"
        + " extraData       : " + block.extraData + "\n"
        + " size            : " + block.size + "\n"
        + " gasLimit        : " + block.gasLimit + "\n"
        + " gasUsed         : " + block.gasUsed + "\n"
        + " timestamp       : " + block.timestamp + "\n"
        + " transactions    : " + block.transactions + "\n"
        + " uncles          : " + block.uncles);
    if (block.transactions != null) {
        console.log("--- transactions ---");
        block.transactions.forEach( function(e) {
            printTransaction(e);
        })
    }
}

function printUncle(block, uncleNumber, uncle) {
    console.log("Block number     : " + block.number + " , uncle position: " + uncleNumber + "\n"
        + " Uncle number    : " + uncle.number + "\n"
        + " hash            : " + uncle.hash + "\n"
        + " parentHash      : " + uncle.parentHash + "\n"
        + " nonce           : " + uncle.nonce + "\n"
        + " sha3Uncles      : " + uncle.sha3Uncles + "\n"
        + " logsBloom       : " + uncle.logsBloom + "\n"
        + " transactionsRoot: " + uncle.transactionsRoot + "\n"
        + " stateRoot       : " + uncle.stateRoot + "\n"
        + " miner           : " + uncle.miner + "\n"
        + " difficulty      : " + uncle.difficulty + "\n"
        + " totalDifficulty : " + uncle.totalDifficulty + "\n"
        + " extraData       : " + uncle.extraData + "\n"
        + " size            : " + uncle.size + "\n"
        + " gasLimit        : " + uncle.gasLimit + "\n"
        + " gasUsed         : " + uncle.gasUsed + "\n"
        + " timestamp       : " + uncle.timestamp + "\n"
        + " transactions    : " + uncle.transactions + "\n");
}

function getMinedBlocks(miner, startBlockNumber, endBlockNumber) {
    if (endBlockNumber == null) {
        endBlockNumber = web3.eth.blockNumber;
        console.log("Using endBlockNumber: " + endBlockNumber);
    }
    if (startBlockNumber == null) {
        startBlockNumber = endBlockNumber - 10000;
        console.log("Using startBlockNumber: " + startBlockNumber);
    }
    console.log("Searching for miner \"" + miner + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber + "\"");

    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
        if (i % 1000 == 0) {
            console.log("Searching block " + i);
        }
        var block = web3.eth.getBlock(i);
        if (block != null) {
            if (block.miner == miner || miner == "*") {
                console.log("Found block " + block.number);
                printBlock(block);
            }
            if (block.uncles != null) {
                for (var j = 0; j < 2; j++) {
                    var uncle = web3.eth.getUncle(i, j);
                    if (uncle != null) {
                        if (uncle.miner == miner || miner == "*") {
                            console.log("Found uncle " + block.number + " uncle " + j);
                            printUncle(block, j, uncle);
                        }
                    }
                }
            }
        }
    }
}