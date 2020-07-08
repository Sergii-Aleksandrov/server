'use strict'

let http = require('http');
let fs = require('fs');

http.createServer(function(request, response) {
	if (request.url != '/favicon.ico') {
		getPage(request.url, response);
	};
}).listen(8888);

function getPage(name, response, statusCode = 200) {
	if (name == '/') {
		name = 'index';
	};

	fs.readFile('pages/' + name + '.html', 'utf8', (err, data) => {
		if (!err) {
			fs.readFile('elems/menu.html', 'utf8', (err, menu) => {
				if (err) throw err;

				data = data.replace(/\{\{menu\}\}/g, menu);

				fs.readFile('elems/footer.html', 'utf8', (err, footer) => {
					if (err) throw err;

					data = data.replace(/\{\{footer\}\}/g, footer)

					response.statusCode = statusCode;
					response.setHeader('Content-Type', 'text/html');
					response.write(data);
					response.end();
				});
;			});
		} else {
			if (statusCode != 404) {
				getPage('404', response, 404);
			} else {
				throw err;
			};
		};
	});
};
