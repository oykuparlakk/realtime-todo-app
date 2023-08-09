import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserService } from '../../user/services/user.service';
import { Server, Socket } from 'socket.io';
import { UnauthorizedException } from '@nestjs/common';
import { UserI } from '../../user/user.interfaces';
import { ConnectionService } from '../services/connection.service';
import { TodoService } from '../services/todo.service';
import { AuthService } from 'src/auth/services/auth.service';

@WebSocketGateway({
  namespace: 'todos',
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
  },
})
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private connectionService: ConnectionService,
    private todoService: TodoService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(
        socket.handshake.auth.Authorization,
      );
      const user: UserI = await this.userService.getOneById(
        decodedToken.user.id,
      );

      if (!user) {
        console.log('disconnect user');
        return this.disconnect(socket);
      } else {
        console.log('do smth', user);

        await this.connectionService.create({
          socketId: socket.id,
          connectedUser: user,
        });

        const todos = await this.todoService.findAll();

        return this.server.to(socket.id).emit('todos', todos);
      }
    } catch {
      console.log('disconnect user');
      return this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
