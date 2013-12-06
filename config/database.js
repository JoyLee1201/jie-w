module.exports = 
  { "development":
    { "driver":   "mongodb"
  , 	"url":	"mongodb://travis:test@localhost:27017/myapp"
    }
  , "test":
    { "driver":   "mongodb"
	, 	"url":      "mongodb://travis:test@localhost:27017/myapp"
    }
  , "production":
    {  "driver":   "mongodb"
  , "url":      "mongodb://travis:test@localhost:27017/myapp"
    }
  };
