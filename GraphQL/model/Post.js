var db = require("./db");
var Sequelize = require("sequelize");
var Comment = require("./Comment");

var postSchema = {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		validate:{
			len: {
		    args: 1,
		    msg: "請填寫標題"
		  }
		}
	},
	body: {
		type: Sequelize.STRING,
		validate:{
			len: {
				args: 1,
				msg: "請填寫內容"
			}
		}
	},
	created_at: {
		type: 'TIMESTAMP',
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	}
}

var Post = db.define('post', postSchema,{
  timestamps: false
});

Post.hasMany(Comment,{onDelete:"CASCADE",foreignKey:"post_id"});

module.exports = Post;
