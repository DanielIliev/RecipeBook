import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  username: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      // console.log('Please fill in all fields');
      this.flashMessageService.show('Please fill in all fields', { cssClass: 'alert-danger' });
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessageService.show('Please fill in a valid email', { cssClass: 'alert-danger' });
      return false;
    }

    // this.authService.registerUser(user)
  }
}
