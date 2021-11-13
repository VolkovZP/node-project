const card = document.querySelector("#card")

if (card) {
    card.addEventListener('click', ({ target }) => {
        if (target.classList.contains('js-remove')) {
            const id = target.dataset.id


            fetch('/card/remove/' + id, {
                method: 'delete',
            })
                .then(res => res.json())
                .then(card => {
                    console.log(card)
                })
        }
    })
}
