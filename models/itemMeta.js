var conn = require('./db').conn;

function ItemMeta(itemMeta){
	this.name = itemMeta.name;
	this.brandTid = itemMeta.brandTid;
	this.tid = itemMeta.tid;
	this.comments = itemMeta.comments;
};

module.exports = ItemMeta;

ItemMeta.prototype.save = function(callback){
	
	var itemMeta = {
		name : this.name,
		brandTid : this.brandTid,
		tid : this.tid,
		comments : this.comments
	};

	var itemMetaCol = conn.collection('itemMetas');

	itemMetaCol.count({tid : itemMeta.tid}, function(err, count){

		if(err){
			return callback(err);
		}

		if(count > 0){
			itemMetaCol.update({tid : itemMeta.tid}, {$set : {name : itemMeta.name, comments : itemMeta.comments}}, function(err, result){
				if(err){
					return callback(err);
				}
				else{
					callback(null, result);
				}
			});
		}
		else{
			itemMetaCol.insert(itemMeta, function(err, result){
				if(err){
					return callback(err);
				}
				else{
					callback(null, result);
				}
			});
		}

	});
};

ItemMeta.getByTid = function(tid, callback){
	conn.collection('itemMetas').findOne({tid : tid}, function(err, result){
		if(err){
			callback(err);
		}else{
			callback(null, result);
		}
	});
};

ItemMeta.getByBrandTid = function(brandTid, callback){
	conn.collection('itemMetas').find({brandTid : brandTid}).toArray(function(err, results){
		if(err){
			return callback(err);
		}

		callback(null, results);
	});
};

ItemMeta.getAll = function(callback){
	conn.collection('itemMetas').find().toArray(function(err, results){
		if(err){
			return callback(err);
		}

		callback(null, results);
	});
}