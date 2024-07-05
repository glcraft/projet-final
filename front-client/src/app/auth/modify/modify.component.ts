import { Component } from '@angular/core';
import { Clients } from '@app/Models/clients';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent {

  client: any;
  email:string;
  nom: string;
  adr_ligne1: string;
  adr_ligne2: string;
  adr_cp: string;
  adr_ville: string;

  ngOnInit() {
    /// ToDO : get logged client
  }




  onSubmit() {
    console.log('submit');
  }
}
