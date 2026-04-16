require('dotenv').config();

class Users {
  static get standard() {
    return {
      username: process.env.STANDARD_USER,
      password: process.env.STANDARD_PASSWORD,
    };
  }

  static get locked() {
    return {
      username: process.env.LOCKED_USER,
      password: process.env.STANDARD_PASSWORD,
    };
  }

  static get invalid() {
    return {
      username: process.env.INVALID_USER,
      password: process.env.STANDARD_PASSWORD,
    };
  }

  static get wrongPassword() {
    return {
      username: process.env.STANDARD_USER,
      password: process.env.INVALID_PASSWORD,
    };
  }

  static get emptyUsername() {
    return {
      username: '',
      password: process.env.STANDARD_PASSWORD,
    };
  }

  static get emptyPassword() {
    return {
      username: process.env.STANDARD_USER,
      password: '',
    };
  }
}

module.exports = { Users };
