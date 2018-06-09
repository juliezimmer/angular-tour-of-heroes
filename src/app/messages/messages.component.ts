import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
   // the messageService property must be public because will be bound in the template.
   // Angular will inject the singleton MessageService into this property when it creates the MessagesComponent.
   constructor (public messageService: MessageService) { }

   ngOnInit() {
   }

}
