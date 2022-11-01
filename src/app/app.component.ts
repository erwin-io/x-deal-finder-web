import { Component } from '@angular/core';
import { AppConfigService } from './core/services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title;

  constructor(private appConfigService: AppConfigService) {
    this.title = this.appConfigService.config.appTitle;
  }
}
