import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
})
export class HistoricComponent implements OnInit {

  constructor(private modalcntrl: ModalController) { }

  ngOnInit() {}
  close(){
    this.modalcntrl.dismiss()
  }
}
