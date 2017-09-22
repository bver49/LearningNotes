```js
app.get('/auth/google', function(req, res) {
  res.redirect('https://accounts.google.com/o/oauth2/auth?approval_prompt=force&access_type=offline&response_type=code&client_id=[client_id]&redirect_uri=[redirect_uri]&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email');
});

app.get('/auth/google/callback', function(req, res) {
  if (req.query.code) {
    request.post({
      url: `https://www.googleapis.com/oauth2/v3/token?code=${req.query.code}&client_id=[client_id]&client_secret=[client_secret]&grant_type=authorization_code&redirect_uri=http://localhost:2000/auth/google/callback`
    }, function(err, httpResponse, body) {
      var token = JSON.parse(body);
      var refresh_token = token.refresh_token;
      var accessToken = token.access_token;
      var id_token = token.id_token;
      request.get({
        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
      }, function(err, httpResponse, body) {
        var profile = JSON.parse(body);
        var user_id = profile.sub;
        var email = profile.email;
        var verified_email = profile.verified_email;
        res.send(profile);
      });
    });
  }
  else {
    res.redirect('/signin');
  }
});

```
