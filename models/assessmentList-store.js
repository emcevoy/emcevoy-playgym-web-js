//model that contains methods to handle assessment list and assessment queries

'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentListStore = {

  store: new JsonStore('./models/assessmentList-store.json', { assessmentCollection: [] }),
  collection: 'assessmentCollection',

  getAllAssessmentLists() {
    return this.store.findAll(this.collection);
  },

  getAssessmentLists(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserAssessmentLists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

   getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  addAssessmentList(assessmentList) {
    this.store.add(this.collection, assessmentList);
    this.store.save();
  },

  removeAssessmentList(id) {
    const assessmentList = this.getAssessmentLists(id);
    this.store.remove(this.collection, assessmentList);
    this.store.save();
  },

  removeAllAssessmentLists() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addAssessment(id, assessment) {
    const assessmentList = this.getAssessmentLists(id);
    assessmentList.memberAssessments.push(assessment);

    this.store.save();
  },
  
  addComment(id, assessmentId) {
    const assessmentList = this.getUserAssessments(id);
    const assessments = assessmentList.memberAssessments;
    this.store.update(this.collection, assessments);

    this.store.save();
  },
  
  updateAssessment(assessment) {
   this.store.update(this.collection, assessment);
   this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const assessmentlist = this.getAssessmentLists(id);
    const assessments = assessmentlist.memberAssessments;
    _.remove(assessments, { id: assessmentId});
    this.store.save();
  },
};

module.exports = assessmentListStore;