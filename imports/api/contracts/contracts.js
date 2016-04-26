Contracts = {
    getContracts: function () {    //TODO
    },

    compile: function (soliditySrc) {
        //remove linebreaks
        var srcString = soliditySrc.replace(/(\r\n|\n|\r)/gm," ");
        console.log(srcString);

        //compile contract
        return web3.eth.compile.solidity(srcString);
    },
    deploy: function (abi, code, callback) {
        //remove linebreaks
        var srcString = soliditySrc.replace(/(\r\n|\n|\r)/gm," ");
        console.log(srcString);

        //compile contract
        console.log(web3.eth.compile.solidity(srcString))
        return web3.eth.compile.solidity(srcString);
        callback();
    }

}