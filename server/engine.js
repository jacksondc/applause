Pages = new Meteor.Collection("pages");

Router.map(function () {
  this.route('update', {
    where: 'server',
    action: function () {
      update(this);
      sendGet(this);
    }
  });

  this.route('get', {
    where: 'server',
    path: '/get',
    action: function () {
      sendGet(this);
    }
  });
});

function getInfo(context) {
  var ip = context.request.headers["x-forwarded-for"];
    if (ip){
      var list = ip.split(",");
      ip = list[list.length-1]; //last element in list
    } else {
      ip = context.request.connection.remoteAddress;
    }
  var host = context.request.query.url;
  return {ip: ip, host: host};
}

function update(context) {
    var info = getInfo(context);
    var host = info.host;
    var ip = info.ip;
    console.log('host is ' + host);
    console.log('ip is ' + ip);
    
    if(host) {
      var page = Pages.findOne({url: host});
      
      if(page) {
        if(_.contains(page.voters, ip)) {
          console.log('Already voted. Unvoting.');
          Pages.update(page._id, {
            $inc: {votes:-1},
            $pull: { voters: ip }
          });
        } else {
          console.log('Not already voted. Voting.');
          Pages.update(page._id, {
            $inc: {votes:1},
            $addToSet: {voters: ip}
          }); 
        }
      } else {
        console.log('creating the page');
        Pages.insert({url:host, votes: 1, voters:[ip]});
      }
    }
}

function sendGet(context) {
    context.response.setHeader('access-control-allow-origin', '*');
    
    var info = getInfo(context);
    var host = info.host;
    var ip = info.ip;

    var page = Pages.findOne({url: host});

    context.response.writeHead(200, {'Content-Type': 'application/json'});

    if(page) {
      console.log('found the page - returning number');
      var response = { votes: page.votes, voted: _.contains(page.voters, ip) };
      context.response.end(JSON.stringify(response));
    } else {
      console.log('creating the page');
      page = Pages.findOne(Pages.insert({url:host, votes: 0, voters: []}));
      var response = { votes: 0, voted: false };
      context.response.end(JSON.stringify(response));
    }
}