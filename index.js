let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://m.media-amazon.com/images/I/51Xcc-0hDRL._AC_UF1000,1000_QL80_.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://t4.ftcdn.net/jpg/00/61/19/53/360_F_61195341_rR4lMptEspj16GvOdmy0MaMznSRveh2M.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://previews.123rf.com/images/nitsuki/nitsuki1606/nitsuki160600012/58891371-%D0%B7%D1%80%D0%B5%D0%BB%D1%8B%D0%B9-%D0%BC%D0%BE%D0%BD%D0%B3%D0%BE-%D1%81-%D0%BB%D0%B8%D1%81%D1%82%D0%B0-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5.jpg'},
];

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img style="height: 300px; width: 300px;" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>`;

const render = () => {
    document.querySelector("#fruits").innerHTML = fruits.map(toHTML).join("");
};
render();

const priceModal = $.modal({
    title: "Цена на товар", 
    closeble: true,
    width: "400px",
    footerButtons: [
        {
            text: "Закрыть",
            type: "primary",
            handler() {
                priceModal.close();
            },
        }
    ],
});

document.addEventListener("click", event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn,
        id = +event.target.dataset.id,
        fruit = fruits.find(f => f.id === id);

    if (btnType === "price") {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `);
        priceModal.open();
    } else if (btnType === "remove") {
        $.confirm({
            title: "Вы уверены?", 
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        })
        .then(() => {
            fruits = fruits.filter(f => f.id !== id);
            render();
        })
        .catch(() => console.log("Cancel"));
    }
});