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
  namePlayerField: String;
  PlayerList: Player[] = [];
  newPlayer : Player = <Player>{};

  PlayerAdded : boolean;
  constructor(private storage: Storage, private plt: Platform, private SStorage: StorageService, private toastController: ToastController, private alertController: AlertController) {
    this.plt.ready().then(() =>{
      this.LoadPlayers();
    })
  }
/******************************************* Design features *******************************************/ 
  //Show toast function
 async showToast(msg, toastcolor){
   const toast = await this.toastController.create({
     message: msg,
     duration: 700,
     position:"top",
     color:toastcolor

   });
   toast.present();
 }

 //show msg confirmation after clicking in deleteALL button
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

  //switch to display or hide the form
  showForm(){
    this.PlayerAdded = !this.PlayerAdded;
    this.namePlayerField = '';
  }

 

  showNetEarning(buyin: number, cavefinal: number)
  {
    let netEarning = cavefinal - buyin;
    return (netEarning >=0)? '+'.concat(netEarning.toString()) : netEarning.toString();
  }
  /******************************************* COLORS*******************************************/
  getColor(buyin: number, cavefinal: number){ 
    return (cavefinal - buyin >= 0) ? 'green' : 'red';

  }
  getColorofBadge(buyin)
  {
    if (buyin < 600)
      return 'secondary';
    else if (buyin < 1000)
      return 'tertiary';
    else if (buyin < 1400)
      return 'warning';
    else
      return 'danger';
  }
  /* ******************************************CRUD OPERATIONS****************************************** */

  //READ PLAYERS
  LoadPlayers(){
    this.SStorage.getPlayers().then(Players => {
      this.PlayerList = Players;
    })
  }

  //ADD PLAYERS
  AddPlayer(){
      this.newPlayer = {id: Date.now(), name:this.namePlayerField, buyIn: 200, CaveFinal:200}
      this.SStorage.addPlayer(this.newPlayer).then(player => {
      this.newPlayer = <Player>{};
      this.showToast('PLAYER ADDED','success');
      this.LoadPlayers();
    })
    this.showForm();
      
  }

  //deleteALL
  deleteAll(){
      this.SStorage.deleteALL().then(Players => {
        this.PlayerList = Players;
        this.showToast('ALL PLAYERS DELETED','danger')
    })
  }
  updatePlayer(player: Player){
    this.SStorage.updatePlayer(player).then(res =>{
      this.LoadPlayers();
      this.showToast('BUYIN UPDATED','success')
    })
  }
  deletePlayer(player: Player)
  {
    this.SStorage.deletePlayer(player).then(res => 
      { 
        this.LoadPlayers();
        this.showToast('Player Deleted','danger')
      })
  }
  
}
