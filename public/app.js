const toCurrency = (price) => new Intl.NumberFormat(('ru-RU'), {
    currency: 'rub',
    style: 'currency'
}).format(price);

document.querySelectorAll('.price').forEach((price) => {
    price.textContent = toCurrency(price.textContent);
})

const getUpdatedCard = (card) => (
    card.map((c) => (`
        <tr>
            <td>${c.title}</td>
            <td>${c.count}</td>
            <td>
                <button class="btn btn-small js-remove" data-id="{{id}}">Remove</button>
            </td>
        </tr>
    `))
);


const handleDeleteCourse = (event) => {
    const current = event.target;
    if (current.classList.contains('js-remove')) {
        const id = current.dataset.id;

        fetch(`/card/remove/${id}`, {method: 'delete'})
            .then((res) => res.json())
            .then(({courses, price}) => {
                if (courses.length) {
                    cardWrapper.querySelector('tbody').innerHTML = getUpdatedCard(courses);
                    cardWrapper.querySelector('.price').textContent = toCurrency(price);
                } else {
                    cardWrapper.innerHTML = '<p>Корзина пуста</p>';
                }
            })
    }
};

const cardWrapper = document.querySelector('#card');

if (cardWrapper) {
    cardWrapper.addEventListener('click', handleDeleteCourse)
}
