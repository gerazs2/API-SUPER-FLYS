import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";


@Injectable()
export class clintProxySuperFlys {

    //importancion de nuestro confing service
    constructor(private readonly config: ConfigService) { }

    //generar conexion con usuario

    clintPorxy(): ClientProxy {
        return ClientProxyFactory.create({

            transport: Transport.RMQ,//Transporte de RabbitMQ
            options: {
                urls: this.config.get('AMQP_URL'), //se obtiene la variable de entorno AMQPURL de .env.development 
                queue: RabbitMQ.UserQueue, //nombre de la cola con la que se manejan los usuarios
            },
        })
    }


    //Configuracion RabbitMQ para pasajeros
    clientProxyPassengers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.PassengerQueue,
            }
        })
    }

    //Configuracion de RabbitMQ para Vuelos

    clientProxyFlights(): ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.FlightsQueue,
            }
        })
    }

 
}