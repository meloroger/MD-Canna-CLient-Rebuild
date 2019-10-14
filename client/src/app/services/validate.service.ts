import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  constructor() {}

  validateRegister(user: User) {
    if (
      user.fullName === undefined ||
      user.email === undefined ||
      user.password === undefined
    ) {
      return false;
    } else if (user.fullName.length < 3 || user.password.length < 6) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
