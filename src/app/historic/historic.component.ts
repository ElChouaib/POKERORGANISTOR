import { InfoCardComponent } from './../info-card/info-card.component';
import { StorageService, historyLog, Player } from './../services/storage.service';
import { ModalController, Platform, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
})
export class HistoricComponent implements OnInit {

  LogsHistory: historyLog[] = []
  listPlayers: Player[] = []
  result = 0;
    constructor(private modalcntrl: ModalController,
              private SStorage: StorageService,
              private plt: Platform,
              private alertController: AlertController,
              private toastController:ToastController,
              private popover: PopoverController) {
      this.plt.ready().then(() =>
      {
        this.loadHistory();
      })
     }

  ngOnInit() {}

/******************************************* Design features *******************************************/ 
  //show Card
  async showCard(ev: any) {
    const popover = await this.popover.create({
      component: InfoCardComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
}
  //Show toast function
  async showToast(msg, toastcolor){
    const toast = await this.toastController.create({
      message: msg,
      duration: 200,
      position:"top",
      color:toastcolor
 
    });
    toast.present();
  }

  //dismiss the modal controller
  close(){
    this.modalcntrl.dismiss()
  }

  //get all logs 
  loadHistory(){
    this.SStorage.getLogs().then(resLogs => {
      this.LogsHistory = resLogs;
    })
  }

  //Alert
  async presentAlertConfirm(msg:any) {
    if (this.LogsHistory.length === 0)
      return null;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>do you want to delete all logs?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
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

  //delete
  deleteAll(){
      this.SStorage.deleteALLLogs().then(logs=>{
          this.LogsHistory = logs;
          this.showToast('All Logs DELETED !!','danger')
      })
  }
  
}
