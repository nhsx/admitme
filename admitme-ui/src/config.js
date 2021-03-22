const origin = window.location.origin

export const  appConfig = {
    clientId: 'Admit-me', 
    nhsRootDomain: 'https://auth.sandpit.signin.nhs.uk',
    scope: 'openid profile profile_extended email phone',
    responseType: 'code',
    redirectUri: origin + '/logincallback',
  }