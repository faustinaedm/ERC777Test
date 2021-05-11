
/*const path = require('path');
var Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".env").toString().trim();
require('dotenv').config();*/
module.exports = {
  networks: {

    /* ganache: {
       host: "127.0.0.1",     // 
       port: 8545,            // 
       network_id: "5777",       // Any 
     },*/
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },

 coverage: {
        gas: 0x1fffffffffffff,
        host: '127.0.0.1',
        port: 8555,
        network_id: "*",
      }
    /*kovan: {
      provider: () => new HDWalletProvider(process.env.mnemonic, 'https://kovan.infura.io/v3/256a6d530a254d2c991666cab6fc9722', '0xd48c3F1FD8382DcaF0b650d050349698283cF698'),
      network_id: 42, // eslint-disable-line camelcase
      gas: 5500000, // Ropsten has a lower block limit than mainnet

    },*/

    // provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/256a6d530a254d2c991666cab6fc9722`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },
  plugins: ["solidity-coverage"],
  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false
  }
};
