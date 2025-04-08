const reworkChildrenTable = () => {
    const tableContainer = document.querySelector('[data-group-name="Дочерние элементы"]')
    window.console.log('tableContainer', tableContainer)
    if (tableContainer) {
        const checkIfLoaded = () => {
            const createLine = document.querySelector('[wpinlinecreate]')
            if (createLine) {
                window.console.log('tableContainer Id', tableContainer.querySelector('.wp-table--cell-td .id'))

            } else {
                window.console.log('wassap beijin')
                setTimeout(() => {
                    checkIfLoaded()
                }, 1000)
            }
        }
        checkIfLoaded()
    }
}