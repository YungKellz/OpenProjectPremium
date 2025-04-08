const titleField = 'title'
const typeField = 'type'
const numberField = 'number'
const linkField = 'link'
const releaseChatCombo = 'releaseChat'
const defaultCombo = 'defaultCombo'

const iconsSVGs = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><defs><style>.cls-1,.cls-2{fill:none;}.cls-1{stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.45px;}</style></defs><rect class="cls-1" x="2.47" y="3.74" width="9.65" height="12.06" rx="2.56"/><path class="cls-1" d="M14.53,12.67V5a3.66,3.66,0,0,0-3.66-3.66H5.79"/><rect class="cls-2" width="17" height="17"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><defs><style>.cls-1,.cls-2{fill:none;}.cls-1{stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.45px;}</style></defs><rect class="cls-1" x="2.47" y="3.74" width="9.65" height="12.06" rx="2.56"/><path class="cls-1" d="M14.53,12.67V5a3.66,3.66,0,0,0-3.66-3.66H5.79"/><rect class="cls-2" width="17" height="17"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><defs><style>.cls-1,.cls-2{fill:none;}.cls-1{stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.45px;}</style></defs><path class="cls-1" d="M2.72,5.7h7.79a3.87,3.87,0,1,1,0,7.74H8.36"/><polyline class="cls-1" points="5.33 2.99 2.62 5.7 5.31 8.4"/><rect class="cls-2" width="17" height="17"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.25 17"><defs><style>.cls-1{fill:none;}</style></defs><path d="M4.74,11.88,1.08,7.11a.48.48,0,0,1,.38-.78H8.79a.48.48,0,0,1,.38.78L5.51,11.88A.49.49,0,0,1,4.74,11.88Z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><defs><style>.cls-1{fill:none;}</style></defs><path d="M15.86,4.91c0,.25-.1.5-.17.75A2.93,2.93,0,0,1,15,6.92C13.89,8,12.85,9.06,11.76,10.1A3.45,3.45,0,0,1,6.92,10c-.17-.19-.31-.41-.48-.63.23-.22.43-.44.67-.63a.83.83,0,0,1,1.09.1,1.71,1.71,0,0,0,1,.48,1.69,1.69,0,0,0,1.46-.5L12.54,6.9c.36-.36.74-.72,1.09-1.1a1.62,1.62,0,0,0,.43-1.69,1.63,1.63,0,0,0-1.27-1.2,1.65,1.65,0,0,0-1.59.45L9.27,5.29A.2.2,0,0,1,9,5.35a4.28,4.28,0,0,0-2-.2L7,5.1A.71.71,0,0,0,7.1,5C8,4.09,9,3.15,9.91,2.21a3.52,3.52,0,0,1,2.12-1l.07,0h.63l.09,0A3.44,3.44,0,0,1,15.74,3.7c0,.19.08.38.12.57Z"/><path d="M10,11.84l-.09.1c-1,1-1.95,2-2.94,2.93A3.44,3.44,0,0,1,2.1,10C3.14,9,4.18,7.92,5.25,6.89a3.43,3.43,0,0,1,5.25.69l.05.1c-.21.2-.41.42-.64.6a.83.83,0,0,1-1.1-.09A1.7,1.7,0,0,0,7.57,7.7a1.65,1.65,0,0,0-1.2.49l-3,3a1.73,1.73,0,0,0,2.43,2.45l1.94-1.94A.22.22,0,0,1,8,11.64a3.93,3.93,0,0,0,1.92.2Z"/></svg>',
]
const getIcon = (index, short) => {
    const copyIcon = document.createElement('div')
    copyIcon.style.width = short ? '10px' : '17px';
    copyIcon.style.height = '17px';
    copyIcon.style.display = 'flex';
    copyIcon.innerHTML = iconsSVGs[index]
    return copyIcon
}

const getCopyIcon = () => getIcon(0)
const getDotsIcon = () => getIcon(1, true)
const getBackIcon = () => getIcon(2)
const getDropdownIcon = () => getIcon(3, true)
const getLinkIcon = () => getIcon(4)



const getCopyNotifier = () => {
    const notifier = document.createElement('div');
    notifier.classList.add('premium-copy-notifier');
    notifier.setAttribute('id', 'premium-copy-notifier');
    notifier.innerText = 'скопировано'
    return notifier;
}

const scrollToTop = () => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = '-20px';
    div.style.width = '1px';
    div.style.height = '1px';
    const s = document.querySelector('.premium-toolbar-container')
    s.style.position = 'relative';
    document.querySelector('.premium-toolbar-container').appendChild(div);
    div.scrollIntoView()
}

const showCopyNotifier = (targetNode) => {
    const copyNotifier = getCopyNotifier()
    targetNode.append(copyNotifier);
    copyNotifier.classList.add('premium-copy-notifier-show')
    setTimeout(() => {
        copyNotifier.remove();
    }, 1500)
}

const copyToClipboard = (value, targetId) => (event) => {
    navigator.clipboard.writeText(value)
    showCopyNotifier(targetId ? document.getElementById(targetId) : event.target)
}

