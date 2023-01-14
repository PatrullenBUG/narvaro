const attendanceElement = document.querySelector('textarea[name="attendance"]');
const submitMembers = document.querySelector('button[name="submitMembers"]');
const outputMembers = document.querySelector('textarea[name="outputMembers"]');
const outputMeetings = document.querySelector('textarea[name="outputMeetings"]');
const outputBinary = document.querySelector('textarea[name="outputBinary"]');
const outputLeaders = document.querySelector('textarea[name="outputLeaders"]');
const outputLeadersBinary = document.querySelector('textarea[name="outputLeadersBinary"]');
const members = document.querySelector('select[name="members"]');
const submitLeaders = document.querySelector('button[name="submitLeaders"]');

var selectLeader1 = document.getElementById("Leader1"),
    selectLeader2 = document.getElementById("Leader2"),
    attendance,
    list1 = [],
    list2 = [],
    listMembers = [],
    listMeetings = [],
    listLeaders = [];

class meeting {
    constructor(date, email, attendees, altDate)
    {
        this.date = date;
        this.email = email;
        this.attendees = attendees;
        this.altDate = altDate;
    }
}

// What to do when the first button is clicked
submitMembers.addEventListener('click', function(e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Hide the first stage and show the second stage
    document.querySelector(".stage1").classList.add("hidden");
    document.querySelector(".stage2").classList.remove("hidden");

    // Get the attendance list and split it into an array
    attendance = attendanceElement.value;
    list1 = attendance.split("\n");

    // Create a new meeting object for each meeting
    list1.forEach(element => {
        // Split the meeting into an array
        var listTemp = element.split("	");
        // Format the meeting and add it to the list
        list2.push
        (
            new meeting(
            listTemp[0].split(" ")[0],
            listTemp[1],
            listTemp[2].split(", "),
            // If the meeting has an alternative date, add it, otherwise add 0
            listTemp.length > 3 ? listTemp[3] : 0
        ));
    });

    // Create a list of all the members based on the option selected
    switch(members.value)
    {
        case "0":
            // Add the first meeting's attendees to the list
            listMembers = list2[0].attendees;
            list2.splice(0, 1);
            break;
        case "1":
            // Add the last meeting's attendees to the list
            listMembers = list2[list2.length-1].attendees;
            list2.splice(list2.length-1, 1);
            break;
        default:
            // Add all the attendees to the list without duplicates
            list2.forEach(element => {
                element.attendees.forEach(element2 => {
                    if(!listMembers.includes(element2))
                    {
                        listMembers.push(element2);
                    }
                })
            });
            break;
    }

    // Add options to pick leaders
    listMembers.forEach(element => {
        var option = document.createElement("option");
        option.text = element;
        option.value = element;
        selectLeader1.appendChild(option); 
    });
    listMembers.forEach(element => {
        var option = document.createElement("option");
        option.text = element;
        option.value = element;
        selectLeader2.appendChild(option);
    });
});


// What to do when the second button is clicked
submitLeaders.addEventListener('click', function(e) {
    // Prevent the form from submitting
    e.preventDefault();
    // Hide the second stage and show the third stage
    document.querySelector(".stage2").classList.add("hidden");
    document.querySelector(".stage3").classList.remove("hidden");
    
    // Remove the leaders from the list of members
    if(selectLeader1.value != 0) listLeaders.push(selectLeader1.value);
    if(selectLeader2.value != 0) listLeaders.push(selectLeader2.value);
    listLeaders.forEach(element => listMembers.splice(listMembers.indexOf(element), 1));
    
    // Sort the memberlists
    listMembers.sort();
    listLeaders.sort();

    // Output the memberlists
    outputMembers.value = listMembers.join("\n");
    outputLeaders.value = listLeaders.join("\n");

    // Make a binary matrix of the meetings and their attendees
    var tempListBinary = [];
    list2.forEach(element => tempListBinary.push(listMembers.map(element2 => element.attendees.includes(element2) ? 1 : 0)));

    // Format and output the binary matrix
    var tempStringBinary = "";
    for (let i = 0; i < listMembers.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            tempStringBinary += tempListBinary[j][i] + "	";
        }
        tempStringBinary += "\n";
    }
    outputBinary.value = tempStringBinary;
    
    // Make a binary matrix of the meetings and their leaders
    tempListBinary = [];
    list2.forEach(element => tempListBinary.push(listLeaders.map(element2 => element.attendees.includes(element2) ? 1 : 0)));

    // Format and output the binary matrix
    tempStringBinary = "";
    for (let i = 0; i < listLeaders.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            tempStringBinary += tempListBinary[j][i] + "	";
        }
        tempStringBinary += "\n";
    }
    outputLeadersBinary.value = tempStringBinary;

    // Format and output the meeting dates
    var tempStringMeetings = "";
    list2.forEach(element => tempStringMeetings += (element.altDate == 0 ? element.date.split("/")[1]: element.altDate.split("/")[1]) + "	");
    tempStringMeetings += "\n";
    list2.forEach(element => tempStringMeetings += (element.altDate == 0 ? element.date.split("/")[0]: element.altDate.split("/")[0]) + "	");

    outputMeetings.value = tempStringMeetings;
});