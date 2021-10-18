import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { clintProxySuperFlys } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';

@Controller('api/v2/user')
export class UserController {

  //Inyeccion de client protxy 
  constructor(private readonly clientProxy: clintProxySuperFlys) { }
  //Instanciar ClientProxy
  private _clientProxyUser = this.clientProxy.clintPorxy();

  @Post()
  create(@Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO)
  }


  @Get()
  findAll(): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }

}
