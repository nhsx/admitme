const origin = window.location.origin

export const  appConfig = {
    clientId: process.env.REACT_APP_NHS_LOGIN_CLIENT_ID, 
    nhsRootDomain: 'https://auth.sandpit.signin.nhs.uk',
    scope: 'openid profile email phone profile_extended',
    responseType: 'code',
    redirectUri: origin + '/logincallback',
  }