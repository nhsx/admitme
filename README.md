# NHSX Admit Me prototype

This is the source code for the Admit Me prototype which was developed by the NHSX Innovation Lab. 

This software was developed specifically to test how patients might be able to check-in to care settings using a QR code on their device. 

The software uses [NHS login](https://nhsconnect.github.io/nhslogin/) to provide the user's data which is then encoded into a QR code. For this trial the [NHS login sandpit environment](https://nhsconnect.github.io/nhslogin/integrating-to-sandpit/) was used. If you wish to run the software yourself, you will need to configure your own sandpit environment (our configuration has not been shared for security purposes).  

The running prototype can be found [here](http://admit-me.services.nhs.uk/).


The project consists of 4 components: 

## admitme-ui 

The patient app using NHS login to generate a QR code.

A ReactJS frontend using NHS UI toolkit

## admitme-pas

An app for scanning a QR code and displaying the patients data. Simulating the front desk software.

A ReactJS app with barcode scanner library.

## admitme-userinfo

A Lambda to get user information from sandpit environment

## admitme-qrcode

A NodeJS QR code generation utility
