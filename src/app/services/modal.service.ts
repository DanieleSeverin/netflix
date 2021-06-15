import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisible: boolean = false;

  constructor() { }

  showModal(){
    this.isVisible = true;
  }

  closeModal(){
    this.isVisible = false;
  }
}
