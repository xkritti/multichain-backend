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

  @Get('createWallet')
  createWallet() {
    return this.appService.createWallet();
  }

  @Post('singUp')
  singUp(@Body() req: singUpDto) {
    return this.appService.singup(req);
  }
  @Post('singIn')
  singIn(@Body() req: singInDto) {
    return this.appService.singin(req);
  }

  @Post("getWalletInfo")
  getWalletInfo( @Body () privateKey:string){
    return this.appService.getWalletInfo(privateKey)
  }
  @Post("getWalletByMnemonic")
  getWalletByMnemonic( @Body () phrase:string){
    return this.appService.getWalletByMnemonic(phrase)
  }
  @Get("testrpc")
  getrpc(){
    return this.appService.getRpc()
  }
}
