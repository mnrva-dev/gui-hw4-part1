// Author: Gabe Farrell
// Sources: jquery validate documentation https://jqueryvalidation.org/validate/

// prepare form input variables
var data = []
const form = document.getElementById('form')
const mdl = document.getElementById('md-l')
const mdu = document.getElementById('md-u')
const mrl = document.getElementById('mr-l')
const mru = document.getElementById('mr-u')
const errdisplay = document.getElementById('err')

// make sure the page doesnt refresh on submit
form.addEventListener('submit', (e) => {
    e.preventDefault()
})

$.validator.addMethod("greaterThan",
    function (value, element, param) {
          var $otherElement = $(param);
          return parseInt(value) > parseInt($otherElement.val());
    }
);

$("#form").validate({
    // all lower values must be min -50 max 49, and all upper values must be greater than the lower but max 50
    rules: {
        multiplicand_lower: {
            required: true,
            min: -50,
            max: 49,
        },
        multiplicand_upper: {
            required: true,
            max: 50,
            greaterThan: '#md-l'
        },
        multiplier_lower: {
            required: true,
            min: -50,
            max: 49,
        },
        multiplier_upper: {
            required: true,
            max: 50,
            greaterThan: '#mr-l'
        },
    },
    messages: {
        multiplicand_upper: {
            greaterThan: 'Multiplicand upper value must be greater than lower value'
        },
        multiplier_upper: {
            greaterThan: 'Multiplier upper value must be greater than lower value'
        }
    },
    submitHandler: (form) => {
        submitForm()
    },
    errorElement: "div"
})


/* ------------------- FUNCTIONS ------------------- */

// main form submission handler
function submitForm() {
    
    // prepare table element
    var table = document.createElement('table')
    table.setAttribute('id', 'table')
    table.setAttribute('class', 'table')
    document.getElementById('table-container').innerHTML = ''
    document.getElementById('table-container').appendChild(table)

    // create first row (label row)
    let row = document.createElement('tr')
    for (j = parseInt(mrl.value) - 1; j <= parseInt(mru.value); j++) {
        let h = document.createElement('th')
        if (j == parseInt(mrl.value) - 1) {
            // top left corner element is empty
            h.innerHTML = ' '
            row.appendChild(h)
            continue
        }
        h.innerHTML = j
        row.appendChild(h)
    }

    // add label row to table
    table.appendChild(row)

    // create the rest of the rows in the table
    for (i = parseInt(mdl.value); i <= parseInt(mdu.value); i++) {
        let row = document.createElement('tr')
        let h = document.createElement('th')
        h.innerHTML = i
        row.appendChild(h)
        for (j = parseInt(mrl.value); j <= parseInt(mru.value); j++) {
            let point = document.createElement('td')
            point.innerHTML = i * j
            row.appendChild(point)
        }
        table.appendChild(row)
    }
}