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

submitMembers.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(".stage1").classList.add("hidden");
    document.querySelector(".stage2").classList.remove("hidden");

    attendance = attendanceElement.value;
    list1 = attendance.split("\n");
    console.log(list1);
    list1.forEach(element => {
        var listTemp = element.split("	");
        console.log(listTemp);
        list2.push
        (new meeting(
            listTemp[0].split(" ")[0],
            listTemp[1],
            listTemp[2].split(", "),
            listTemp.length > 3 ? listTemp[3] : 0
        ));
    });
    switch(members.value)
    {
        case "0":
            listMembers = list2[0].attendees;
            list2.splice(0, 1);
            break;
        case "1":
            listMembers = list2[list2.length-1].attendees;
            list2.splice(list2.length-1, 1);
            break;
        default:
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

submitLeaders.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(".stage2").classList.add("hidden");
    document.querySelector(".stage3").classList.remove("hidden");
    
    if(selectLeader1.value != 0) listLeaders.push(selectLeader1.value);
    if(selectLeader2.value != 0) listLeaders.push(selectLeader2.value);
    listLeaders.forEach(element => listMembers.splice(listMembers.indexOf(element), 1));
    
    listMembers.sort();
    listLeaders.sort();
    outputMembers.value = listMembers.join("\n");
    outputLeaders.value = listLeaders.join("\n");
    var tempListBinary = [];

    list2.forEach(element => tempListBinary.push(listMembers.map(element2 => element.attendees.includes(element2) ? 1 : 0)));
    /* list2.forEach(element => {
        var tempListBinary2 = [];
        listMembers.forEach(element2 => tempListBinary2.push(element.attendees.includes(element2) ? 1 : 0));
        tempListBinary.push(
            listMembers.map(element2 => element.attendees.includes(element2) ? 1 : 0)
        );
        listMembers.forEach(element2 => tempListBinary2.push(element.attendees.includes(element2) ? 1 : 0));
        
        tempListBinary.push(tempListBinary2);
    }); */

    var tempStringBinary = "";
    for (let i = 0; i < listMembers.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            tempStringBinary += tempListBinary[j][i] + "	";
        }
        tempStringBinary += "\n";
    }
    outputBinary.value = tempStringBinary;
    
    tempListBinary = [];
    list2.forEach(element => tempListBinary.push(listLeaders.map(element2 => element.attendees.includes(element2) ? 1 : 0)));
    tempStringBinary = "";
    for (let i = 0; i < listLeaders.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            tempStringBinary += tempListBinary[j][i] + "	";
        }
        tempStringBinary += "\n";
    }
    outputLeadersBinary.value = tempStringBinary;

    var tempStringMeetings = "";
    list2.forEach(element => tempStringMeetings += (element.altDate == 0 ? element.date.split("/")[1]: element.altDate.split("/")[1]) + "	");
    tempStringMeetings += "\n";
    list2.forEach(element => tempStringMeetings += (element.altDate == 0 ? element.date.split("/")[0]: element.altDate.split("/")[0]) + "	");

    outputMeetings.value = tempStringMeetings;
});