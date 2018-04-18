var MongoClient=require('mongodb').MongoClient;
var assert=require('assert');

// 链接数据库客户端
function _connect(callback){
    const url='mongodb://localhost:27017/usersInfo';
    MongoClient.connect(url,function (err,client){
        assert.equal(null,err);
        console.log('connected successful to DB Server');
        const db=client.db('usersInfo');
        callback(err,db);
        client.close();
    })
}

exports.insertOne=function (collectionName,json,callback){
    _connect(function (err,db){
        assert.equal(null,err);
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
        })
    })
}

exports.insertMany=function(collectionName,json,callback){
    _connect(function(err,db){
        assert.equal(null,err);
        db.collection(collectionName).insertMany(json,function(err,result){
            callback(err,result);
        })
    })
}

exports.find=function (collectionName,json,args,callback){
    _connect(function (err,db){
        assert.equal(null,err);
        var result=[];
        var cursor=db.collection(collectionName).find(json);
        if(args!=null){
            cursor=cursor.skip(args.skip).limit(args.limit);
        }
        cursor.each(function (err,doc){
            if(err){
                callback(err,null);
                console.log(err);
            }
            if(doc){
                result.push(doc)
            }else{
                callback(null,result);
            }
        })
    })
}

exports.deleteMany=function (collectionName,json,callback){
    _connect(function (err,db){
        assert.equal(null,err);
        db.collection(collectionName).deleteMany(json,function (err,result){
            callback(err,result);
        })
    })
}

exports.updateMany=function (collectionName,json1,json2,callback){
    _connect(function (err,db){
        assert.equal(null,err);
        db.collection(collectionName).updateMany(json1,json2,function (err,result){
            callback(err,result);
        })
    })
}