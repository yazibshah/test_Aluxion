require("@nomicfoundation/hardhat-toolbox");


// const INFURA_API_KEY = "1c2959aaaaea48b29dcbd39b41844ef0";

const GOERLI_PRIVATE_KEY = "08253c7aa3c92649df44a67b98ae682e9ac642b270ca0347d45a1d827a32e94b";


module.exports = {
  solidity: "0.8.23",
  networks: {
     goerli: {
      url: `https://goerli.infura.io/v3/5e353b0ef7194418a7ab3ba91f8a9c90`,
      accounts: [GOERLI_PRIVATE_KEY]
    }  
  }
};

/* module.exports = {
  solidity: "0.8.23",
  networks: {
    hardhat: {
      // Hardhat network configuration
      // No need to specify a URL, as it's provided by Hardhat
    }
  },
  // Optional Hardhat network settings
  // You can specify a custom JSON-RPC server configuration if needed
  http: {
    // Port on which the JSON-RPC server will listen
    port: 8545, // You can choose any available port
    // Other optional settings
    host: "127.0.0.1", // Defaults to "localhost"
    allowUnlimitedContractSize: true, // Enable if you need to deploy large contracts
  },
};
 */