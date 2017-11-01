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
