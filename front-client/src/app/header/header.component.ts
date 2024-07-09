import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor() {
    let forgetMe = localStorage.getItem('forgetMe') || '';
    window.addEventListener('beforeunload', (event) => {
      if (forgetMe === 'yes') {
        localStorage.clear();
        event.returnValue = ''; // Standard way of preventing the default action
        return undefined; // Older browsers might need this
      }
    });
  }
}
