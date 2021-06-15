import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() film!: Film;

  constructor(public _modal: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this._modal.closeModal();
  }

}
