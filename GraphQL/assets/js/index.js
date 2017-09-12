$("document").ready(function() {
	$("#sendPost").on("click", function() {
		var title = $("#postForm input[name=post_title]").val();
		var body = $("#postForm textarea[name=post_body]").val();
		$.ajax({
			type: "POST",
			url: "/graphql",
			data: JSON.stringify({
				query: `mutation { addPost(title:"${title}",body:"${body}"){ errors post{ id } } }`
			}),
			dataType: "json",
			contentType: "application/json",
			success: function(response) {
				$("#error").empty();
				if(!response.data.addPost.errors){
					render();
				}else{
					for(var i in response.data.addPost.errors){
						$("#error").append("<p>"+response.data.addPost.errors[i]+"</p>");
					}
				}
				$("#postForm")[0].reset();
			}
		});
	});

	function render() {
		$.ajax({
			type: "POST",
			url: "/graphql",
			data: JSON.stringify({
				query: `{ post{ id title body comment{ id body } } }`
			}),
			dataType: "json",
			contentType: "application/json",
			success: function(response) {
				var data = response.data.post;
				$("#main").empty();
				for(var i in data) {
					$("#main").append(renderPost(data[i]));
				}

				$(".sendComment").on("click", function() {
					var id = parseInt($(this).attr("data-id"));
					var body = $(`#commentForm-${id} input[name=comment_body]`).val();
					$.ajax({
						type: "POST",
						url: "/graphql",
						data:JSON.stringify({
							query: `mutation { addComment(body:"${body}",post_id:${id}){ errors comment{ id } } }`
						}),
						dataType: "json",
						contentType: "application/json",
						success: function(response) {
							if(!response.data.addComment.errors){
								render();
							}
							$(`#commentForm-${id}`)[0].reset();
						}
					});
				});

				$(".delPost").on("click", function() {
					var id = parseInt($(this).attr("data-id"));
					$.ajax({
						type: "POST",
						url: "/graphql",
						data:JSON.stringify({
							query: `mutation { deletePost(id:${id}) }`
						}),
						dataType: "json",
						contentType: "application/json",
						success: function(response) {
							$("#post-" + id).fadeOut();
						}
					});
				});

				$(".delComment").on("click", function() {
					var id = parseInt($(this).attr("data-id"));
					$.ajax({
						type: "POST",
						url: "/graphql",
						data:JSON.stringify({
							query: `mutation { deleteComment(id:${id}) }`
						}),
						dataType: "json",
						contentType: "application/json",
						success: function(response) {
							$("#comment-" + id).fadeOut();
						}
					});
				});
			}
		});
	}

	render();
});
