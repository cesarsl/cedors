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

Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
});

$(document).ready(function() {
    $.getJSON('https://api.sheety.co/9dc03903-6ddb-4116-9ccd-6978675aac5b', function(data) {
        var template = Handlebars.compile($('#item-template').html())
        $('#content').html(template(sortDates(data, 'dataLimite', true)))
    })
})