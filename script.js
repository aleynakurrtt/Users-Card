const apiUrl = 'https://jsonplaceholder.typicode.com/users';


async function fetchUserData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createUserCard(userData) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <h3>${userData.name}</h3>
        <p><i class="fas fa-user icon"></i> Kullanıcı Adı: ${userData.username}</p>
        <p><i class="fas fa-building icon"></i> Şirket: ${userData.company.name}</p>
        <p><i class="fas fa-location-dot icon"></i> Adres: ${userData.address.city}, ${userData.address.zipcode}</p>
        <p><i class="fas fa-envelope icon"></i> E-posta: ${userData.email}</p>
        <p><i class="fas fa-phone icon"></i> Telefon: ${userData.phone}</p>
        <p><i class="fas fa-globe icon"></i> Website: <a href="${userData.website}" target="_blank">${userData.website}</a></p>
    `;

    return card;
}

async function displayUserCards() {
    const userCardsContainer = document.getElementById('userCards');
    const userData = await fetchUserData();

    if (userData) {
        userData.forEach(user => {
            const card = createUserCard(user);
            userCardsContainer.appendChild(card);
        });
    }
}


window.onload = displayUserCards;