
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Daily = new Mongo.Collection('daily');

Meteor.methods({
 'daily.save'(hmis, services ) {
   check(hmis, Object);
   check(services, [Object])

   let today = new Date();
   today.setHours(0);
   today.setMinutes(0);
   today.setSeconds(0);
   let tomorrow = new Date();
   tomorrow.setDate(today.getDate() + 1 );
   tomorrow.setHours(0);
   tomorrow.setMinutes(0);
   tomorrow.setSeconds(0);

   const x =  Daily.find({ createdAt: {
     $gte: today,
     $lt: tomorrow
   }, "hmis.hmisId": hmis.hmisId }).fetch();
   if (x.length > 0){
     //console.log('update daily ')
     Daily.update(x[0]._id, { $set: { hmis, services, modifiedAt: new Date() } });
   } else {
     //console.log('inserting daily')
     Daily.insert({
       hmis,
       services,
       createdAt: new Date(),
       modifiedAt: new Date()
     });
   }


 },
 'daily.remove'(id) {
   check(id, String);

   Daily.remove(id);
 },
 'daily.findToday'(hmisId) {
   check(hmisId, Number);

   let today = new Date();
   today.setHours(0);
   today.setMinutes(0);
   today.setSeconds(0);
   let tomorrow = new Date();
   tomorrow.setDate(today.getDate() + 1 );
   tomorrow.setHours(0);
   tomorrow.setMinutes(0);
   tomorrow.setSeconds(0);

   const x =  Daily.find({ createdAt: {
     $gte: today,
     $lt: tomorrow
   }, "hmis.hmisId": hmisId }).fetch();
   if (x.length > 0){
     return x[0];
   } else {
     return undefined;
   }
 },
 'daily.getTodayTotals'() {

   let today = new Date();
   today.setHours(0);
   today.setMinutes(0);
   today.setSeconds(0);
   let tomorrow = new Date();
   tomorrow.setDate(today.getDate() + 1 );
   tomorrow.setHours(0);
   tomorrow.setMinutes(0);
   tomorrow.setSeconds(0);

   const x =  Daily.find({ createdAt: {
     $gte: today,
     $lt: tomorrow
   }}).fetch();

   return x.length();
 },
'daily.reportTotals'(sDate) {
  //console.log('>>>', sDate);

  let today = new Date(sDate);
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1 );
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);

  const x =  Daily.find({ createdAt: {
    $gte: today,
    $lt: tomorrow
  }}).fetch();
  //console.log('>>>>', x);

  const reportData = {
    reportDate: sDate,
    hmisSummary:[],
    raceSummary:{},
    genderSummary:{},
    servicesSummary: {}

  };
  x.forEach((d)=>{
    const hmisFeatureCodes = d.services.map((s)=>{
      if (reportData.servicesSummary[s.title]){
        if(s.hasQuantity){
          reportData.servicesSummary[s.title] = reportData.servicesSummary[s.title] + s.quantity;
        } else {
          reportData.servicesSummary[s.title] = reportData.servicesSummary[s.title] + 1;
        }
      } else {
          if(s.hasQuantity){
            reportData.servicesSummary[s.title] = s.quantity;
          } else {
            reportData.servicesSummary[s.title] = 1;
          }
      }
      return s.featureCode;
    });
    const sName = d.hmis.firstname + (d.hmis.middleInitial? ' ' + d.hmis.middleInitial + ' ' : ' ' ) + d.hmis.lastname;
    reportData.hmisSummary = reportData.hmisSummary.concat({name: sName, hmisId: d.hmis.hmisId, svcCharString: hmisFeatureCodes.join('') });

    const r = d.hmis.race ? d.hmis.race : 'o';
    if (reportData.raceSummary[r]){
      reportData.raceSummary[r] = reportData.raceSummary[r] + 1;
    } else {
      reportData.raceSummary[r] = 1;
    }

    if (reportData.genderSummary[d.hmis.gender]){
      reportData.genderSummary[d.hmis.gender] = reportData.genderSummary[d.hmis.gender] + 1;
    } else {
      reportData.genderSummary[d.hmis.gender]  = 1;
    }

  });

  return reportData;
}
});
