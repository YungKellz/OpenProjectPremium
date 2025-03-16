const svg = {
    merged: `<svg _ngcontent-ng-c1779735674="" op-gitlab-merge-request-merged-icon="" size="small" role="img" fill="currentColor" id="" tabindex="-1" aria-label="" aria-labelledby="" aria-hidden="true" focusable="false" viewBox="0 0 16 16" height="16" width="16" class="octicon" style="display: inline-block; overflow: visible; user-select: none; vertical-align: text-bottom;"><!----><path d="M5.456 5.81v.001A4.253 4.253 0 0 0 9.12 8.733a2.5 2.5 0 1 1-.01 1.504 5.734 5.734 0 0 1-3.86-1.864v1.741a2.501 2.501 0 1 1-1.5 0V5.886a2.5 2.5 0 1 1 1.706-.076ZM11.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-6 2a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm0-9a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"></path><!----></svg>`,
    open: `<svg _ngcontent-ng-c1779735674="" op-gitlab-merge-request-ready-icon="" size="small" role="img" fill="currentColor" id="" tabindex="-1" aria-label="" aria-labelledby="" aria-hidden="true" focusable="false" viewBox="0 0 16 16" height="16" width="16" class="octicon" style="display: inline-block; overflow: visible; user-select: none; vertical-align: text-bottom;"><!----><path d="M6 12.5a2.5 2.5 0 1 1-3.25-2.386V5.886a2.501 2.501 0 1 1 1.5 0v4.228A2.501 2.501 0 0 1 6 12.5Zm4.34-11.28a.75.75 0 0 1 0 1.06l-.47.47h.63a2.75 2.75 0 0 1 2.75 2.75v4.614a2.501 2.501 0 1 1-1.5 0V5.5c0-.69-.56-1.25-1.25-1.25h-.63l.47.47a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L7.53 4.03 7 3.5l.53-.53 1.75-1.75a.75.75 0 0 1 1.06 0ZM13.5 12.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-9 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm0-9a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"></path><!----></svg><!----><path d="M5.456 5.81v.001A4.253 4.253 0 0 0 9.12 8.733a2.5 2.5 0 1 1-.01 1.504 5.734 5.734 0 0 1-3.86-1.864v1.741a2.501 2.501 0 1 1-1.5 0V5.886a2.5 2.5 0 1 1 1.706-.076ZM11.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-6 2a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm0-9a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"></path><!----></svg>`
}

const getGLIcon = (type = 'open') => {
    const ic = document.createElement('div')
    ic.innerHTML = svg[type];
    return ic
}


const getGitlabList = async (taskNumber) => {
    const result = fetch(`https://project.rosatom.local/api/v3/work_packages/${taskNumber}/gitlab_merge_requests`)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => JSON.parse(new TextDecoder().decode(arrayBuffer).replace(/]\[/g, ',')));
    return (await result)._embedded.elements.map((el) => ({
        repository: el.repository,
        htmlUrl: el.htmlUrl,
        merged: el.merged,
        title: el.title,
        number: el.number,
    }));
}

const placeGitlabLinks = async () => {
    const taskNumber = document.querySelector('.premium-taskNumberSpan')?.innerHTML;
    if (taskNumber) {
        const mrList = await getGitlabList(taskNumber);
        const toolbarButtonsRow = document.getElementById('premium-buttonsRow');

        const container = document.createElement('div')
        toolbarButtonsRow.append(container);
        container.setAttribute('id', 'gitlabInfoContainer');

        mrList.forEach(({ repository, htmlUrl, merged, title, number }) => {
            const mrBlock = document.createElement('div')
            container.append(mrBlock);
            mrBlock.classList.add('mr-block');
            mrBlock.title = `Открыть №${number} "${title}"`;
            mrBlock.innerHTML = repository;
            mrBlock.prepend(getGLIcon(merged ? 'merged' : 'open'));
            if (merged) mrBlock.classList.add('merged');
            mrBlock.onclick = () => {
                window.open(htmlUrl, '_blank');
            };
        })
    }
}
