import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { singInDto } from './dto/singin';
import { singUpDto } from './dto/singup';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('gettokeninfo')
  getTokenInfo(@Body() req: any) {
    return this.appService.getTokenInfo(req)
  }

  @Post('singup')
  singUp(@Body() req: singUpDto) {
    return this.appService.singup(req);
  }

  @Post('singin')
  singIn(@Body() req: singInDto) {
    return this.appService.singin(req);
  }

  @Post('getwalletinfo')
  getWalletInfo(@Body() privateKey: string) {
    return this.appService.getWalletInfo(privateKey);
  }

  @Post('getwalletbymnemonic')
  getWalletByMnemonic(@Body() phrase: string) {
    return this.appService.getWalletByMnemonic(phrase);
  }

  @Post('multichain')
  getChainByRpc(@Body() req: any) {
    return this.appService.getChainByRpc(req);
  }
}
