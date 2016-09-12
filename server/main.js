import { Meteor } from 'meteor/meteor';

import '../imports/api/services.js';
import '../imports/api/hmis.js';
import '../imports/api/daily.js';

import { Services } from '../imports/api/services';
import { HMIS } from '../imports/api/hmis';
import { Daily } from '../imports/api/daily';

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
  if (testServices.length === 0 || testServices.filter((s)=>{return s.featureCode == '006-BUSPASS' && s.hasQuantity }).length == 0 ){
    Services.remove({});
    Daily.remove({});
    Services.insert({title: 'BackPack', featureCode: 'BKPACK', hasQuantity: false });
    Services.insert({title: 'Barber', featureCode: 'BARBER', hasQuantity: false });
    Services.insert({title: 'Bike', featureCode: '017-BIKE', hasQuantity: false });
    Services.insert({title: 'Bike Lock', featureCode: '019-BIKELOCK', hasQuantity: false });
    Services.insert({title: 'Bike Repair', featureCode: 'BIKEREPAIR', hasQuantity: false });
    Services.insert({title: 'Birth Certificate', featureCode: 'BIRTHCERT', hasQuantity: false });
    Services.insert({title: 'Blanket', featureCode: '015-BLANKET', hasQuantity: false });
    Services.insert({title: 'Bus Pass', featureCode: '006-BUSPASS', hasQuantity: true });
    Services.insert({title: 'Clothing', featureCode: '007-CLOTHING', hasQuantity: false });
    Services.insert({title: 'Computer', featureCode: 'COMPUTER', hasQuantity: false });
    Services.insert({title: 'CTID', featureCode: '001-CTID', hasQuantity: false });
    Services.insert({title: 'Diapers', featureCode: 'DIAPERS', hasQuantity: false });
    Services.insert({title: 'Drink', featureCode: '013-DRINK', hasQuantity: false });
    Services.insert({title: 'Emergency Fund', featureCode: '014-EMERGFUND', hasQuantity: false });
    Services.insert({title: 'Food', featureCode: '009-FOOD-', hasQuantity: false });
    Services.insert({title: 'Food Stamp Svcs.', featureCode: 'FOODSTAMPAPP', hasQuantity: false });
    Services.insert({title: 'Hygiene', featureCode: '011-HYGIENE', hasQuantity: false });
    Services.insert({title: 'Hygiene Kit', featureCode: 'HYGIENEKIT', hasQuantity: false });
    Services.insert({title: 'Info/Ref.', featureCode: '002-INFO/REF', hasQuantity: false });
    Services.insert({title: 'Info/Ref - ODB', featureCode: 'OURDAILYBREAD', hasQuantity: false });
    Services.insert({title: 'Info/Ref - Salv. Army', featureCode: 'SALVATIONARMY', hasQuantity: false });
    Services.insert({title: 'Info/Ref - United Way', featureCode: 'UNITEDWAY', hasQuantity: false });
    Services.insert({title: 'Job Assist', featureCode: 'JOBASSIST.', hasQuantity: false });
    Services.insert({title: 'Kids Clothes 1', featureCode: '"1STKIDSCLOTHES', hasQuantity: false });
    Services.insert({title: 'Kids Clothes 2', featureCode: '"2NDKIDSCLOTHES', hasQuantity: false });
    Services.insert({title: 'Kids Clothes 3', featureCode: '"3RDKIDSCLOTHES', hasQuantity: false });
    Services.insert({title: 'Kids Clothes 4', featureCode: '"4THKIDSCLOTHES', hasQuantity: false });
    Services.insert({title: 'Kids Clothes 5', featureCode: '"5THKIDSCLOTHES', hasQuantity: false });
    Services.insert({title: 'Laundry In', featureCode: '012-LAUNDRY', hasQuantity: false });
    Services.insert({title: 'Laundry Out', featureCode: 'LAUNDRYPICKUP', hasQuantity: false });
    Services.insert({title: 'Legal ID (Florida)', featureCode: '005-LEGALID', hasQuantity: false });
    Services.insert({title: 'Mail', featureCode: '008-MAIL', hasQuantity: false });
    Services.insert({title: 'Men. Health - Clin Res.', featureCode: 'CLINICALRESEARCH', hasQuantity: false });
    Services.insert({title: 'Men. Health - Man. Glens', featureCode: 'MANATEEGLENS', hasQuantity: false });
    Services.insert({title: 'Phone', featureCode: '003-PHONE', hasQuantity: false });
    Services.insert({title: 'Prescriptions', featureCode: 'PRESCRIPTIONS', hasQuantity: false });
    Services.insert({title: 'Reading Glasses', featureCode: 'READGLASS', hasQuantity: false });
    Services.insert({title: 'Restroom', featureCode: '004-RESTROOM', hasQuantity: false });
    Services.insert({title: 'Shower', featureCode: '010-SHOWER', hasQuantity: false });
    Services.insert({title: 'VET Counseling', featureCode: 'VETCOUNSELING', hasQuantity: false });
    Services.insert({title: 'Work Boots', featureCode: 'WORKBOOTS', hasQuantity: false });
  }
});
