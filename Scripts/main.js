const buttons = document.querySelectorAll('.profile-card__btn');
const timeCards = document.querySelectorAll('.time-card');

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function updateDashboard(timeframe) {
    const data = await fetchData(); // Отримуємо дані з файлу

    if (!data) return;

    timeCards.forEach(card => {
        const title = card.getAttribute('data-title');
        const categoryData = data.find(item => item.title === title);

        if (categoryData) {
            const { current, previous } = categoryData.timeframes[timeframe];

            const label = timeframe === 'daily' ? 'Yesterday' :
                timeframe === 'weekly' ? 'Last Week' : 'Last Month';

            card.querySelector('.time-card__hours--current').textContent = `${current}hrs`;
            card.querySelector('.time-card__hours--previous').textContent = `${label} - ${previous}hrs`;
        }
    });
}

// 3. Обробка кліків
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        updateDashboard(btn.id);
    });
});

// Запускаємо при старті
updateDashboard('weekly');