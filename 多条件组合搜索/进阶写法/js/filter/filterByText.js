
function filterByText(text, list) {
    return list.filter(function (ele, index) {
        if (ele.name.indexOf(text) != -1) {
            return true;
        }
    });
}

