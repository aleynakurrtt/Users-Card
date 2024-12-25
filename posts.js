function getUserIdFromQueryString() {
    const params = new URLSearchParams(window.location.search);
    return params.get('userId');
}

const apiBase = 'https://jsonplaceholder.typicode.com/posts';

async function fetchPosts(userId) {
    try {
        const response = await fetch(`${apiBase}?userId=${userId}`);
        if (!response.ok) throw new Error('API request failed');
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
    return card;
}

async function displayPosts() {
    let userId = getUserIdFromQueryString();
    if (!userId) {
        const input = prompt('Lütfen bir kullanıcı ID girin (1-10 arası):');
        const parsedInput = Number(input);
        if (isNaN(parsedInput) || parsedInput < 1 || parsedInput > 10) {
            alert('Geçersiz ID!');
            throw new Error('Invalid User ID');
        }
        userId = parsedInput;
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('userId', userId);
        window.history.pushState({}, '', newUrl);
    }

    const posts = await fetchPosts(userId);
    const postCardsContainer = document.getElementById('postCards');
    postCardsContainer.innerHTML = '';

    if (posts) {
        posts.forEach(post => {
            const card = createPostCard(post);
            postCardsContainer.appendChild(card);
        });
    }
}

window.onload = displayPosts;
