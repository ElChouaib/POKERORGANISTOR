import { Injectable, NgModuleFactoryLoader } from '@angular/core';
import { Storage } from '@ionic/storage';
import { promise } from 'protractor';

export interface Player{
  id: number;
  name: String;
  buyIn: number;
  CaveFinal: number;
}

const PLAYERS_KEYS = 'my-players';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
  //Create
  addPlayer(player: Player) :Promise<any>
  {
    return this.storage.get(PLAYERS_KEYS).then((players: Player[]) => {
      if (players){
        console.log(player)
        players.push(player);
        return this.storage.set(PLAYERS_KEYS, players)
      } else {
        return this.storage.set(PLAYERS_KEYS, [player])
      }

    })
  }

  //Read
  getPlayers():Promise<Player[]>{
    return this.storage.get(PLAYERS_KEYS)
  }

  //update
  updatePlayer(player: Player): Promise<any> {
      return this.storage.get(PLAYERS_KEYS).then((players: Player[]) => {
        if(players.length === 0){
          console.log('we r here')
          return null;
        }
        let newPlayers: Player[] = [];
        for (let p of players){
            if (p.id === player.id)
              newPlayers.push(player);
            else
            newPlayers.push(p);
        }
       
        return this.storage.set(PLAYERS_KEYS, newPlayers);
      })
  }

  //delete
  deletePlayer(player: Player): Promise<any>{
    return this.storage.get(PLAYERS_KEYS).then((players: Player[]) =>{
      if (players.length === 0)
          return null;
      let PlayerstoKeep: Player[] = []
      for (let p of players){
        if (p.id !== player.id)
        PlayerstoKeep.push(p);
      }
      return this.storage.set(PLAYERS_KEYS, PlayerstoKeep)
    })
  }

  //deleteALL
  deleteALL(): Promise<any>{
    return this.storage.get(PLAYERS_KEYS).then(() =>{
      return this.storage.set(PLAYERS_KEYS, []);
    })
  }
}
