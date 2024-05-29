
const output = document.getElementById('output');
const button = document.getElementById('get-posts-btn');

async function showPosts() {
    try{
        const response = await fetch('http://localhost:8081/api/posts');
        const posts = await response.json();
        output.innerHTML = '';

        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.textContent  = post.title;
            output.appendChild(postEl);
        });
    }catch (error){
        console.error('Error fetching posts: ', error);
    }
}


button.addEventListener('click', showPosts);
