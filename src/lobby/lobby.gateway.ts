import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LobbyService } from './lobby.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class LobbyGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly lobbyService: LobbyService) {}

  @SubscribeMessage('createLobby')
  async create(@MessageBody() createLobbyDto: any) {
    console.log(createLobbyDto)
    this.sendToAllClients("anwser", {'lol':"lol"})
    const lobby = this.lobbyService.create(createLobbyDto);
    this.server.emit('lobbyCreated', lobby); // Notify all clients of the new lobby
    return lobby;
  }

  @SubscribeMessage('findAllLobby')
  async findAll() {
    console.log('2')
    const lobbies = this.lobbyService.findAll();
    return lobbies;
  }

  @SubscribeMessage('findOneLobby')
  async findOne(@MessageBody() id: number) {
    
    return this.lobbyService.findOne(id);
  }

  @SubscribeMessage('updateLobby')
  async update(@MessageBody() updateLobbyDto: any) {
    console.log('4')
    console.log('3')
    this.sendToAllClients("anwser", {'lol':"lol"})
    const updatedLobby = this.lobbyService.update(updateLobbyDto.id, updateLobbyDto);
    this.server.emit('lobbyUpdated', updatedLobby); // Notify all clients of the update
    return updatedLobby;
  }

  @SubscribeMessage('removeLobby')
  async remove(@MessageBody() id: number) {
    console.log('5')
    const removed = this.lobbyService.remove(id);
    this.server.emit('lobbyRemoved', { id }); // Notify all clients of the removal
    return removed;
  }

  sendToAllClients(event: string, message: any): void {
    console.log(event)
    this.server.emit(event, message);  // Emits the event to all connected clients
  }

  // Send a message to a specific client by their socket ID
  sendToSpecificClient(clientId: string, event: string, message: any): void {
    this.server.to(clientId).emit(event, message);  // Sends the message to a specific client
  }
}
