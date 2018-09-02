
function filterByType(type, list) {
    if (type == 'all') {
        return list;
    } else {
        return list.filter(function (ele, index) {
            if (ele.type == type) {
                return true;
            }
        });
    }
}