

var people = [
    {
        id: "calstephens",
        name: "Cal Stephens",
        year: "4th Year",
        major: "Computer Science"
    }, {
        id: "premsakala",
        name: "Prem Sakala",
        year: "2nd Year",
        major: "Computer Science"
    }, {
        id: "andrewvincent",
        name: "Andrew Vincent",
        year: "4th Year",
        major: "Business"
    }, {
        id: "jaredraiola",
        name: "Jared Raiola",
        year: "2nd Year",
        major: "Computer Science"
    }, {
        id: "kailashnagapudi",
        name: "Kailash Nagapudi",
        year: "4th Year",
        major: "BME"
    }, {
        id: "craigschwartz",
        name: "Craig Schwartz",
        year: "4th Year",
        major: "MSE"
    }, {
        id: "giancarlovargas",
        name: "Giancarlo Vargas",
        year: "4th Year",
        major: "Chemical Engineer"
    }, {
        id: "walkerbyrnes",
        name: "Walker Byrnes",
        year: "4th Year",
        major: "Mechanical Engineering"
    }, {
        id: "jaleenwalker",
        name: "Jaleen Walker",
        year: "3rd Year",
        major: "Computer Science"
    }, {
        id: "jackconway",
        name: "Jack Conway",
        year: "4th Year",
        major: "LMC"
    },
]

var events = [
    {
        id: "rockclimbing",
        name: "Rock Climbing",
        description: "--",
    }, {
        id: "shoothooch",
        name: "Shoot the Hooch",
        description: "--"
    }, {
        id: "lasertag",
        name: "Laser Tag",
        description: "--",
    }, {
        id: "bravesgame",
        name: "Braves game",
        description: "--",
    }, {
        id: "concert",
        name: "Find a local Concert",
        description: "--",
    }, {
        id: "daveandbusters",
        name: "Dave and Busters",
        description: "--",
    },
]

function pageDidLoad() {
    for (var person of people) {
        console.log(person)
        $("#people").append(rowForPerson(person));
    }
}


function valueSelected(button) {
    var buttonId = $(button).attr("id")
    var personId = buttonId.split("-")[0] 
    
    for (var buttonToReset of ["1", "2", "3", "4", "5"]) {
        var resetId = "#" + personId + "-" + buttonToReset
        $(resetId).attr("class", "attribute-button unselected")
    }
    
    $(button).attr("class", "attribute-button selected")
}

function formSubmitted() {
    
}


function rowForPerson(person) {
    return `
        <div class="person" id="${person.id}">
            <div class="person-info">
                <img class="person-image" src="https://avatars0.githubusercontent.com/u/1811727?s=400&u=279b27062312934b6cd885cadfe011d74e7be01c&v=4">
                <div class="person-name">${person.name}</div>
                <div class="person-subtitle">${person.year} · ${person.major} major</div>
            </div>
            <div class="person-rating">
                <span class="small">Not close</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${person.id}-1">1</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${person.id}-2">2</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${person.id}-3">3</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${person.id}-4">4</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${person.id}-5">5</span>
                <span class="small">Very close</span>
                </div>
            </div>
        </div>`
}