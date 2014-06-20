/**
 * The layers filter module.
 *
 * @return singleton instance of layers fitler class (extends Backbone.View).
 */
define([
  'backbone',
  'underscore',
  'presenter',
  'mps',
  'text!legend.html'
], function(Backbone, _, presenter, mps, template) {

  var Legend = Backbone.View.extend({

    template: _.template(template),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.append(this.template());
    }

  });

  var Legend = new Legend();

  return Legend;

});