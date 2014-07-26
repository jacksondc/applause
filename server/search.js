Meteor.methods({
  'search': function(query) {
    var page = Pages.findOne({url: query});
    return page ? page.votes : 0;
  }
});
