/* console.log('Hello wordl'); */

// Create HTTP server
const http = require('http');

const users = [
    { name: 'Max', age: 23},
    { name: 'Jhon', age: 22},
    { name: 'Jill', age: 21}
];

const posts = [
    { id: 1, title: 'Post_1', content: 'Some content 1'},
    { id: 2, title: 'Post_2', content: 'Some content 2'},
    { id: 3, title: 'Post_3', content: 'Some content 3'}
];

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;
    const paramsIndex = url.lastIndexOf('/');
    const hasId = paramsIndex > 0;

    // Endpoints
    if (method === 'GET' && url === '/users') {
        response.write(JSON.stringify(users));
    } else if (method === 'GET' && url === '/posts') {
        response.write(JSON.stringify(posts));
    } else if (method === 'POST' && url === '/posts') {
        //Save a new post
        
        // title=New post&content=This is a new post -> Buffer
        const postData = [];
        
        request.on('data', chunk => {
            console.log(chunk);
            postData.push(chunk);
        });

        request.on('')

        request.on('end', () => {
            // id=1&title=New post&content=This is a new post
            const parsedData = Buffer.concat(postData).toString();
            console.log(parsedData);

            // Split string by &
            const [title, content] = parsedData.split('&');

            // Extract title and content value
            const titleValue = title.split('=')[1]
            const contentValue = content.split('=')[1];
            
            // Create new post (pass the title and the content)
            newPost = {
                id: Math.floor(Math.random() * 1000),
                title: titleValue,
                content: contentValue
            }

            // Send the new post to the client
        });

        const newPost = { id: 4, title: 'New post', content: 'This is a new post' };

        posts.push(newPost);
        response.write('A new post has been added')
    } else if (method === 'GET' && url.includes('/posts') && hasId) {
        const postId = url.slice(paramsIndex + 1);
        url.slice(paramsIndex, 1);

        const post = posts.find((post) => {
            return post.id === +postId
        });
        if (!post) {
            response.write('No post found with the given id')
        } else {
            response.write(JSON.stringify(post))
        }
    }else {
        response.write('No data found!')
    }
    response.end();
});

// Localhost:4000
server.listen(4000)