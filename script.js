const hotels = [
    {
        name: "Motel One Wien Westbahnhof",
        distance: 3,
        pricePerNight: 95,  // Updated price for June 16-18, 2024
        totalPrice: 190,
        reviews: 13613,
        reviewScore: 8.6,
        bookingLink: "https://www.booking.com/hotel/at/motel-one-wien-westbahnhof.en-gb.html",
        mapsLink: "https://maps.app.goo.gl/mcDXSn8aavcjaxLZA"
    },
    {
        name: "Ibis budget Wien Messe",
        distance: 2,
        pricePerNight: 85,  // Updated price for June 16-18, 2024
        totalPrice: 170,
        reviews: 9426,
        reviewScore: 7.5,
        bookingLink: "https://www.booking.com/hotel/at/ibis-budget-wien-messe.en-gb.html",
        mapsLink: "https://maps.app.goo.gl/dCwwTsaTd5aQfYru6"
    },
    {
        name: "JUFA Hotel Wien City",
        distance: 4,
        pricePerNight: 90,  // Updated price for June 16-18, 2024
        totalPrice: 180,
        reviews: 8947,
        reviewScore: 8.5,
        bookingLink: "https://www.booking.com/hotel/at/jufa-wien-city.en-gb.html",
        mapsLink: "https://maps.app.goo.gl/2PKzg8pVdaVATNM79"
    },
    {
        name: "Holiday Inn Vienna City (i)",
        distance: 1.7,
        pricePerNight: 110,  // Updated price for June 16-18, 2024
        totalPrice: 220,
        reviews: 1473,
        reviewScore: 8.3,
        bookingLink: "https://www.booking.com/hotel/at/holiday-inn-vienna-city.en-gb.html",
        mapsLink: "https://maps.app.goo.gl/3oHzF4ZQgH1kcVGa9"
    },
    {
        name: "Austria Trend Hotel Europa Wien (ege)",
        distance: 0,
        pricePerNight: 150,  // Updated price for June 16-18, 2024
        totalPrice: 300,
        reviews: 4985,
        reviewScore: 8.6,
        bookingLink: "https://www.booking.com/hotel/at/austria-trend-europa.en-gb.html",
        mapsLink: "https://maps.app.goo.gl/HJE3KCCBRL7u9qmS7"
    },
    {
        name: "Hotel NH Wien City (i)",
        distance: 1.5,
        pricePerNight: 130,  // Updated price for June 16-18, 2024
        totalPrice: 260,
        reviews: 2928,
        reviewScore: 8.1,
        bookingLink: "https://www.booking.com/hotel/at/nh-wien-city.en-gb.html",
        mapsLink: "https://maps.app.goo.gl/ttwkKmUGBacJZtcz6"
    },
    {
        name: "Flemings Selection Hotel Wien-City (i)",
        distance: 1.1,
        pricePerNight: 140,  // Updated price for June 16-18, 2024
        totalPrice: 280,
        reviews: 2896,
        reviewScore: 8.5,
        bookingLink: "https://www.booking.com/hotel/at/fleming-s-deluxe-wien-city.en-gb.html",
        mapsLink: "https://maps.app.goo.gl/QxLU9qemgEwRaQNj9"
    }
];

const priceWeight = document.getElementById('priceWeight');
const reviewWeight = document.getElementById('reviewWeight');
const distanceWeight = document.getElementById('distanceWeight');

function updateWeights() {
    document.getElementById('priceWeightValue').textContent = priceWeight.value;
    document.getElementById('reviewWeightValue').textContent = reviewWeight.value;
    document.getElementById('distanceWeightValue').textContent = distanceWeight.value;
    calculateRankScores();
}

function calculateRankScores() {
    const maxPrice = Math.max(...hotels.map(h => h.pricePerNight));
    const minPrice = Math.min(...hotels.map(h => h.pricePerNight));
    const maxReviews = Math.max(...hotels.map(h => h.reviews));
    const minReviews = Math.min(...hotels.map(h => h.reviews));
    const maxDistance = Math.max(...hotels.map(h => h.distance));
    const minDistance = Math.min(...hotels.map(h => h.distance));
    
    hotels.forEach(hotel => {
        const normalizedPrice = (hotel.pricePerNight - minPrice) / (maxPrice - minPrice);
        const normalizedReviews = (hotel.reviews - minReviews) / (maxReviews - minReviews);
        const normalizedDistance = (hotel.distance - minDistance) / (maxDistance - minDistance);
        
        hotel.rawScore = (normalizedPrice * priceWeight.value) + (normalizedReviews * reviewWeight.value) + (normalizedDistance * distanceWeight.value);
    });
    
    const maxRawScore = Math.max(...hotels.map(h => h.rawScore));
    const minRawScore = Math.min(...hotels.map(h => h.rawScore));
    
    hotels.forEach(hotel => {
        hotel.rankScore = (hotel.rawScore - minRawScore) / (maxRawScore - minRawScore);
    });
    
    hotels.sort((a, b) => b.rankScore - a.rankScore);
    displayHotels();
}

function displayHotels() {
    const tbody = document.querySelector('#hotelsTable tbody');
    tbody.innerHTML = '';
    
    hotels.forEach(hotel => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${hotel.name}</td>
            <td>${hotel.distance}</td>
            <td>${hotel.pricePerNight}</td>
            <td>${hotel.totalPrice}</td>
            <td>${hotel.reviews}</td>
            <td>${hotel.reviewScore}</td>
            <td>${hotel.rankScore.toFixed(2)}</td>
            <td><a href="${hotel.bookingLink}" target="_blank">Book Now</a></td>
            <td><iframe src="${hotel.mapsLink}" width="300" height="200"></iframe></td>
        `;
        
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWeights();
});
