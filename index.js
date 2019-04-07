

// States

var current_step = MEMBERSHIP_SURVEY
var MEMBERSHIP_SURVEY = "MEMBERSHIP_SURVEY"
var EVENT_PREFERENCES = "EVENT_PREFERENCES"
var FINAL_DECISION = "FINAL_DECISION" 


// Step Setup

function displayPeople() {
    current_step = MEMBERSHIP_SURVEY
    $("#entries").empty()
    
    updatePageName(
        "Membership Survey", 
        "Rate how close you are with other members of the organization.")
    
    for (var person of people) {
        $("#entries").append(rowForPerson(person));
    }
}

function displayEvents() {
    current_step = EVENT_PREFERENCES
    $("#entries").empty()
    
    updatePageName(
        "This Month's Events", 
        "Rate how much you'd like to participate in each event.")
    
    for (var event of events) {
        $("#entries").append(rowForEvent(event));
    }
}

function displayFinalDecision() {
    current_step = FINAL_DECISION
    $("#entries").empty()
    $("#submitButtonContainer").empty()
    
    updatePageName(
        "Your Event", 
        "We’ve matched you with a group of members for you to get to know better!")
}


// User Interaction

function valueSelected(button) {
    var buttonId = $(button).attr("id")
    var entryId = buttonId.split("-")[0]
    var buttonValue = parseInt(buttonId.split("-")[1])

    // reset all of the other buttons to unselected
    for (var buttonToReset of ["1", "2", "3", "4", "5"]) {
        var resetId = "#" + entryId + "-" + buttonToReset
        $(resetId).attr("class", "attribute-button unselected")
    }
    
    // mark this button as selected
    $(button).attr("class", "attribute-button selected")
    
    // update the relevant model object
    if (current_step === MEMBERSHIP_SURVEY) {
        var person = people.find(function(p) { p.id === entryId })
        person.closenessRating = buttonValue
        
    } else if (current_step === EVENT_PREFERENCES) {
        var event = events.find(function(e) { e.id === entryId })
        event.preferenceRating = buttonValue
    }
}


function formSubmitted() {
    window.scrollTo(0, 0)
    
    if (current_step === MEMBERSHIP_SURVEY) {
        displayEvents();
    } else if (current_step === EVENT_PREFERENCES) {
        displayFinalDecision()
    }
}

    
// Helpers
    
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
                <span class="small">Not interested</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-1">1</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-2">2</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-3">3</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-4">4</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${event.id}-5">5</span>
                <span class="small">Very interested</span>
                </div>
            </div>
        </div>`
}