```js
app.get('/auth/google', function(req, res) {
  res.redirect('https://accounts.google.com/o/oauth2/auth?access_type=offline&response_type=code&client_id=[google_clientid]&redirect_uri=[redirect_uri]&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email');
});

app.get('/auth/google/callback', function(req, res) {
  if (req.query.code) {
    request.post({
      url: `https://www.googleapis.com/oauth2/v3/token?code=${req.query.code}&client_id=[google_clientid]&grant_type=authorization_code&redirect_uri=[redirect_uri]`
    }, function(err, httpResponse, body) {
      var refresh_token = JSON.parse(body).refresh_token;
      var accessToken = JSON.parse(body).access_token;
      request.get({
        url: `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      }, function(err, httpResponse, body) {
        var profile = JSON.parse(body);
        res.send(profile);
      });
    });
  }
  else {
    res.redirect('/signin');
  }
});
```
