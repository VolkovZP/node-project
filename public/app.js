const $card = document.querySelector("#card")

if ($card) {
    $card.addEventListener('click', ({ target }) => {
        if (target.classList.contains('js-remove')) {
            const id = target.dataset.id

            const csrf = target.dataset.csrf
            fetch('/card/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                },
            })
                .then(res => res.json())
                .then(card => {
                    if (card.courses.length) {
                        const html = card.courses.map(c => {
                            return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c.id}" data-csrf="${csrf}">Удалить</button>
                </td>
              </tr>
              `}).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent = card.price + "UAH"
                    } else {
                        $card.innerHTML = '<p>Корзина пуста</p>'
                    }
                })
        }

    })

}
M.Tabs.init(document.querySelectorAll('.tabs'));