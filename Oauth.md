## FB

#### 1.

```
https://www.facebook.com/v2.8/dialog/oauth?client_id=${FBAppId}&scope=email,public_profile&response_type=code&redirect_uri=${RedirectURL}
```

透過上述網址取得權限，FB會將Code夾帶在URL帶回自己設定的Redirect URL

#### 2.

取得Code之後向下面網址發出request

```
https://graph.facebook.com/oauth/access_token?client_id=${FBAppId}&redirect_uri=${RedirectURL}&client_secret=${FBAppSecret}&code=${FB給的code}
```

取得Access Token

#### 3.

使用Access Token透過Graph API取得用戶資料

```
https://graph.facebook.com/v2.8/me?fields=id,name,email&access_token=${AccessToken}
```

## Google

#### 1.

```
https://accounts.google.com/o/oauth2/auth?approval_prompt=force&access_type=offline&response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email
```

透過上述網址取得權限，Google會將Code夾帶在URL帶回自己設定的Redirect URL

#### 2.

取得Code之後向下面網址發出request

```
https://www.googleapis.com/oauth2/v3/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_uri}
```

取得Access Token

#### 3.

使用Access Token透過Google API取得用戶資料

```
https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}
```

#### Example

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
