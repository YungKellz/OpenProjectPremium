const titleField = 'title'
const typeField = 'type'
const numberField = 'number'
const linkField = 'link'

const optionsOrders = [
    [numberField],
    [titleField],
    [numberField, titleField],
    [numberField, typeField, titleField],
    [numberField, typeField, titleField, linkField],
]

const getCopyOptionValue = (values, order) => {
    const { number, type, title } = values

    let result = ``
    order.forEach(field => {
        switch (field) {
            case titleField:
                result += ` ${title}`
                break
            case typeField:
                result += ` ${type}`
                break
            case numberField:
                result += ` ${number}`
                break
            case linkField:
                result += ` (https://project.rosatom.local/wp/${number})`
                break
            default:
                break
        }
    })
    return result.trim()
}

const getCopyOptionLabel = (order) => {
    let result = ``
    order.forEach(field => {
        switch (field) {
            case titleField:
                result += ` Заголовок,`
                break
            case typeField:
                result += ` Тип,`
                break
            case numberField:
                result += ` Номер,`
                break
            case linkField:
                result += ` Ссылка`
                break
            default:
                break
        }
    })
    return result.trim().replace(/,\s*$/, '')
}

const appendCopyOption = (dropdown, values, order) => {
    const copyOption = document.createElement('div')
    dropdown.appendChild(copyOption);
    copyOption.classList.add('premium-dropdown-option');
    copyOption.innerText = getCopyOptionLabel(order)
    copyOption.title = getCopyOptionValue(values, order)
    copyOption.onclick = () => navigator.clipboard.writeText(getCopyOptionValue(values, order))
}

const getCopyButtonDropdown = (values) => {
    const copyBtn = document.createElement('div');
    copyBtn.classList.add('premium-copy-btn');

    const dropdownClick = () => document.getElementById("premiumDropdownCopyBtnId").classList.toggle("premium-show-copy-dropdown")

    window.onclick = function(event) {
        if (!event.target.matches('.premium-button-copy-btn')) {
            const dropdowns = document.getElementsByClassName("premium-dropdown-copy-btn");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('premium-show-copy-dropdown')) {
                    openDropdown.classList.remove('premium-show-copy-dropdown');
                }
            }
        }
    }

    const button = document.createElement('button');
    button.classList.add('button');
    button.classList.add('-primary');
    button.classList.add('premium-button-copy-btn');
    button.innerText = 'Копировать';
    button.onclick = dropdownClick;

    const dropdown = document.createElement('div');
    dropdown.classList.add('premium-dropdown-copy-btn')
    dropdown.setAttribute('id', 'premiumDropdownCopyBtnId')

    optionsOrders.forEach(order => {
        appendCopyOption(dropdown, values, order)
    })

    copyBtn.appendChild(button);
    copyBtn.appendChild(dropdown);

    return copyBtn;
}

/** Пересобираем шапку страницы */
const restructureToolbarContainer = () => {
    const toolbarContainer = document.querySelector('.toolbar-container');
    const toolbarOld = document.getElementById('toolbar');
    const taskAdditionalInfo = document.querySelector('.work-packages--info-row') || undefined;

    const breadcrumb = document.getElementsByTagName('wp-breadcrumb')[0] || undefined;
    const taskNumberSpan = document.querySelector('.work-packages--info-row').getElementsByTagName('span')[0] || undefined;
    const typeAndTitle = document.querySelector('.subject-header');

    const backButton = document.getElementsByTagName('op-back-button')[0] || undefined;
    const createButton = document.getElementsByTagName('wp-create-button')[0] || undefined;
    const moreButton = document.querySelector('li.toolbar-item#action-show-more-dropdown-menu').getElementsByTagName('button')[0] || undefined;


    if (toolbarContainer && toolbarOld && breadcrumb && backButton && typeAndTitle && createButton && moreButton && taskNumberSpan && taskAdditionalInfo) {
        // Создаем кнопку "Копировать"
        const copyButton = getCopyButtonDropdown({
            [numberField]: taskNumberSpan.innerText.replace('#', ''),
            [typeField]: typeAndTitle.querySelectorAll('[data-field-name="type"]')[0].innerText,
            [titleField]:typeAndTitle.querySelectorAll('[data-field-name="subject"]')[0].innerText,
        });


        // скрываем грид-контейнер
        toolbarOld.classList.add('premium-display-none');
        // удаляем ": ", перед Автором
        taskAdditionalInfo.removeChild(taskAdditionalInfo.childNodes.item(1))
        createButton.querySelector('button').classList.remove('-primary')

        backButton.classList.add('premium-backButton');

        // создаем новый вертикальный flex вместо старого контейнера
        const newContainer = document.createElement('div');
        newContainer.classList.add('premium-toolbar-container');
        toolbarContainer.appendChild(newContainer);

        // вставляем хлебные крошки
        newContainer.appendChild(breadcrumb);

        // вставляем строку "Номер, Тип, Название"
        const taskInfoRow = document.createElement('div');
        taskInfoRow.classList.add('premium-taskInfoRow');
        taskNumberSpan.classList.add('premium-taskNumberSpan');
        taskNumberSpan.innerText = taskNumberSpan.innerText.replace('#', '')
        taskInfoRow.appendChild(taskNumberSpan);
        taskInfoRow.appendChild(typeAndTitle);
        newContainer.append(taskInfoRow);

        // вставляем строку с кнопками
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add('premium-buttonsRow');
        buttonsRow.appendChild(backButton);
        buttonsRow.appendChild(copyButton);
        buttonsRow.appendChild(createButton);
        buttonsRow.appendChild(moreButton);
        newContainer.append(buttonsRow);
    }
}

window.onload = function() {
    const interval = setInterval(() => {
        console.log('OP Premium ищет toolbar-items');
        const toolbarItemsUl = document.getElementById('toolbar-items');
        if (toolbarItemsUl) {
            console.log('OP Premium нашел toolbar-items');
            clearInterval(interval)
            restructureToolbarContainer()
        }
    }, 500)
};
