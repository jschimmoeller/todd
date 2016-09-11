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
  if (testServices.length === 0 || testServices.filter((s)=>{return s.featureCode == 'WORKBOOTS' }).length == 0 ){
    Services.remove({});
    Services.insert({title: 'BackPack', featureCode: 'BKPACK'});
    Services.insert({title: 'Barber', featureCode: 'BARBER'});
    Services.insert({title: 'Bike', featureCode: '017-BIKE'});
    Services.insert({title: 'Bike Lock', featureCode: '019-BIKELOCK'});
    Services.insert({title: 'Bike Repair', featureCode: 'BIKEREPAIR'});
    Services.insert({title: 'Birth Certificate', featureCode: 'BIRTHCERT'});
    Services.insert({title: 'Blanket', featureCode: '015-BLANKET'});
    Services.insert({title: 'Bus Pass', featureCode: '006-BUSPASS'});
    Services.insert({title: 'Clothing', featureCode: '007-CLOTHING'});
    Services.insert({title: 'Computer', featureCode: 'COMPUTER'});
    Services.insert({title: 'CTID', featureCode: '001-CTID'});
    Services.insert({title: 'Diapers', featureCode: 'DIAPERS'});
    Services.insert({title: 'Drink', featureCode: '013-DRINK'});
    Services.insert({title: 'Emergency Fund', featureCode: '014-EMERGFUND'});
    Services.insert({title: 'Food', featureCode: '009-FOOD-'});
    Services.insert({title: 'Food Stamp Svcs.', featureCode: 'FOODSTAMPAPP'});
    Services.insert({title: 'Hygiene', featureCode: '011-HYGIENE'});
    Services.insert({title: 'Hygiene Kit', featureCode: 'HYGIENEKIT'});
    Services.insert({title: 'Info/Ref.', featureCode: '002-INFO/REF'});
    Services.insert({title: 'Info/Ref - ODB', featureCode: 'OURDAILYBREAD'});
    Services.insert({title: 'Info/Ref - Salv. Army', featureCode: 'SALVATIONARMY'});
    Services.insert({title: 'Info/Ref - United Way', featureCode: 'UNITEDWAY'});
    Services.insert({title: 'Job Assist', featureCode: 'JOBASSIST.'});
    Services.insert({title: 'Kids Clothes 1', featureCode: '"1STKIDSCLOTHES'});
    Services.insert({title: 'Kids Clothes 2', featureCode: '"2NDKIDSCLOTHES'});
    Services.insert({title: 'Kids Clothes 3', featureCode: '"3RDKIDSCLOTHES'});
    Services.insert({title: 'Kids Clothes 4', featureCode: '"4THKIDSCLOTHES'});
    Services.insert({title: 'Kids Clothes 5', featureCode: '"5THKIDSCLOTHES'});
    Services.insert({title: 'Laundry In', featureCode: '012-LAUNDRY'});
    Services.insert({title: 'Laundry Out', featureCode: 'LAUNDRYPICKUP'});
    Services.insert({title: 'Legal ID (Florida)', featureCode: '005-LEGALID'});
    Services.insert({title: 'Mail', featureCode: '008-MAIL'});
    Services.insert({title: 'Men. Health - Clin Res.', featureCode: 'CLINICALRESEARCH'});
    Services.insert({title: 'Men. Health - Man. Glens', featureCode: 'MANATEEGLENS'});
    Services.insert({title: 'Phone', featureCode: '003-PHONE'});
    Services.insert({title: 'Prescriptions', featureCode: 'PRESCRIPTIONS'});
    Services.insert({title: 'Reading Glasses', featureCode: 'READGLASS'});
    Services.insert({title: 'Restroom', featureCode: '004-RESTROOM'});
    Services.insert({title: 'Shower', featureCode: '010-SHOWER'});
    Services.insert({title: 'VET Counseling', featureCode: 'VETCOUNSELING'});
    Services.insert({title: 'Work Boots', featureCode: 'WORKBOOTS'});
  }
});
