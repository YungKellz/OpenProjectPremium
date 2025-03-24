const descGroup = () => document.querySelector('.description-group')

const reAppendReadOnly = () => {
    const interval = setInterval(() => {
        const readonlyContent = descGroup().querySelector('.read-value--html')
        if (readonlyContent) {
            descGroup().append(readonlyContent || '')
            clearInterval(interval)
        }
    }, 10)
}
const removeReadOnly = () => {
    const readonlyContent = descGroup().querySelector('.read-value--html')
    readonlyContent.remove()
}

const addOnClickForTriggerSpan = () => {
    const triggerSpan = document.querySelector('.description-group').querySelector('[data-field-name="description"]')

    triggerSpan.onclick = () => {
        removeReadOnly()
        setTimeout(() => {

            const saveBtn = descGroup().querySelector('[title="Описание: Отменить"]')
            const cancelBtn = descGroup().querySelector('[title="Описание: Сохранить"]')

            saveBtn.onclick = () => {
                setTimeout(() => {
                    addOnClickForTriggerSpan()
                    reAppendReadOnly()
                },1)
            }
            cancelBtn.onclick = () => {
                setTimeout(() => {
                    addOnClickForTriggerSpan()
                    reAppendReadOnly()
                }, 1)
            }
        }, 1)
    }
}

const replaceTaskBody = () => {
    const triggerSpan = descGroup().querySelector('[data-field-name="description"]')


    addOnClickForTriggerSpan()

    if (descGroup() && triggerSpan) {
        reAppendReadOnly()
    }
}