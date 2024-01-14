// function loadSchedule() {
//     return fetch(chrome.runtime.getURL('json/schedule.json'))
//         .then(response => response.json())
//         .then(data => data)
//         .catch(error => console.error('Error loading schedule:', error));
// }

function isTimeOverlapping(newPeriod, existingPeriods) {
    const newStart = new Date('1970-01-01T' + newPeriod.start).getTime();
    const newEnd = new Date('1970-01-01T' + newPeriod.end).getTime();

    //console.log(existingPeriods);

    for (const period of existingPeriods) {
        const start = new Date('1970-01-01T' + period.start).getTime();
        const end = new Date('1970-01-01T' + period.end).getTime();

        if (newStart < end && newEnd > start) {
            return true; // Overlap found
        }
    }
    return false; // No overlap
}

function convertToMilitaryTime(period) {
    // Split the period into two times
    let times = period.split('-');

    // Function to convert each time to military format
    function toMilitary(time) {
        let [hours, minutesPart] = time.split(':');
        let [minutes, meridian] = minutesPart.split(' ');

        // Convert hours to 24-hour format if necessary
        hours = parseInt(hours);
        if (meridian === 'PM' && hours !== 12) {
            hours += 12;
        } else if (meridian === 'AM' && hours === 12) {
            hours = 0;
        }

        // Format hours to ensure two digits
        hours = ('0' + hours).slice(-2);

        return `${hours}:${minutes}`;
    }

    // Convert and return both times in military format
    return times.map(time => toMilitary(time.trim())).join('-');
}

// _________________________________________________________
// MAIN STARTS HERE

let courses = document.getElementsByClassName('row session');

for (let i = 0; i < courses.length; i++) {
    let lectureInfo = courses[i].getElementsByClassName('col-lg-9 col-md-9 col-sm-9 col-xs-12');
    
    if (!(lectureInfo.length > 0)) continue;

    var courseSpace = lectureInfo[0].getElementsByClassName('col-lg-search-space col-md-space col-sm-push-1 col-sm-space col-xs-2');
    var courseStatus;

    var childNodes = courseSpace[0].childNodes;
    for (var j = 0; j < childNodes.length; j++) {
        if (childNodes[j].nodeType === Node.TEXT_NODE && childNodes[j].textContent.trim() !== '') {
            courseStatus = childNodes[j].textContent.trim();
            console.log(courseStatus);
        }
    }

    if (courseStatus === 'Full' || courseStatus === 'Closed' || courseStatus === 'Cancel') {
        courses[i].style.backgroundColor = 'gray';
        var allSections = courses[i].getElementsByClassName('row susbSessionItem');

        for (var j = 0; j < allSections.length; j++) {
            allSections[j].style.backgroundColor = 'gray';
        }
    } 

    else {
        var days = lectureInfo[0].getElementsByClassName('col-lg-search-days col-sm-push-1 col-md-days col-sm-days col-xs-2');
        var time = lectureInfo[0].getElementsByClassName('col-lg-search-time col-sm-push-1 col-md-time col-sm-time col-xs-5');

        var dayLetters;
        var dayChildren = days[0].childNodes;

        for (var j = 0; j < dayChildren.length; j++) {
            if (dayChildren[j].nodeType === Node.TEXT_NODE && dayChildren[j].textContent.trim() !== '') {
                dayLetters = dayChildren[j].textContent.trim();
                console.log(dayLetters);
            }
        }

        if (dayLetters == "T.B.A.") continue;

        var timePeriod;
        var timeChildren = time[0].childNodes;

        for (var j = 0; j < timeChildren.length; j++) {
            if (timeChildren[j].nodeType === Node.TEXT_NODE && timeChildren[j].textContent.trim() !== '') {
                timePeriod = timeChildren[j].textContent.trim();
                console.log(timePeriod);
            }
        }

        if (timePeriod == "T.B.A.") continue;

        let dayArray = dayLetters.split("");
        let timeArray = convertToMilitaryTime(timePeriod).split("-");

        var isConflict;

        let allSections = courses[i].getElementsByClassName('row susbSessionItem');
        // let lectureButtons = courses[i].getElementsByClassName('col-lg-3 col-md-3 col-sm-3 col-xs-12');

        function changeBackground(conflict) {
            if (conflict) {
                // lectureInfo[0].style.backgroundColor = "orange";
                // lectureButtons[0].style.backgroundColor = "orange";

                courses[i].style.backgroundColor = 'orange';

                for (var j = 0; j < allSections.length; j++) {
                    allSections[j].style.backgroundColor = 'orange';
                }
            }
        }

        // loadSchedule().then(schedule => {
        //     for (var j = 0; j < dayArray.length; j++) {
        //         const newEntry = {"day": dayArray[j], "start": timeArray[0], "end": timeArray[1]};
        //         isConflict = isTimeOverlapping(newEntry, schedule[newEntry.day]);
        //         console.log("conflict: " + isConflict);

        //         changeBackground(isConflict);
        //         if (isConflict) break;
        //     }
        // });

        chrome.storage.local.get('schedule', (result) => {
            const scheduleData = JSON.parse(result.schedule);
            console.log('Retrieved schedule:', scheduleData);
            
            for (var j = 0; j < dayArray.length; j++) {
                const newEntry = {"day": dayArray[j], "start": timeArray[0], "end": timeArray[1]};
                isConflict = isTimeOverlapping(newEntry, scheduleData[newEntry.day]);
                console.log("conflict: " + isConflict);

                changeBackground(isConflict);
                if (isConflict) break;
            }
        });
    }
}


