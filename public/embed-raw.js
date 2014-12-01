(function() {
    var loadFont = {LOAD_FONT};
    var color = {COLOR};

    var remote = 'http://applauding.herokuapp.com';
    //var remote = 'http://localhost:3000';
    var local = location.host + location.pathname;

    var main_css = "<link rel='stylesheet' type='text/css' href='" + remote + "/embed.min.css?color=" + color + "'>";
    var cleanslate_css = "<link rel='stylesheet' type='text/css' href='" + remote + "/cleanslate.css'>";
    var font_css = "<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>"

    var css_stack = cleanslate_css + main_css;
    if(loadFont) { css_stack += font_css; }
    document.querySelector('head').innerHTML = css_stack + document.querySelector('head').innerHTML;

    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

      } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

      } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

      }
      return xhr;
    }

    function error() {
        throw new Error('Error with Applause request.');
    }

    function fuzzify(num) {
        if(num >= 1000) {
            return (Math.round(num / 100) / 10) + "k";
        } else {
            return num;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var applause = document.querySelector('#applause');

        applause.className += "cleanslate";
        applause.innerHTML = "<div><span class='applause-count'>0</span><span class='applause-action'>Applaud</span></div>";

        applause.addEventListener('click', function() {
            sendRequest('update');
        }, false);

        sendRequest('get');
    });

    function updateCount(num) {
        var count = fuzzify(num);
        document.querySelector('#applause span.applause-count').innerHTML = count;
    }

    function sendRequest(type) {
        var xhr = createCORSRequest('GET', remote + '/' + type + '?url=' + encodeURIComponent(local) );
        if (!xhr) {
          throw new Error('Applause won\'t work because CORS is not supported.');
          document.querySelector('#applause span').style.display = 'none';
        }

        if(type === 'get') {
            xhr.onload = function() {
                var json = JSON.parse(xhr.responseText);
                updateCount(json.votes);
                if(json.voted) {
                    document.querySelector('#applause').className += ' applause-voted';
                    document.querySelector('#applause .applause-action').innerHTML = 'Applauded';
                }
                document.querySelector('#applause').style.display = 'table';
            };
        } else {
            xhr.onload = function() {
                var json = JSON.parse(xhr.responseText);
                updateCount(json.votes);
                var applauseAction = document.querySelector('#applause .applause-action');
                if((" " + applause.className + " ").indexOf( " applause-voted " ) <= -1) {
                    applause.className += ' applause-voted';
                    applauseAction.innerHTML = 'Applauded';
                } else {
                    applause.className = (" " + applause.className + " ").replace(/(?:^|\s)applause-voted(?!\S)/, '' );
                    applauseAction.innerHTML = 'Applaud';
                }
              };
        }

        xhr.onerror = error;

        xhr.send();
    }
})();
