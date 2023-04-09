export class UserToken {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string
  ) {
  }
}