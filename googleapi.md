For calendar，使用 google nodejs api module

```js
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "callbackurl"
);

//產生一個URL來取得calendar操作權限

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope:'https://www.googleapis.com/auth/calendar',
});

/*
發一個GET request 給產生的url，Google會return一組code回來
GET /callbackurl?code={authorizationCode}
*/

api.get("callbakurl",function(req, res){
  var code = req.query.code;
  //透過這組Code去取得token
  oauth2Client.getToken(code, function (err, tokens) {
    if (!err) {
      //將這個token 設定給 oauth2Client
      oauth2Client.setCredentials(tokens);
    }
  });
});

/* 使用google calendar 透過 oauth2Client 認證 */
var calendar = google.calendar({ version: 'v3', auth: oauth2Client });

//在新增工作之後，插入一個事件到主要的日曆
calendar.events.insert({
  calendarId: "primary",
  fields: {
    attendees:2, //參與人數
    creator:"創建人",
    description:"介紹",
    start:"開始時間",
    end:"結束時間"
  }
},function (err,result) {
  if (err) console.log(err);
});
```
