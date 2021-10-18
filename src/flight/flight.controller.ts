import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Observable, throwIfEmpty } from 'rxjs';
import { FlightMSG, PassengerMSG } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { clintProxySuperFlys } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';

@Controller('api/v2/flight')
export class FlightController {

    //Inyeccion de conexion RabbitMQ 
    constructor(private readonly clientProxy: clintProxySuperFlys) { }
    //Instanciar ClientProxy
    private _clientProxyFlight = this.clientProxy.clintPorxy();

    //Nueva instancia para agregar pasajero a vuelo
    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();


    @Post(':flightId/passenger/:passengerId') //Metodo para agregar pasajero a vuelo
    async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string) {
        const passenger = await this._clientProxyPassenger
            .send(PassengerMSG.FIND_ONE, passengerId)
            .toPromise();

        if (!passenger) throw new HttpException('Passenger Not Fund', HttpStatus.NOT_FOUND);

        return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, { flightId, passengerId });
    }

    @Post()
    create(@Body() FlightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.CREATE, FlightDTO)
    }

    @Get()
    findAll(): Observable<IFlight[]> {
        return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() FlightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.UPDATE, { id, FlightDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyFlight.send(FlightMSG.DELETE, id);
    }

}
