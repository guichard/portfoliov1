document.addEventListener('DOMContentLoaded', function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    // Affichage du bouton lorsque l'utilisateur fait défiler la page vers le bas
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.classList.remove("hidden");  // Affiche le bouton
        } else {
            scrollTopBtn.classList.add("hidden");  // Cache le bouton
        }
    };

    // Lorsque le bouton est cliqué, revenir en haut de la page
    scrollTopBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
});

// Fonction pour charger les cartes à partir du fichier JSON
async function loadCards() {
    try {
        console.log('Chargement du fichier JSON...');
        const response = await fetch('./data.json');

        if (!response.ok) {
            throw new Error('Erreur de chargement du fichier JSON');
        }

        const data = await response.json();
        console.log('Données JSON chargées:', data);

        const container = document.getElementById('cards-container');

        data.forEach(card => {
            // Créer un élément de carte
            const cardElement = document.createElement('div');
            cardElement.classList.add('max-w-xs', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'bg-white', 'hover:shadow-2xl', 'transition-all', 'duration-300', 'transform', 'hover:scale-105');
            
            // Créer un lien autour de l'image et du texte
            const cardLink = document.createElement('a');
            cardLink.href = card.link;  // URL du lien dans le fichier JSON
            cardLink.target = "_blank";  // S'ouvre dans un nouvel onglet
            cardLink.classList.add("block");  // Assurer que le lien prend toute la place de la carte
            
            // Ajouter l'image et le texte à l'intérieur du lien
            cardLink.innerHTML = `
                <img class="w-full h-48 object-cover" src="${card.image}" alt="Image de la carte">
                <div class="p-4">
                    <h2 class="text-xl font-semibold text-gray-800">${card.title}</h2>
                    <p class="mt-2 text-gray-600">${card.description}</p>
                </div>
            `;

            // Ajouter le lien au conteneur de la carte
            cardElement.appendChild(cardLink);
            container.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
}

// Charger les cartes à l'ouverture de la page
window.onload = loadCards;

