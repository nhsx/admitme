const origin = window.location.origin

export const  appConfig = {
    clientId: 'Admit-me', 
    nhsRootDomain: 'https://auth.sandpit.signin.nhs.uk',
    scope: 'openid profile',
    responseType: 'code',
    redirectUri: 'http://localhost:5000/logincallback',
  }