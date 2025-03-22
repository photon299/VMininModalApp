const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://m.media-amazon.com/images/I/51Xcc-0hDRL._AC_UF1000,1000_QL80_.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://t4.ftcdn.net/jpg/00/61/19/53/360_F_61195341_rR4lMptEspj16GvOdmy0MaMznSRveh2M.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://previews.123rf.com/images/nitsuki/nitsuki1606/nitsuki160600012/58891371-%D0%B7%D1%80%D0%B5%D0%BB%D1%8B%D0%B9-%D0%BC%D0%BE%D0%BD%D0%B3%D0%BE-%D1%81-%D0%BB%D0%B8%D1%81%D1%82%D0%B0-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5.jpg'},
];

//*? 1. На основе массива динамически вывести список карточек
//*? 2. Показать цену в модальном окне
//*? 3. Модальное окно для удаления с 2 кнопками



const modal = $.modal({
    title: "Wakanda Forever!", 
    closeble: true,
    content: `
            <p>Modal is working.</p>
            <p>Lorem ipsum dolor sit.</p>`,
    width: "400px",
    footerButtons: [
        {
            text: "Ok",
            type: "primary",
            handler() {
                console.log("Primary btn clicked");
                modal.close();
            },
        },
        {
            text: "Cancel",
            type: "danger",
            handler: function() {
                console.log("Danger btn clicked");
                modal.close();
            },
        }
    ],
});

const card = $.card(fruits);