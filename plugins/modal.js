Element.prototype.appendAfter = function(element) { element.parentNode.insertBefore(this, element.nextSibling) }

const noop = () => {console.log("Noop")};
const _createModalFooter = (buttons = []) => {
    if (buttons.length === 0) return document.createElement("div");
    const wrap = document.createElement("div");
    wrap.classList.add("modal-footer");
    buttons.forEach(btn => {
        const $btn = document.createElement("button");
        $btn.textContent = btn.text
        $btn.classList.add("btn");
        $btn.classList.add(`btn-${btn.type || 'secondary'}`);
        $btn.onclick = btn.handler || noop;
        wrap.append($btn);
    });
    return wrap;
}

const _createModal = (options) => {
    const {title, closeble, content, width = 600, footerButtons} = options,
        modal = document.createElement("div");
    modal.classList.add("vmodal");
    modal.insertAdjacentHTML("afterbegin", `
        <div class="modal-overlay" data-close>
            <div class="modal-window" style="width: ${parseInt(width)}px">
                <div class="modal-header">
                    <span class="modal-title">${title ?? "Title"}</span>
                    ${closeble ? "<span class='modal-close' data-close>&times;</span>" : ""}
                </div>
                <div class="modal-body" data-content>
                    ${content ?? ""}
                </div>
            </div>
        </div>`
    );
    const footer = _createModalFooter(footerButtons);
    footer.appendAfter(modal.querySelector("[data-content]"));
    document.body.append(modal);
    return modal;
}

$.modal = (options) => {
    const ANIMATION_SPEED = 200,
    $modal = _createModal(options);
    let closing = false,
        destroyed = false;

    const modal = {
        open() { (destroyed) ? console.log("Modal is destroyed!") : !closing && $modal.classList.add("open") },
        close() {
            closing = true;
            $modal.classList.remove("open");
            $modal.classList.add("hide");
            setTimeout(() => {
                $modal.classList.remove("hide");
                closing = false;
            }, ANIMATION_SPEED);
        },
    }

    const eventFunc = (event) => { if (event.target.matches("[data-close]")) modal.close() };
    $modal.addEventListener("click", eventFunc);

    return Object.assign(modal, {
        destroy() {
            $modal.remove();
            $modal.removeEventListener("click", eventFunc);
            destroyed = true;
        },
        setContent(html) { $modal.querySelector("[data-content]").innerHTML = html }
    });
};

$.card = (fruits) => {
    const row = document.createElement("div");
    row.classList.add("row");
    fruits.forEach(fruit => {
        row.innerHTML += `
            <div class="col">
                <div id="${fruit.id}" class="card">
                    <img style="height: 300px; width: 300px;" src="${fruit.img}">
                    <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary look">Посмотреть цену</a>
                    <a href="#" class="btn btn-danger delete">Удалить</a>
                    </div>
                </div>
            </div>`
    });
    
    const makeModal = (title, card = false,) => { //buttons = []
        const modal = $.modal({
            title: title, 
            closeble: true,
            content: "",
            width: "400px",
            footerButtons: [
                {
                    text: "Ok",
                    type: "primary",
                    handler() {
                        if (card) card.parentElement.remove();
                        modal.close();
                    },
                },
                {
                    text: "Cancel",
                    type: "danger",
                    handler() {
                        modal.close();
                    },
                }
            ],
        });
        return modal;
    }

    row.addEventListener("click", (event) => {
        const card = event.target.parentElement.parentElement;
        if (event.target.matches(".btn-primary")) {
            const modal = makeModal(`Цена на ${fruits[card.id - 1].title}: ${fruits[card.id - 1].price}`);
            modal.open();
        } else if (event.target.matches(".btn-danger")) {
            const cardModal = makeModal(`Удалить карточку?`, card);
            cardModal.open();
        }
    });
    document.querySelector(".container").append(row);
};