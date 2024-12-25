function createUserCard(userData) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `

        <h3>${userData.name}</h3>
        <p>Kullanıcı Adı: ${userData.username}</p>
        <button onclick="window.location.href='posts.html?userId=${userData.id}'">
            Gönderileri Görüntüle
        </button>
    `;

    return card;

}


