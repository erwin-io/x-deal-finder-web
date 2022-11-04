import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from './core/services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private titleService: Title) {
      const isAdminUserType = this.route.snapshot.data['isAdminUserType'];
      const title = this.route.snapshot.data['title'];
      this.titleService.setTitle(`${isAdminUserType ? 'Admin' : ''} ${this.route.snapshot.data['title']} ${this.appConfigService.config.appTitle}`);
  }
}
