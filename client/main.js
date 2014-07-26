Template.search.events({
  'submit form': function(e) {
    e.preventDefault();
    var search = $('#url').val();
    Meteor.call('search', search, function(error, count) {
      if(error) {
        alert(error.reason);
      } else {
        Session.set('result', count);
      }
    });
  }
});

Template.search.helpers({
  'result': function() {
    var v = Session.get('result');
    if(typeof v !== 'undefined')
      return v + ' votes';
  }
})
