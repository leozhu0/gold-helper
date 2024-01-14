//var scheduledCourses = document.getElementsByClassName('scheduleItem');

const scheduleContainer = document.getElementById('div_Schedule_Container');
const sessionRows = scheduleContainer.querySelectorAll('.row.session');

sessionRows.forEach(row => {
    const dayText = row.querySelector('.col-lg-days.col-lg-push-instructor.col-md-push-instructor.col-lg-push-0.col-sm-days.col-sm-push-3.col-xs-2').textContent;
    const timeText = row.querySelector('.col-lg-time.col-lg-push-instructor.col-md-push-instructor.col-md-time.col-sm-4.col-sm-push-3.col-xs-5').textContent;

    // Print the extracted texts to the console
    console.log('Day:', dayText, 'Time:', timeText);
});

