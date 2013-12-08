exports.routes = function (map) {
    map.resources('posts', function (post) {
		post.resources('answers');
		map.get('tags', '#tags', {collection: true});
		map.post('search', '#search', {collection: true});
		map.get('about', '#about', {collection: true});
	});
    map.root('posts#index');
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    //map.all(':controller/:action');
    //map.all(':controller/:action/:id');
};
