let mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;

let commentCollection = mongoose.Schema({
    id : { type : String },
    titulo : { type: String },
    contenido : { type: String },
    autor : { type: String },
    fecha : { type: String }
});

let Comment = mongoose.model( 'comments', commentCollection  );

let CommentList = {
    getAll : function(){
        return Comment.find()
            .then( comments => {
                return comments;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getAuthor : function( commentAuthor ){
        return Comment.find( commentAuthor )
            .then( comments => {
                return comments;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    create : function( newStudent ){
		return Comment.create( newStudent )
				.then( comments => {
					return comments;
				})
				.catch( error => {
					throw Error(error);
				});
	},
    remove : function( studentName ){
        return Comment.remove( studentName )
                .then( comments => {
                    return comments;
                })
                .catch( error =>{
                    throw Error(error);
                });
    },
    update : function( updateOld, updateNew ){
        return Comment.update( updateOld, updateNew )
                .then( comments => {
                    return comments;
                })
                .catch( error => {
                    throw Error(error);
                });
    }
};


module.exports = {
    CommentList
};