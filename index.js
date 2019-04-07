

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
        $("#entries").append(ratingRowForPerson(person));
    }
}

function displayEvents() {
    current_step = EVENT_PREFERENCES
    $("#entries").empty()
    
    updatePageName(
        "This Month's Events", 
        "Rate how much you'd like to participate in each event.")
    
    for (var event of events) {
        $("#entries").append(ratingRowForEvent(event));
    }
}

function displayFinalDecision() {
    current_step = FINAL_DECISION
    $("#entries").empty()
    $("#submitButtonContainer").empty()
    
    updatePageName(
        "Your Event", 
        "We’ve matched you with a group of members for you to get to know better!")
    
    // randomly choose one of the highest-preferred events
    shuffle(events)
    events.sort((lhs, rhs) => preferenceRating(lhs) < preferenceRating(rhs))
    var event = events[0]
    
    // randomly choose the five least-close members
    shuffle(people)
    people.sort((lhs, rhs) => closenessRating(lhs) > closenessRating(rhs))
    var peopleForEvent = people.slice(0, 5)
    
    // render the page
    $("#entries").append(listRowForEvent(event));
    
    $("#entries").append(`
        <div class="title" style="padding-bottom:20px; margin-top: 15px;">Also in your Group</div>
    `)
    
    for (var person of peopleForEvent) {
        $("#entries").append(listRowForPerson(person));
    }
    
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
        var person = people.find((p) => p.id === entryId)
        person.closenessRating = buttonValue
        
    } else if (current_step === EVENT_PREFERENCES) {
        var event = events.find((e) => e.id === entryId)
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


// Rating Row

function ratingRowForPerson(person) {
    return ratingRow(
        person.id, 
        person.name, 
        `${person.year} · ${person.major}`,
        "Not close", 
        "Very close")
}

function ratingRowForEvent(event) {
    return ratingRow(
        event.id, 
        event.name, 
        event.description, 
        "Not interested", 
        "Very interested")
}

function ratingRow(id, name, description, lowRatingText, highRatingText) {
    return `
        <div class="entry" id="${id}">
            <div class="info">
                <img class="image" src="images/${id}.jpg">
                <div class="name">${name}</div>
                <div class="subtitle">${description}</div>
            </div>
            <div class="rating">
                <span class="small">${lowRatingText}</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${id}-1">1</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${id}-2">2</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${id}-3">3</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${id}-4">4</span>
                <span class="attribute-button unselected" onclick="valueSelected(this)" id="${id}-5">5</span>
                <span class="small">${highRatingText}</span>
                </div>
            </div>
        </div>`
}


// List Row

function listRowForPerson(person) {
    return listRow(
        person.id, 
        person.name, 
        `${person.year} · ${person.major}`)
}

function listRowForEvent(event) {
    return listRow(
        event.id, 
        event.name, 
        event.description)
}

function listRow(id, name, description,) {
    return `
        <div class="info" style="padding: 5px; margin-left: 15px;">
            <img class="image" src="images/${id}.jpg">
            <div class="name">${name}</div>
            <div class="subtitle">${description}</div>
        </div>`
}


// Helpers

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function closenessRating(person) {
    if (person.closenessRating == undefined) {
        return 100000
    } else {
        return person.closenessRating
    }
} 

function preferenceRating(event) {
    if (event.preferenceRating == undefined) {
        return -100000
    } else {
        return event.preferenceRating
    }
}