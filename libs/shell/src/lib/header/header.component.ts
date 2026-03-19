import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@auth';
import { TranslateDirective } from '@ngx-translate/core';
import { NgbCollapse, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { LanguageSelectorComponent } from '@i18n';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    TranslateDirective,
    NgbCollapse,
    RouterLink,
    RouterLinkActive,
    LanguageSelectorComponent,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
  ],
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  private credentialsService = inject(CredentialsService);

  menuHidden = true;

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}
