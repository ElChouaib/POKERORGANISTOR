import { Injectable, NgModuleFactoryLoader } from '@angular/core';
import { Storage } from '@ionic/storage';
import { promise } from 'protractor';

export interface Player{
  id: number;
  name: String;
  buyIn: number;
  CaveFinal: number;
}

export interface historyLog{
  message:String,
  player: Player,
  dateLog: Date
}

const PLAYERS_KEYS = 'my-players';
const HISTORY_KEY = 'my-history;'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
  //Create Player
  addPlayer(player: Player) :Promise<any>
  {
    return this.storage.get(PLAYERS_KEYS).then((players: Player[]) => {
      if (players){
        players.push(player);
        return this.storage.set(PLAYERS_KEYS, players)
      } else {
        return this.storage.set(PLAYERS_KEYS, [player])
      }

    })
  }
    //Create History
    addLogHistory(log: historyLog) :Promise<any>
    {
      return this.storage.get(HISTORY_KEY).then((logs: historyLog[]) => {
        if (logs){
          logs.push(log);
          return this.storage.set(HISTORY_KEY, logs)
        } else {
          return this.storage.set(HISTORY_KEY, [log])
        }
  
      })
    }

  //Read
  getPlayers():Promise<Player[]>{
    return this.storage.get(PLAYERS_KEYS)
  }

   //Read
   getLogs():Promise<historyLog[]>{
    return this.storage.get(HISTORY_KEY)
  }

  //update
  updatePlayer(player: Player): Promise<any> {

      return this.storage.get(PLAYERS_KEYS).then((players: Player[]) => {
        if(players.length === 0){
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
  deleteALLPlayers(): Promise<any>{
    return this.storage.get(PLAYERS_KEYS).then(() =>{
      return this.storage.set(PLAYERS_KEYS, []);
    })
  }
  deleteALLLogs(): Promise<any>{
    return this.storage.get(HISTORY_KEY).then(() =>{
      return this.storage.set(HISTORY_KEY, []);
    })
  }
}
