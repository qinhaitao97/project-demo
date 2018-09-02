
function filterCombine(obj, list) {
    return function () {
        var lastArr = list;
        for (var prop in obj) {
            lastArr = obj[prop](store.getStatus()[prop], lastArr);
        }
        return lastArr;
    }
}
var lastFilter = filterCombine({text: filterByText, type: filterByType}, food);