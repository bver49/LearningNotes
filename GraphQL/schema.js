var {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} = require("graphql");

var Post = require("./model/Post");
var Comment = require("./model/Comment");

var commentType = new GraphQLObjectType({
	name: "Comment",
	description: "A Comment",
	fields: {
		id :{
			type: GraphQLInt
		},
		body: {
			type: GraphQLString
		},
		post_id:{
			type: GraphQLInt
		}
	}
});

var postType = new GraphQLObjectType({
	name: "Post",
	description: "A post",
	fields: {
		id :{
			type: GraphQLInt
		},
		title :{
			type: GraphQLString
		},
		body: {
			type: GraphQLString
		},
		comment:{
			type: new GraphQLList(commentType),
			resolve(post){
				return Comment.findAll({where: {post_id:post.id},attributes:["id","body"]}).then(function(result) {
					if(result.length > 0){
						return result;
					}else{
						return "";
					}
				});
			}
		}
	}
});

var schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'rootQuery',
		fields: {
			post: {
				type : new GraphQLList(postType),
				description: "Post",
				args : {
					id : {
						type: GraphQLInt,
						description:"post id"
					}
				},
				resolve(root,params, ctx){
					if(params.id) {
						return Post.findOne({where: {id:params.id},attributes: ["id","title","body","comment"]}).then(function(result) {
							return [result];
						});
					} else {
						return Post.findAll({ order: 'created_at DESC'}).then(function(result) {
							return result;
						});
					}
				}
			}
		}
	}),
	mutation: new GraphQLObjectType({
		name: "rootMutation",
		fields: {
			addPost : {
				type: new GraphQLObjectType({
					name:"addPostResult",
					fields:{
						post:{
							type:postType
						},
						errors:{
							type:new GraphQLList(GraphQLString)
						}
					}
				}),
				args : {
					title : {
						type: GraphQLString,
						description:"post title"
					},
					body : {
						type: GraphQLString,
						description:"post body"
					}
				},
				resolve(root,params, ctx) {
					return Post.create({title:params.title,body:params.body},{raw: true}).then(function(post){
						console.log("x");
						return {"post":post};
					}).catch(function(err){
						err = err.errors;
						var result = [];
						for(var i in err){
							result.push(err[i].message);
						}
						return {"errors":result};
					})
				}
			},
			addComment : {
				type: new GraphQLObjectType({
					name:"addCommentResult",
					fields:{
						comment:{
							type:commentType
						},
						errors:{
							type:new GraphQLList(GraphQLString)
						}
					}
				}),
				args : {
					body : {
						type: GraphQLString,
						description:"post body"
					},
					post_id : {
						type: GraphQLInt,
						description:"post id"
					}
				},
				resolve(root,params,ctx) {
					return Comment.create({body:params.body,post_id:params.post_id},{raw:true}).then(function(comment){
						return comment;
					}).catch(function(err){
						console.log(err);
						err = err.errors;
						var result = [];
						for(var i in err){
							result.push(err[i].message);
						}
						return {"errors":result};
					});
				}
			},
			deletePost : {
				type: GraphQLString,
				args : {
					id : {
						type: GraphQLInt,
						description:"post id"
					}
				},
				resolve(root,params,ctx) {
					return Post.destroy({ where:{ id: params.id }}).then(function(result){
						return result;
					});
				}
			},
			deleteComment : {
				type: GraphQLString,
				args : {
					id : {
						type : GraphQLInt,
						description:"post id"
					}
				},
				resolve(root,params,ctx) {
					return Comment.destroy({ where:{ id: params.id }}).then(function(result){
						return result;
					});
				}
			}
		}
	})
});

module.exports = schema;
