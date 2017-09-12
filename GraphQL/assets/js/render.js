function renderPost(post){
  var comment = ""
  for(var i in post.comment){
    comment+=`<div id="comment-${post.comment[i].id}" class="panel-footer">
      ${post.comment[i].body}
      <span class="glyphicon glyphicon-remove delComment" data-id="${post.comment[i].id}"></span>
    </div>`
  }
return `<div id="post-${post.id}" class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">${post.title}</h3>
  </div>
  <div class="panel-body">
    ${post.body}
    <br>
    <div class="btn btn-danger delPost" data-id="${post.id}">刪除</div>
  </div>
  ${comment}
  <div class="panel-footer">
    <form class="form-horizontal" id="commentForm-${post.id}">
      <div class="form-group">
        <div class="col-md-8">
          <input type="text" class="form-control" name="comment_body">
        </div>
        <div class="col-md-4">
          <div class="sendComment btn btn-primary" data-id="${post.id}">留言</div>
        </div>
      </div>
    </form>
  </div>
</div>`;
}
