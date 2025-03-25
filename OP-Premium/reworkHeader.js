const reworkHeader = () => {
    const tb = document.querySelector('.toolbar-container')
    const content = document.getElementById('content')
    content.prepend(tb)
}