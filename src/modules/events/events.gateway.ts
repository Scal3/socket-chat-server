import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('EventsGateway');

  handleDisconnect(client: Socket) {
    this.logger.log(`Client has been disconnected ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client has been connected ${client.id}`);
    client.emit('lol');
  }

  afterInit(server: Socket) {
    this.logger.log('Init');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    console.log(payload);
    client.emit('answer', 'Nu sdarova, ept');
  }
}
