import { Injectable } from '@nestjs/common';
import { ethers, utils } from 'ethers';
import { HDNode } from 'ethers/lib/utils';
import { bkcTestnet, bscTestnet, fcTestnet, rinkeby } from './chains';
import { singInDto } from './dto/singin';
import { singUpDto } from './dto/singup';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getSigner() {
    let provider = ethers.getDefaultProvider();
    return provider;
  }

  createWallet() {
    const wallet = ethers.Wallet.createRandom();
    return {
      data: {
        address: wallet.address,
        mnemonicPhrase: wallet.mnemonic.phrase,
        privateKey: wallet.privateKey,
      },
    };
  }

  singup(req: singUpDto) {
    let walletdata = this.createWallet();
    return {
      data: {
        email: req.email,
        password: req.password,
        walletdata: walletdata,
      },
    };
  }

  singin(req: singInDto) {
    let walletdata = {
      data: {
        address: '0x3AA80c96CbB6837626DA8d56263df087ad954c13',
        mnemonicPhrase:
          'peasant debris travel monkey amazing close dinner grit elevator fiber thank coral',
        privateKey:
          '0x9b1bf03dd7af46a81b776cc39a605adf46234d9a299ead5fc6fd4688c3b3dc63',
      },
    };
    return {
      status: true,
      data: {
        email: req.email,
        password: req.password,
        walletdata: walletdata,
      },
    };
  }

  async getWalletInfo(privateKey: string) {
    let provider = ethers.getDefaultProvider();
    let wallet = new ethers.Wallet(privateKey['privateKey'], provider);
    let balance = await wallet.getBalance();
    console.log('balance', balance);
    return { data: { privateKey: privateKey } };
  }

  async getWalletByMnemonic(phrase: string) {
    let provider = await this.getSigner();
    let path = ethers.utils.defaultPath;
    let wallet = ethers.Wallet.fromMnemonic(phrase['phrase'], path);
    let singer = wallet.connect(provider);
    let address = await singer.getAddress();
    let chainid = await singer.getChainId();
    // let balance = await wallet.getBalance()
    // let fee = await wallet.getFeeData()
    // let gas = await wallet.getGasPrice()
    return { data: { privateKey: wallet.privateKey, address, chainid } };
  }

  async getChainByRpc(req: any) {
    let privateKey = req.privatekey;
    let jsonRPC: any;
    if (req.chainid == 29) {
      jsonRPC = fcTestnet;
    } else if (req.chainid == 97) {
      jsonRPC = bkcTestnet;
    } else if (req.chainid == 25925) {
      jsonRPC = bscTestnet;
    } else {
      jsonRPC = rinkeby;
    }
    console.log(jsonRPC.rpcUrls.default);
    const provider = new ethers.providers.JsonRpcProvider(
      jsonRPC.rpcUrls.default,
    ); // provider for signing transaction
    let wallet = new ethers.Wallet(privateKey, provider);
    let address = await wallet.getAddress();
    let chainid = await wallet.getChainId();
    let balance = ethers.utils.formatEther(await wallet.getBalance());
    return { address, balance, jsonRPC };
  }

  async getTokenInfo(req: any) {
    let privateKey = req.privatekey;
    let jsonRPC: any;
    if (req.chainid == 29) {
      jsonRPC = fcTestnet;
    } else if (req.chainid == 97) {
      jsonRPC = bkcTestnet;
    } else if (req.chainid == 25925) {
      jsonRPC = bscTestnet;
    } else {
      jsonRPC = rinkeby;
    }
    console.log(jsonRPC.rpcUrls.default);
    const provider = new ethers.providers.JsonRpcProvider(
      jsonRPC.rpcUrls.default,
    ); // provider for signing transaction
    let wallet = new ethers.Wallet(privateKey, provider);

    const abi = [
      // Read-Only Functions
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)',
      'function symbol() view returns (string)',

      // Authenticated Functions
      'function transfer(address to, uint amount) returns (bool)',

      // Events
      'event Transfer(address indexed from, address indexed to, uint amount)',
    ];

    // This can be an address or an ENS name
    const address = req.token_address;

    // Read-Only; By connecting to a Provider, allows:
    // - Any constant function
    // - Querying Filters
    // - Populating Unsigned Transactions for non-constant methods
    // - Estimating Gas for non-constant (as an anonymous sender)
    // - Static Calling non-constant methods (as anonymous sender)
    const erc20 = new ethers.Contract(address, abi, provider);
    let balance = await erc20.balanceOf(address);

    // Read-Write; By connecting to a Signer, allows:
    // - Everything from Read-Only (except as Signer, not anonymous)
    // - Sending transactions for non-constant functions
    const erc20_rw = new ethers.Contract(address, abi, wallet);

    return { address, balance, jsonRPC };
  }
}
