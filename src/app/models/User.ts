export class User {

  public static readonly dummy = new User('', '');

  constructor(
    public username: string,
    public uid: string
  ) { }
};