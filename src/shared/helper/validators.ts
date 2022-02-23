export default class Validators {
  static isEmailValid(email: string): boolean {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }

  static isPhoneValid(inputtxt: string): boolean {
    const phoneno =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im;
    return phoneno.test(inputtxt);
  }

  static isPasswordValid(pass: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regex.test(pass);
  }

  static isLengthRangeValid(
    text: string,
    minLength: number,
    maxLength: number
  ): boolean | string {
    if (minLength && maxLength) {
      return text && text.length >= minLength && text.length <= maxLength;
    }
    if (minLength) {
      return text && text.length >= minLength;
    }
    if (maxLength) {
      return text && text.length <= maxLength;
    }
    return false;
  }

  static isRequired(text: string): boolean {
    if (text) {
      if (typeof text === 'string') {
        return text.trim().length > 0;
      }
      return true;
    }
    return false;
  }

  static isNumberOnly(text: string): boolean {
    const regex = /\D/g;
    return !regex.test(text);
  }
}
