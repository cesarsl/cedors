function sortDates(arr, prop, asc) {
    arr = arr.sort(function(a, b) {
        aDate = new Date(a[prop]).getTime()
        bDate = new Date(b[prop]).getTime()
        if (asc) {
            if (aDate > bDate) return 1;
            if (aDate < bDate) return -1;
            return 0;
        } else {
            if (bDate > aDate) return 1;
            if (bDate < aDate) return -1;
            return 0;
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
        const [day, month, year] = el.dataLimite.split('/');
        var tempDate = new Date(year, month - 1, day);

        if (tempDate.getTime() >= today.getTime()) {
            return el;
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
    return str.toLowerCase();
});

Handlebars.registerHelper('highlightDate', function(str) {
    var tempDate = new Date();

    if (str == tempDate.toLocaleDateString('pt-BR')) {
        return '<span class="highlight-date">Inscrições até hoje</span>';
    } else {
        return 'Inscrições até ' + str;
    }
});

$(document).ready(function() {
    $.getJSON('https://api.sheety.co/9dc03903-6ddb-4116-9ccd-6978675aac5b', function(data) {
        var template = Handlebars.compile($('#item-template').html());
        var sorted = sortDates(data, 'dataLimite', true);
        var filtered = filterDate(sorted);
        $('#content').html(template(filtered));
    })
})