//HD Wallet for keyless servers (infura)
const HDWalletProvider = require("truffle-hdwallet-provider");
const TestRPC = require("ganache-cli");

let provider

function getNmemonic() {
  try{
    return require('fs').readFileSync("./seed", "utf8").trim();
  } catch(err){
    return "";
  }
}

function getProvider(rpcUrl) {
  if (!provider) {
    provider = new HDWalletProvider(getNmemonic(), rpcUrl)
  }
  return provider
}

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            gas: 6000000,
            gasPrice: 4000000000,
            // from: "0x438cb5211D33684d2261877947E2E71913FB255E",
            network_id: "*" // Match any network id
        },
        coverage: {
            host: "127.0.0.1",
            network_id: "*",
            port: 8555,
            gas: 0xfffffffffff,
            gasPrice: 0x01
        },
        rinkeby: {
            provider: function () {
                return provider
            },
            network_id: 4,
            gas: 5800000,
            gasPrice: 4000000000,
        },
        ropsten: {
            provider: function () {
                return provider
            },
            network_id: 3,
            gas: 3800000,
            gasPrice: 4000000000,
        },

    },
    compilers: {
        solc: {
            version: "0.4.24", // ex:  "0.4.20". (Default: Truffle's installed solc)
        },
    }
};