const optionsOrders = [
    [numberField, titleField, linkField],
    // [numberField, typeField, titleField, linkField],
    [releaseChatCombo],
]

const getCopyOptionValue = (values, order) => {
    const { number, type, title, mrList = [] } = values
    const mergedList = mrList.filter((s) => s.merged).map((s) => s.htmlUrl).join(`\n`);
    const openList = mrList.filter((s) => !s.merged).map((s) => s.htmlUrl).join(`\n`);

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
            case releaseChatCombo:
                if (type && number && title && mrList.length)
                    result += `${type} ${number} ${title}\nhttps://project.rosatom.local/wp/${number}${mergedList ? `\n\nmerged\n${mergedList}` : ''}${openList ? `\n\n${openList}` : ''}
                    `
                break
            default:
                break
        }
    })
    return result.trim()
}

const getCopyOptionLabel = (order) => {
    let result = []
    order.forEach(field => {
        switch (field) {
            case titleField:
                result.push('Заголовок')
                break
            case typeField:
                result.push('Тип')
                break
            case numberField:
                result.push('Номер')
                break
            case linkField:
                result.push('Ссылка')
                break
            case releaseChatCombo:
                result.push('Для релизного чата')
                break
            default:
                break
        }
    })
    const last = result.pop()

    return order.length > 1 ? `${result.join(', ')} и ${last}` : last
}

const appendCopyOption = async (dropdown, values, order) => {
    const comboValues = values
    if (order.includes(releaseChatCombo) && checkProject()) {
        const res = await getTaskGitlabData(values.number)
        comboValues.mrList = res.map(({ htmlUrl, merged }) => ({ htmlUrl, merged }))
    }
    const copyOption = document.createElement('div')
    dropdown.appendChild(copyOption);
    copyOption.classList.add('premium-dropdown-option');
    copyOption.innerText = getCopyOptionLabel(order)
    copyOption.title = getCopyOptionValue(comboValues, order)
    copyOption.onclick = copyToClipboard(getCopyOptionValue(comboValues, order), 'premium-copyDropdownContainer')
    if (comboValues.mrList.length === 0) copyOption.remove()
}

const getCopyButtonDropdown = (values) => {
    const copyBtnContainer = document.createElement('div');
    copyBtnContainer.classList.add('premium-btn');
    copyBtnContainer.classList.add('premium-copy-btn');
    copyBtnContainer.setAttribute('id', 'premium-copyDropdownContainer');

    const dropdownClick = () => {
        document.getElementById("premiumCopyBtnDropdownContentId").classList.toggle("premium-show-copy-dropdown")
    }

    window.onclick = function(event) {
        if (!event.target.matches('.premium-copy-btn-button')) {
            const dropdown = document.getElementById("premiumCopyBtnDropdownContentId");
            if (dropdown.classList.contains('premium-show-copy-dropdown')) {
                dropdown.classList.remove('premium-show-copy-dropdown');
            }
        }
    }

    const button = document.createElement('button');
    button.classList.add('button');
    button.classList.add('premium-copy-btn-button');
    button.append(getDropdownIcon());
    button.onclick = dropdownClick;

    const dropdown = document.createElement('div');
    dropdown.classList.add('premium-copy-btn-dropdown-content')
    dropdown.setAttribute('id', 'premiumCopyBtnDropdownContentId')

    optionsOrders.forEach(order => {
        appendCopyOption(dropdown, values, order)
    })

    copyBtnContainer.appendChild(button);
    copyBtnContainer.appendChild(dropdown);

    return copyBtnContainer;
}

const getCopyBtns = (values) => {
    const copyBtnsContainer = document.createElement('div');
    copyBtnsContainer.classList.add('premium-copy-btns-container');
    copyBtnsContainer.setAttribute('id','premium-copy-btns-container');

    const copyNumberButton = document.createElement('div');
    const copyNumberButtonBtn = document.createElement('button');
    copyNumberButton.append(copyNumberButtonBtn)
    copyBtnsContainer.append(copyNumberButton)
    const copyDefaultValue = `${values.number} ${values.type} ${values.title} (https://project.rosatom.local/wp/${values.number})`
    copyNumberButtonBtn.classList.add('button');
    copyNumberButtonBtn.innerHTML = 'Копировать';
    copyNumberButtonBtn.onclick = copyToClipboard(copyDefaultValue)
    copyNumberButton.classList.add('premium-btn');
    copyNumberButton.classList.add('premium-copy-btns-first');
    copyNumberButton.title = copyDefaultValue;


    // const copyTitleButton = document.createElement('div');
    // const copyTitleButtonBtn = document.createElement('button');
    // copyTitleButton.append(copyTitleButtonBtn)
    // copyBtnsContainer.append(copyTitleButton)
    // copyTitleButtonBtn.classList.add('button');
    // copyTitleButtonBtn.innerHTML = `<span class="premium-copy-btns-title">${values.title}</span>`;
    // copyTitleButtonBtn.onclick = copyToClipboard(values.title)
    // copyTitleButton.classList.add('premium-btn');
    // copyTitleButton.classList.add('premium-copy-btns-middle-one');
    // copyTitleButton.title = "Копировать заголовок задачи";


    const copyLinkButton = document.createElement('div');
    const copyLinkButtonBtn = document.createElement('button');
    copyLinkButton.append(copyLinkButtonBtn)
    copyBtnsContainer.append(copyLinkButton)
    copyLinkButtonBtn.classList.add('button');
    copyLinkButtonBtn.classList.add('premium-copy-btn-link');
    copyLinkButtonBtn.append(getLinkIcon());
    copyLinkButtonBtn.onclick = copyToClipboard(`https://project.rosatom.local/wp/${values.number}`)
    copyLinkButton.classList.add('premium-btn');
    copyLinkButton.classList.add('premium-copy-btns-middle-one');
    copyLinkButton.title = "Копировать ссылку на объект";

    const dropDownBtn = getCopyButtonDropdown(values)
    dropDownBtn.classList.add('premium-copy-btns-last');
    copyBtnsContainer.append(dropDownBtn)

    return copyBtnsContainer;
}



