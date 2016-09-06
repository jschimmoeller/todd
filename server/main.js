import { Meteor } from 'meteor/meteor';

import '../imports/api/services.js';
import '../imports/api/hmis.js';
import '../imports/api/daily.js';

import { Services } from '../imports/api/services';
import { HMIS } from '../imports/api/hmis';

Meteor.startup(() => {
  //TODO remove
  const testLoad = HMIS.find({hmisId: 5}).fetch();
  //console.log('testLoad: ', testLoad);
  if (testLoad.length === 0){
    HMIS.insert({hmisId: 1, firstname: 'Brian', lastname: 'Lima', race: 'w', gender: 'M'});
    HMIS.insert({hmisId: 2, firstname: 'Cory', lastname: 'Delphos', race: 'w', gender: 'M'});
    HMIS.insert({hmisId: 3, firstname: 'Gerald', lastname: 'Ottoville', race: 'w', gender: 'M'});
    HMIS.insert({hmisId: 4, firstname: 'Beth', lastname: 'Garrison', race: 'w', gender: 'F'});
    HMIS.insert({hmisId: 5, firstname: 'Lena', middleInitial: 'K', lastname: 'Smith', race: 'b', gender: 'F'});
    HMIS.insert({hmisId: 6, firstname: 'John', lastname: 'Smith', race: 'w', gender: 'M'});
  }
  const testServices = Services.find({}).fetch();
  if (testServices.length === 0 ){
    Services.insert({title: 'bikes', featureCode: 'bikes'});
    Services.insert({title: 'mail', featureCode: 'mail'});
    Services.insert({title: 'Laundry In', featureCode: 'laundry In'});
    Services.insert({title: 'Laundry Out', featureCode: 'laundry Out'});
  }
});
