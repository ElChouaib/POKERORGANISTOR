import { Player, StorageService } from './../services/storage.service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  date : Date = new Date();
  currentDate = this.date.toLocaleDateString('en-EN', { weekday: 'long', month: 'long', day: 'numeric' }); 
  PlayerList: Player[] = [];
  newPlayer : Player = <Player>{};

  PlayerAdded : boolean;
  constructor(private storage: Storage, private plt: Platform, private SStorage: StorageService, private toastController: ToastController, private alertController: AlertController) {
    this.plt.ready().then(() =>{
      this.LoadPlayers();
    })
  }

 async showToast(msg){
   const toast = await this.toastController.create({
     message: msg,
     duration: 1500,
     position:"top"

   });
   toast.present();
 }

 async presentAlertConfirm(msg:any) {
  if (this.PlayerList.length === 0)
    return null;
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: '<strong>'+msg+'</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
        this.deleteAll();
        }
      }
    ]
  });

  await alert.present();
}

  
  showForm(){
    this.PlayerAdded = !this.PlayerAdded;
    this.newPlayer.name = '';
  }


  //READ PLAYERS
  LoadPlayers(){
    this.SStorage.getPlayers().then(Players => {
      this.PlayerList = Players;
    })
  }

  //ADD PLAYERS
  AddPlayer(){
    this.newPlayer.id = Date.now();
    this.newPlayer.buyIn = 200;
    this.newPlayer.CaveFinal = 200;
    console.log('ts :' + this.newPlayer.name);
    this.SStorage.addPlayer(this.newPlayer).then(player => {
      this.newPlayer = <Player>{};
      this.showToast('PLAYER ADDED');
      this.LoadPlayers();
    })
    this.showForm();
      
  }

  //deleteALL
  deleteAll(){
      this.SStorage.deleteALL().then(Players => {
        this.PlayerList = Players;
    })
  }
  
}