/** Пересобираем шапку страницы */
const restructureToolbarContainer = () => {
    const toolbarContainer = document.querySelector('.toolbar-container');
    const toolbarOld = document.getElementById('toolbar');
    const taskAdditionalInfo = document.querySelector('.work-packages--info-row') || undefined;

    const breadcrumb = document.getElementsByTagName('wp-breadcrumb')[0] || undefined;
    const taskNumberSpan = document.querySelector('.work-packages--info-row').getElementsByTagName('span')[0] || undefined;
    const statusSelect = document.querySelector('.wp-info-wrapper').getElementsByTagName('wp-status-button')[0] || undefined;
    const typeAndTitle = document.querySelector('.subject-header');

    const backButton = document.getElementsByTagName('op-back-button')[0] || undefined;
    const createButton = document.getElementsByTagName('wp-create-button')[0] || undefined;
    const watchButton = document.querySelector('li.toolbar-item#action-show-more-dropdown-menu').getElementsByTagName('button')[0] || undefined;
    const moreButton = document.getElementsByTagName('wp-watcher-button')[0] || undefined;


    if (statusSelect && toolbarContainer && toolbarOld && breadcrumb && backButton && typeAndTitle && createButton && moreButton && taskNumberSpan && taskAdditionalInfo) {

        const copyBtns = getCopyBtns({
            [numberField]: taskNumberSpan.innerText.replace('#', ''),
            [typeField]: typeAndTitle.querySelectorAll('[data-field-name="type"]')[0].innerText,
            [titleField]:typeAndTitle.querySelectorAll('[data-field-name="subject"]')[0].innerText,
        });


        // скрываем грид-контейнер
        toolbarOld.classList.add('premium-display-none');
        // удаляем ": ", перед Автором
        taskAdditionalInfo.removeChild(taskAdditionalInfo.childNodes.item(1))
        // удаляем зеленый цвет кнопки создать
        createButton.querySelector('button').classList.remove('-primary')
        // заголовок до конца страницы чтобы не скукоживался
        typeAndTitle.style.flexGrow = '2';

        statusSelect.classList.add('premium-status-select');

        backButton.classList.add('premium-btn');
        backButton.querySelector('button').innerHTML = "";
        backButton.querySelector('button').appendChild(getBackIcon());

        createButton.classList.add('premium-btn');
        createButton.querySelector('.spot-icon_add').classList.add('premium-display-none');
        createButton.querySelector('.spot-icon_dropdown').classList.add('premium-display-none');
        createButton.querySelector('button').appendChild(getDropdownIcon());

        const watchButtonCon = document.createElement('div')
        watchButtonCon.append(watchButton);
        watchButtonCon.classList.add('premium-btn');

        const moreButtonCon = document.createElement('div')
        moreButtonCon.append(moreButton);
        moreButtonCon.classList.add('premium-btn');
        // moreButtonCon.querySelector('button').innerHTML = "";
        // moreButton.querySelector('button').appendChild(getDotsIcon());

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
        buttonsRow.setAttribute('id', 'premium-buttonsRow');
        buttonsRow.appendChild(statusSelect);
        // buttonsRow.appendChild(backButton);
        // buttonsRow.appendChild(copyButton);
        buttonsRow.appendChild(copyBtns);
        buttonsRow.appendChild(createButton);
        buttonsRow.appendChild(moreButtonCon);
        buttonsRow.appendChild(watchButtonCon);
        newContainer.append(buttonsRow);

        scrollToTop()
    }
}

window.onload = function() {
    setInterval(() => {
        const toolbarItemsUl = document.getElementById('toolbar-items');
        if (toolbarItemsUl) {
            const isPremiumInserted = Boolean(document.getElementById('premium-copy-btns-container'));
            if (!isPremiumInserted) {
                restructureToolbarContainer()
                // replaceTaskBody()
                reworkBreadcrumbs()
                placeGitlabLinks()
                reworkHeader()
                reworkChildrenTable()
            }
        }
    }, 500)
};
