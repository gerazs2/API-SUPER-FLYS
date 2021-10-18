import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PassengerMSG } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { clintProxySuperFlys } from 'src/common/proxy/client-proxy';
import { PassengerDTO } from './dto/passenger.dto';

@Controller('api/v2/passenger')
export class PassengerController {

    constructor(private readonly clientProxy: clintProxySuperFlys) { }

    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();


    @Post()
    create(@Body() PassengerDTO: PassengerDTO): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMSG.CREATE, PassengerDTO);
    }


    @Get()
    findAll(): Observable<IPassenger[]> {
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
    }


    @Put(':id')
    update(@Param('id') id: string, @Body() PassengerDTO: PassengerDTO): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE, { id, PassengerDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
    }

}
