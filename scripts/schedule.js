fetch(chrome.runtime.getURL('json/schedule.json'))
  .then(response => response.json())
  .then(data => {

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            data[key] = [];
        }
    }
    
    const scheduleContainer = document.getElementById('div_Schedule_Container');
    const sessionRows = scheduleContainer.querySelectorAll('.row.session');

    for (var i = 0; i < sessionRows.length; i++) {
        const dayText = sessionRows[i].querySelector('.col-lg-days.col-lg-push-instructor.col-md-push-instructor.col-lg-push-0.col-sm-days.col-sm-push-3.col-xs-2').textContent.trim().split("Days");
        const timeText = sessionRows[i].querySelector('.col-lg-time.col-lg-push-instructor.col-md-push-instructor.col-md-time.col-sm-4.col-sm-push-3.col-xs-5').textContent.trim().split("Time");

        let scheduleDays = dayText[1].trim().split(" ");
        let scheduleTimePeriod = convertToMilitaryTime(timeText[1].trim()).split("-");

        console.log(scheduleDays);
        console.log(scheduleTimePeriod);

        for (var j = 0; j < scheduleDays.length; j++) {
            data[scheduleDays[j]].push({"start": scheduleTimePeriod[0], "end": scheduleTimePeriod[1]});
        }
    }

    // Step 4: Serialize the updated data
    const updatedJson = JSON.stringify(data);

    // Step 5: Store the updated data in Chrome Storage
    chrome.storage.local.set({schedule: updatedJson}, () => {
      console.log('Schedule is updated');
    });
  })
  .catch(error => console.error('Error:', error));

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

// const scheduleContainer = document.getElementById('div_Schedule_Container');
// const sessionRows = scheduleContainer.querySelectorAll('.row.session');

// for (var i = 0; i < sessionRows.length; i++) {
//     const dayText = sessionRows[i].querySelector('.col-lg-days.col-lg-push-instructor.col-md-push-instructor.col-lg-push-0.col-sm-days.col-sm-push-3.col-xs-2').textContent.trim().split("Days");
//     const timeText = sessionRows[i].querySelector('.col-lg-time.col-lg-push-instructor.col-md-push-instructor.col-md-time.col-sm-4.col-sm-push-3.col-xs-5').textContent.trim().split("Time");

//     let days = dayText[1].trim().split(" ");
//     let timePeriod = convertToMilitaryTime(timeText[1].trim());

//     console.log(days);
//     console.log(timePeriod);
// }

// fetch(chrome.runtime.getURL('schedule.json'))
//   .then(response => response.json())
//   .then(data => {
    
//     data.eventDate = ;

//     // Step 4: Serialize the updated data
//     const updatedJson = JSON.stringify(data);

//     // Step 5: Store the updated data in Chrome Storage
//     chrome.storage.local.set({schedule: updatedJson}, () => {
//       console.log('Schedule is updated');
//     });
//   })
//   .catch(error => console.error('Error:', error));
















// sessionRows.forEach(row => {
//     const dayText = row.querySelector('.col-lg-days.col-lg-push-instructor.col-md-push-instructor.col-lg-push-0.col-sm-days.col-sm-push-3.col-xs-2').textContent.trim();
//     const timeText = row.querySelector('.col-lg-time.col-lg-push-instructor.col-md-push-instructor.col-md-time.col-sm-4.col-sm-push-3.col-xs-5').textContent.trim();

//     // Print the extracted texts to the console
//     console.log(dayText);
//     console.log(timeText);
// });

