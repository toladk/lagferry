export interface User {
  token: string;
  refreshToken: string;
  type: string;
  roles: [
    {
      authority: string;
    }
  ];
  firstTimeLoggedIn: boolean;
}
