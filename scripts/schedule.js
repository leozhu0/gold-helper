// fetch(chrome.runtime.getURL('schedule.json'))
//   .then(response => response.json())
//   .then(data => {
//     // Step 2 & 3: Parse and modify the data
//     // Assuming 'data' is an object and you want to modify a field called 'eventDate'
//     data.eventDate = '2024-01-01';

//     // Step 4: Serialize the updated data
//     const updatedJson = JSON.stringify(data);

//     // Step 5: Store the updated data in Chrome Storage
//     chrome.storage.local.set({schedule: updatedJson}, () => {
//       console.log('Schedule is updated');
//     });
//   })
//   .catch(error => console.error('Error:', error));


//var scheduledCourses = document.getElementsByClassName('scheduleItem');

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

const scheduleContainer = document.getElementById('div_Schedule_Container');
const sessionRows = scheduleContainer.querySelectorAll('.row.session');

for (var i = 0; i < sessionRows.length; i++) {
    const dayText = sessionRows[i].querySelector('.col-lg-days.col-lg-push-instructor.col-md-push-instructor.col-lg-push-0.col-sm-days.col-sm-push-3.col-xs-2').textContent.trim().split("Days");
    const timeText = sessionRows[i].querySelector('.col-lg-time.col-lg-push-instructor.col-md-push-instructor.col-md-time.col-sm-4.col-sm-push-3.col-xs-5').textContent.trim().split("Time");

    let days = dayText[1].trim().split(" ");
    let timePeriod = convertToMilitaryTime(timeText[1].trim());

    console.log(days);
    console.log(timePeriod);
}

// sessionRows.forEach(row => {
//     const dayText = row.querySelector('.col-lg-days.col-lg-push-instructor.col-md-push-instructor.col-lg-push-0.col-sm-days.col-sm-push-3.col-xs-2').textContent.trim();
//     const timeText = row.querySelector('.col-lg-time.col-lg-push-instructor.col-md-push-instructor.col-md-time.col-sm-4.col-sm-push-3.col-xs-5').textContent.trim();

//     // Print the extracted texts to the console
//     console.log(dayText);
//     console.log(timeText);
// });

