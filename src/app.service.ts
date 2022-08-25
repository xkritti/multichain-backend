import { Injectable } from '@nestjs/common';
import { ethers, utils } from 'ethers';
import { HDNode } from 'ethers/lib/utils';
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
    return { status:true,data: { email: req.email, password: req.password } };
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

  async getRpc() {
    let privateKey = '';
    const bsc_jsonRPC_testnet = 'https://rpc-testnet.bitkubchain.io'; // json RPC url
    const provider = new ethers.providers.JsonRpcProvider(bsc_jsonRPC_testnet); // provider for signing transaction
    let wallet = new ethers.Wallet(privateKey, provider);
    let address = await wallet.getAddress();
    let chainid = await wallet.getChainId();
    return { chainid, address };
  }
}
