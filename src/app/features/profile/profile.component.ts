import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  title = 'Decoded ID Token';

  user$ = this.auth.user$;

  //code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));

  constructor(private auth: AuthService) {}
}

//"auth0|64878e3d8afd8292c1926a3e"
//"auth0|64878e3d8afd8292c1926a3e"
//"google-oauth2|109103851544080473329"
