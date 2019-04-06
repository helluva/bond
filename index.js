

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
        description: "Head over to the CRC and climb with some bros!",
    }, {
        id: "shoothooch",
        name: "Shoot the Hooch",
        description: "Come raft the Chattahoochee!"
    }, {
        id: "lasertag",
        name: "Laser Tag",
        description: "It's tag, but with lasers.",
    }, {
        id: "bravesgame",
        name: "Braves game",
        description: "Baseball game.",
    }, {
        id: "concert",
        name: "Find a local concert",
        description: "Get together with your group and find an artist you'd like to see perform!",
    }, {
        id: "daveandbusters",
        name: "Dave and Busters",
        description: "Play games of skill!",
    },
]

var peopleToInt = {}

var eventToInt = {}

function pageDidLoad() {
    for (var person of people) {
        console.log(person)
        $("#entries").append(rowForPerson(person));
    }
}

function pageDidLoadEvents() {
    for (var event of events) {
        console.log(event)
        $("#entries").append(rowForEvent(event));
    }
}


function valueSelected(button) {
	if (Object.keys(peopleToInt).length > 0) {
		var buttonId = $(button).attr("id")
    var eventId = buttonId.split("-")[0]

    for (var buttonToReset of ["1", "2", "3", "4", "5"]) {
        var resetId = "#" + eventId + "-" + buttonToReset
        $(resetId).attr("class", "attribute-button unselected")
    }
    
    $(button).attr("class", "attribute-button selected")
    testSelectEvent(eventId)
	} else {
    var buttonId = $(button).attr("id")
    var personId = buttonId.split("-")[0]

    for (var buttonToReset of ["1", "2", "3", "4", "5"]) {
        var resetId = "#" + personId + "-" + buttonToReset
        $(resetId).attr("class", "attribute-button unselected")
    }
    
    $(button).attr("class", "attribute-button selected")
    testSelectPeople(personId)
  }
}

function testSelectPeople(personId) {
	for (var i of [1, 2, 3, 4, 5]) {
		var b = "#" + personId + "-" + i
		if ($(b).attr("class") === "attribute-button selected") {
			peopleToInt[personId] = i 
		}
	}
}

function testSelectEvent(eventId) {
	for (var i of [1, 2, 3, 4, 5]) {
		var b = "#" + eventId + "-" + i
		if ($(b).attr("class") === "attribute-button selected") {
			eventToInt[eventId] = i 
		}
	}
}

function formSubmitted() {
		$("#entries").empty()
		if (Object.keys(eventToInt).length > 0){
			updatePageName("Group Name", "These are the groups placeholders")
			//add a pageloader here
		} else if (Object.keys(peopleToInt).length > 0) {
			updatePageName("This Month's Events", "Rate how much you'd like to " +
				"participate in each event.")
			pageDidLoadEvents()
		}
}

function updatePageName(title, subtitle) {
		$('#step-name').text(title)
		$('#step-instructions').text(subtitle)
    
}

function rowForPerson(person) {
    return `
        <div class="entry" id="${person.id}">
            <div class="info">
                <img class="image" src="images/${person.id}.jpg">
                <div class="name">${person.name}</div>
                <div class="subtitle">${person.year} · ${person.major} major</div>
            </div>
            <div class="rating">
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

function rowForEvent(event) {
    return `
        <div class="entry" id="${event.id}">
            <div class="info">
                <img class="image" src="images/${event.id}.jpg">
                <div class="name">${event.name}</div>
                <div class="subtitle">${event.description}</div>
            </div>
            <div class="rating">
                <span class="small">Not close</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-1">1</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-2">2</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-3">3</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-4">4</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-5">5</span>
                <span class="small">Very close</span>
                </div>
            </div>
        </div>`
}