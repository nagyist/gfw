/**
 * The Torque Timeline view presenter.
 *
 * @return TorqueTimelinePresenter class
 */
define([
  'underscore', 'mps', 'backbone',
  'map/presenters/PresenterClass',
  'map/helpers/layersHelper'
], function(_, mps, Backbone, PresenterClass, layersHelper) {

  'use strict';

  var TorqueTimelinePresenter = PresenterClass.extend({

    init: function(view) {
      this.view = view;
      this._super();
    },

    _subscriptions: [{
      'Torque/date-change': function(change) {
        this.view.setCurrentDate(change);
      },

      'Torque/started': function(bounds) {
        this.view.setBounds(bounds);
        this.view.render();
      }
    }],

    setTorqueDate: function(date) {
      mps.publish('Timeline/date-change', [date]);
    },

    togglePlaying: function() {
      mps.publish('Timeline/toggle-playing', []);
    },

    startPlaying: function() {
      mps.publish('Timeline/start-playing', []);
    },

    stopPlaying: function() {
      mps.publish('Timeline/stop-playing', []);
    }

  });

  return TorqueTimelinePresenter;

});