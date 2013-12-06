/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var Post = describe('Post', function () {
    property('title', String);
	property('tags', String);
	property('description', String);
	property('datetime', Date, {default: Date});
	property('pv', Number, {default:1});
	property('content', String);
    property('author', String);
	property('author_link', String);
    set('restPath', pathTo.posts);
});

var Answer = describe('Answer', function (){
	property('question_id', String);
	property('question_title', String);
	property('content', String);
	property('answer_datetime', Date, {default: Date});
    property('author', String);
	property('author_link', String);
	set('restPath', pathTo.answers);
});

