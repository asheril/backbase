# Backbase Front End Assignment: Make A Transaction

I've spent a little over 4 hours on this task as advised. I believe that it is around 30% done.

I've put the emphasis on making sure that the progress is logged via git commits and that the existing functionality is working and thoroughly unit tested. 

UPDATE 25.01:

I've spent more time on the task and I managed to add more features and css styling. However, it's still needs some work.

Remarks:
* during the development I've realized that I need all the recent transactions to keep the account balance in check, so I've decided to change the filtering and sorting from backend side to client side. Honestly, I think that it's a bad choice but given the circumstances it's the only one that I could have made without introducing any more code for the account state management.
* right now there are two containers and the rest of the components is presentational only
* handling dates deserves dedicated components
* at some point I've stopped adding unit tests
* more styling needs to be applied
* the original json mock is corrupted and it influences the app

#### In order to run the mock server and the application please execute:
`npm run start`

#### In order to run the unit tests please execute:
`npm run test`
