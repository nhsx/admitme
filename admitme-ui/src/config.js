const origin = window.location.origin

export const  appConfig = {
    clientId: 'Admit-me', 
    nhsRootDomain: 'https://auth.sandpit.signin.nhs.uk',
    scope: 'openid profile email phone profile_extended',
    responseType: 'code',
    redirectUri: origin + '/welcome',
  }