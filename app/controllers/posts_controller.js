load('application');

before(loadPost, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New post';
	this.query = {q: ''};
    this.post = new Post;
    render();
});

action(function create() {
	this.query = {q: ''};
    Post.create(req.body.Post, function (err, post) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: post && post.errors || err});
                } else {
                    send({code: 200, data: post.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Post can not be created');
                    render('new', {
                        post: post,
                        title: 'New post'
                    });
                } else {
                    flash('info', 'Post created');
                    redirect(path_to.posts);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Posts index';
	this.query = {q: ''};
    Post.all(function (err, posts) {
        switch (params.format) {
            case "json":
                send({code: 200, data: posts});
                break;
            default:
                render({
                    posts: posts
                });
        }
    });
});

action(function show() {
    this.title = 'Post show';
	this.query = {q: ''};
    switch(params.format) {
        case "json":
            send({code: 200, data: this.post});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Post edit';
	this.query = {q: ''};
    switch(params.format) {
        case "json":
            send(this.post);
            break;
        default:
            render();
    }
});

action(function update() {
    var post = this.post;
    this.title = 'Edit post details';
	this.query = {q: ''};
	var answer = new Answer;
	console.log(req.params);
	console.log(req.body.Post.title);
	answer.question_id = req.params.id;
	answer.question_title = req.body.Post.title;
	answer.content = req.body.Post.content;
	answer.author = req.body.Post.author;
	answer.author_link = req.body.Post.author_link;
	Answer.create(answer, function (err, result) { });
    this.post.updateAttributes(body.Post, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: post && post.errors || err});
                } else {
                    send({code: 200, data: post});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Post updated');
                    redirect(path_to.post(post));
                } else {
                    flash('error', 'Post can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.post.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy post');
                } else {
                    flash('info', 'Post successfully removed');
                }
                send("'" + path_to.posts + "'");
            });
        });
    });
});

action('search', function search() {
    this.title = 'Posts index';
	this.query = {q: ''};
    Post.all(function (err, posts) {
        switch (params.format) {
            case "json":
                send({code: 200, data: posts});
                break;
            default:
                render({
                    posts: posts
                });
        }
    });
});


action('tags', function tags() {
    this.title = 'Posts index';
	this.query = {q: ''};
    Post.all(function (err, posts) {
        switch (params.format) {
            case "json":
                send({code: 200, data: posts});
                break;
            default:
                render({
                    posts: posts
                });
        }
    });
});

action('about', function tags() {
    this.title = 'Posts index';
	this.query = {q: ''};
    Post.all(function (err, posts) {
        switch (params.format) {
            case "json":
                send({code: 200, data: posts});
                break;
            default:
                render({
                    posts: posts
                });
        }
    });
});

function loadPost() {
    Post.find(params.id, function (err, post) {
        if (err || !post) {
            if (!err && !post && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.posts);
        } else {
            this.post = post;
            next();
        }
    }.bind(this));
};
