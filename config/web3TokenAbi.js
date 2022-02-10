const { exec } = require('child_process');

exec(
  `abi-types-generator './src/abis/AddressPrivileges.json' --output='./src/contracts' --name=AddressPrivileges --provider=web3`,
);
exec(
  `abi-types-generator './src/abis/BscPledgeOracle.json' --output='./src/contracts' --name=BscPledgeOracle --provider=web3`,
);
exec(
  `abi-types-generator './src/abis/DebtToken.json' --output='./src/contracts' --name=DebtToken --provider=web3`,
);
exec(
  `abi-types-generator './src/abis/PledgePool.json' --output='./src/contracts' --name=PledgePool --provider=web3`,
);

// exec(
//   `abi-types-generator './src/abis/multiSignature.json' --output='./src/contracts' --name=multiSignature --provider=web3`,
// );

// exec(
//   `abi-types-generator './src/abis/multiSignatureClient.json' --output='./src/contracts' --name=multiSignatureClient --provider=web3`,
// );
