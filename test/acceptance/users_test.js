//users_test.js
/*global casper*/

'use strict';

casper.test.begin('user', 3, function suite(test) {

    casper.start('https://localhost:3000#users', function() {
        test.assertHttpStatus(200);
    });

    casper.then(function() {
        test.assertTextExists('first_name', 'first name field label displays');
    });

    casper.then(function() {
        test.assertTextExists('last_name', 'last name field label displays');
    });

    casper.run(function() {
        test.done();
    });

});