// var courses = document.getElementsByClassName('row session');

// for (var i = 0; i < courses.length; i++) {
//     var lectureInfo = courses[i].getElementsByClassName('col-lg-9 col-md-9 col-sm-9 col-xs-12');
//     var courseStatus;
    
//     if (lectureInfo.length > 0) {
//         var courseSpace = lectureInfo[0].getElementsByClassName('col-lg-search-space col-md-space col-sm-push-1 col-sm-space col-xs-2');

//         for (var j = 0; j < courseSpace.length; j++) {
//             var childNodes = courseSpace[j].childNodes;

//             for (var k = 0; k < childNodes.length; k++) {
//                 if (childNodes[k].nodeType === Node.TEXT_NODE && childNodes[k].textContent.trim() !== '') {
//                     courseStatus = childNodes[k].textContent.trim();
//                     console.log(courseStatus);
//                 }
//             }
//         }

//     }

//     if (courseStatus === 'Full' || courseStatus === 'Closed') {
//         courses[i].style.backgroundColor = 'red';
//     } 
    
//     else {

//     }
// }

// for (var j = 0; j < 3; j++) {
    //     //console.log(texts[j]);

    //     // Iterate through child nodes of the div
    //     var childNodes = texts[j]?.childNodes;
    //     for (var k = 0; k < childNodes.length; k++) {
    //         // Check if the node is a text node and not just whitespace
    //         if (childNodes[k].nodeType === Node.TEXT_NODE && childNodes[k].textContent.trim() !== '') {
    //             console.log(childNodes[k].textContent.trim());
    //         }
    //     }
    // }


{/* 
<div class="col-lg-search-space col-md-space col-sm-push-1 col-sm-space col-xs-2"> 
    <label>Space</label>
    <div class="clear visible-xs"></div>
    " Closed "
</div>*/}

//col-xs-12 collapse

// // This function will be executed when the DOM is fully loaded
// //document.addEventListener('DOMContentLoaded', () => {
// // window.addEventListener("DOMContentLoaded", function() {
//     console.log("HelloWorld");
//     document.getElementsByClassName("courseSearchItem").style.backgroundColor = "red";
//     // Find all elements with the class 'courseSearchItem'
//     var courseItems = document.querySelectorAll('.courseSearchItem');

//     // Iterate through each 'courseSearchItem'
//     courseItems.forEach(function(courseItem) {

//         // Find the child element with the specified class
//         var infoElement = courseItem.querySelector('.row .session');
//         var a = infoElement.querySelector('.col-lg-9 .col-md-9 .col-sm-9 .col-xs-12');
//         var b = a.querySelector('.row .info');
//         var textElement = b.querySelector('.col-lg-search-space .col-md-space .col-sm-push-1 .col-sm-space .col-xs-2');

//         // Check if the element exists and print its text content
//         if (textElement) {
//             console.log(textElement.textContent);
//         }
//     });
// // }, false);

// function highlightText(node) {
//     const searchTerm1 = 'full';
//     const searchTerm2 = 'closed';
//     text = node.nodeValue;
//     parent = node.parentNode;

//     let matchPosition1 = text.toLowerCase().indexOf(searchTerm1);
//     let matchPosition2 = text.toLowerCase().indexOf(searchTerm2);
//     while (matchPosition1 !== -1 || matchPosition2 !== -1) {
//         let searchTermLength = (matchPosition1 !== -1) ? searchTerm1.length : searchTerm2.length;
//         let matchPosition = (matchPosition1 !== -1) ? matchPosition1 : matchPosition2;

//         const span = document.createElement('span');
//         span.style.backgroundColor = 'yellow';
//         span.textContent = text.substr(matchPosition, searchTermLength);

//         const afterText = text.substring(matchPosition + searchTermLength);
//         const afterNode = document.createTextNode(afterText);

//         parent.insertBefore(span, node);
//         parent.insertBefore(afterNode, node);

//         node.nodeValue = text.substr(0, matchPosition);

//         console.log('a');

//         node = afterNode;
//         text = node.nodeValue;
//         matchPosition1 = text.toLowerCase().indexOf(searchTerm1);
//         matchPosition2 = text.toLowerCase().indexOf(searchTerm2);
//     }
// }

// function walkTheDOM(node, func) {
//     func(node);
//     node = node.firstChild;
//     while (node) {
//         walkTheDOM(node, func);
//         node = node.nextSibling;
//     }
// }

// walkTheDOM(document.body, function (node) {
//     if (node.nodeType === 3) { // Text node
//         highlightText(node);
//     }
// });

// // Assume you're looking for elements with the class name "myClass"
// var elements = document.getElementsByClassName("myClass");

// // elements is an HTMLCollection of found elements with the class "myClass"
// for (var i = 0; i < elements.length; i++) {
//     // You can now do something with each element, for example:
//     console.log(elements[i]);
//     console.log("b");
// }

// function highlightCourses() {
//     const courses = document.querySelectorAll('.courseSearchItem');
//     courses.forEach(course => {
//         console.log("b");
//         course.add('highlight-course');
//     });
// }

// // Run the highlight function when the DOM is fully loaded
// window.addEventListener('DOMContentLoaded', (event) => {
//     console.log("a");
//     highlightCourses();
// });



