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
                if (typeof options.onClose === "function") options.onClose();
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