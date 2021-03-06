function stringToDate(str) {
    const [day, month, year] = str.split('/');
    var tempDate = new Date(year, month - 1, day);
    return tempDate;
}

function sortDates(arr, prop, asc) {
    arr = arr.sort(function(a, b) {
        if (asc) {
            if (a[prop] !== null) {
                var aDate = stringToDate(a[prop]).getTime();
            } else {
                return 1;
            }
            if (b[prop] !== null) {
                var bDate = stringToDate(b[prop]).getTime();
            } else {
                return -1;
            }
            return aDate < bDate ? -1 : 1;
        } else {
            if (b[prop] !== null) {
                var bDate = stringToDate(b[prop]).getTime();
            } else {
                return 1;
            }
            if (a[prop] !== null) {
                var aDate = stringToDate(a[prop]).getTime();
            } else {
                return -1;
            }
            return aDate < bDate ? 1 : -1;
        }
    });
    return arr;
}

function sortResults(arr, prop, asc) {
    arr = arr.sort(function(a, b) { 
        if (asc) {
            if (a[prop] > b[prop]) return 1;
            if (a[prop] < b[prop]) return -1;
            return 0;
        } else {
            if (b[prop] > a[prop]) return 1;
            if (b[prop] < a[prop]) return -1;
            return 0;
        }
    });
    return arr;
}

function filterDate(arr) {
    var today = new Date();
    today.setHours(0,0,0,0);
    var returnArr = arr.filter(function (el) {

        if (el.dataLimite === null) {
            return el;
        } else {
            const [day, month, year] = el.dataLimite.split('/');
            var tempDate = new Date(year, month - 1, day);

            if (tempDate.getTime() >= today.getTime()) {
                return el;
            }
        }
        
    });
    return returnArr;
}

function filterArray(arr, field, term) {
    var returnArr = arr.filter(function(el) {
        return el[field] === term;
    });
    return returnArr;
}

Handlebars.registerHelper('toLowerCase', function(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'-').toLowerCase();
});

Handlebars.registerHelper('highlightDate', function(str) {
    var tempDate = new Date();

    if (str === null) {
        return 'Sem data limite'
    } else  {
        if (str == tempDate.toLocaleDateString('pt-BR')) {
            return '<span class="highlight-date">Inscrições até hoje</span>';
        } else {
            return 'Inscrições até ' + str;
        }
    }
});