Router.map(function () {
  this.route('serverFile', {
    path: '/get',
    action: function () {
      this.response.writeHead(200, {'Content-Type': 'text/html'});
      this.response.end('hello from server');
    }
  });
});