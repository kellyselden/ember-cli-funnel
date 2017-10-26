import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  included: service(),
  excluded: computed(function() {
    return getOwner(this).lookup('service:excluded');
  })
});
