
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
});
