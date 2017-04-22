import Ember from 'ember';

export default Ember.Controller.extend({
  included: Ember.inject.service(),
  excluded: Ember.computed(function() {
    return Ember.getOwner(this).lookup('service:excluded');
  })
});
