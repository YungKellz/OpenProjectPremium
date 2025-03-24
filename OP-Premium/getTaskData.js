const getTaskData = async (taskNumber) => {
    const s = await fetch(`https://project.rosatom.local/api/v3/queries/default?valid_subset=true&columns%5B%5D=id&columns%5B%5D=subject&columns%5B%5D=type&columns%5B%5D=status&columns%5B%5D=assignee&columns%5B%5D=version&columns%5B%5D=category&columns%5B%5D=customField945&columns%5B%5D=startDate&columns%5B%5D=dueDate&columns%5B%5D=customField161&showSums=false&timelineVisible=false&highlightingMode=inline&highlightedAttributes%5B%5D=%2Fapi%2Fv3%2Fqueries%2Fcolumns%2Fstatus&highlightedAttributes%5B%5D=%2Fapi%2Fv3%2Fqueries%2Fcolumns%2Fpriority&highlightedAttributes%5B%5D=%2Fapi%2Fv3%2Fqueries%2Fcolumns%2FdueDate&includeSubprojects=true&showHierarchies=false&groupBy=&filters=%5B%7B%22parent%22%3A%7B%22operator%22%3A%22%3D%22%2C%22values%22%3A%5B%22${taskNumber}%22%5D%7D%7D%5D&sortBy=%5B%5B%22id%22%2C%22asc%22%5D%5D&timestamps=PT0S`)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => JSON.parse(new TextDecoder().decode(arrayBuffer).replace(/]\[/g, ',')))

    return {
        id: taskNumber,
        children: s._embedded.results._embedded.elements.map((d) => ({ id: d.id, title: d.subject }))
    }
}