# NHSX Admit Me prototype

This is the source code for the Admit Me prototype which was developed by the NHSX Innovation Lab. 

This software was developed specifically to test how patients might be able to check-in to care settings using a QR code on their device. 

The software uses [NHS login](https://nhsconnect.github.io/nhslogin/) to provide the user's data which is then encoded into a QR code. For this trial the [NHS login sandpit environment](https://nhsconnect.github.io/nhslogin/integrating-to-sandpit/) was used. If you wish to run the software yourself, you will need to configure your own sandpit environment (our configuration has not been shared for security purposes).  

The running prototype can be found [here](http://admit-me.services.nhs.uk/).

## Getting started

Clone the repository:
```
git clone https://github.com/nhsx/admitme.git
```

Open a command line and set the current directory to one of the three apps in the repo (admitme-ui for example):
```
cd admitme/admitme-ui
```

Install the project dependencies (this will need to be done for all three apps):
```
yarn install
```

Once the install is done run the app locally:
```
yarn start
```
This will start a localhost server running the app.



## Repository contents 

### admitme-ui 

The patient app using NHS login to generate a QR code.

A ReactJS frontend using NHS UI toolkit

To run the app you will need to have set up your own NHS login sandpit environment and create a config.js file with details.

### admitme-pas

An app for scanning a QR code and displaying the patients data. Simulating the front desk software.

A ReactJS app with barcode scanner library.

### admitme-userinfo

A service which deployed on AWS Lambda to get user information from sandpit environment. In the admitme-ui app, on return from NHS login, a token is received. This token is sent to this service to look up the user details. These details are then used to generate a QR code in admitme-ui.
