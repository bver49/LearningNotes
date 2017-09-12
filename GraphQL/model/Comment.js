var db = require("./db");
var Sequelize = require("sequelize");
var Post = require("./Post");

var commentSchema = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  post_id:{
    type: Sequelize.INTEGER,
    references: {
      model:Post,
      key: 'id'
    }
  },
	created_at: {
		type: 'TIMESTAMP',
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	}
}

var Comment = db.define('comment',commentSchema,{
  timestamps: false
});

module.exports = Comment;
