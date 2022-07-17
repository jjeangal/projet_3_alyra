// addresse deployed to: 0x9C25D822fbd8CaAB0EF19bD643200Da13aE98cc1

const HDWalletProvider = require('@truffle/hdwallet-provider'); 
require('dotenv').config();

const ROPSTEN_URL = process.env.INFURA_ID;
const PRIVATE_KEY = process.env.MNEMONIC;

module.exports = {

  contracts_build_directory: "../client/src/contracts",
  networks: {

    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

    ropsten: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, ROPSTEN_URL),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      //confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      //skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },

  plugins: ['solidity-coverage'],

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
    reporter: 'eth-gas-reporter',
    reporterOptions : {
     gasPrice: 1,
     token: 'ETH',
     showTimeSpent: true, 
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.14",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
