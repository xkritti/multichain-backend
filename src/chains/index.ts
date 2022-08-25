export const bscTestnet: any = {
  id:97,
  name: 'BSC Testnet',
  nativeCurrency: { name: 'Binance Coin', symbol: 'BNB', decimals: 18 },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  blockExplorers: {
    etherscan: {
      name: 'testnet.bscscan',
      url: 'https://testnet.bscscan.com',
    },
    default: {
      name: 'testnet.bscscan',
      url: 'https://testnet.bscscan.com',
    },
  },
  testnet: true,
};

export const fcTestnet: any = {
  id: 29,
  name: 'Fin Chain Testnet',
  nativeCurrency: { name: 'Fin Coin', symbol: 'Fin Chain Testnet', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc-test.finstable.space',
  },
  blockExplorers: {
    etherscan: {
      name: 'testnet.finscan',
      url: 'https://scan.finstable.space',
    },
    default: {
      name: 'testnet.finscan',
      url: 'https://scan.finstable.space',
    },
  },
  testnet: true,
};

export const bkcTestnet: any = {
  id: 25925,
  name: 'BKC Testnet',
  nativeCurrency: { name: 'Bitkub Coin', symbol: 'KUB', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc-testnet.bitkubchain.io',
  },
  blockExplorers: {
    etherscan: {
      name: 'testnet.bkcscan',
      url: 'https://testnet.bkcscan.com',
    },
    default: {
      name: 'testnet.bkcscan',
      url: 'https://testnet.bkcscan.com',
    },
  },
  testnet: true,
};

export const rinkeby: any = {
  id: 4,
  name: "Rinkeby",
  nativeCurrency: { name: "Rinkeby Ether", symbol: "rETH", decimals: 18 },
  rpcUrls: {
    default: "https://mainnet.infura.io/v3/UuZaRWkN8i9K1_RvrtssdRaRn6MTZ49_",
  },
  blockExplorers: {
    etherscan: { name: "Etherscan", url: "https://rinkeby.etherscan.io" },
    default: { name: "Etherscan", url: "https://rinkeby.etherscan.io" },
  },

};
