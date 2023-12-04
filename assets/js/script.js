$(function () {
    //create a dayjs object to manipulate the dates
    let now = dayjs()
    //wrote this before I realized you could just do day.format('dddd')
    const setWeekDay = (dayNum) => {
        let weekday;
        switch (dayNum) {
            case 0:
                weekday = "Sunday";
                break;
            case 1:
                weekday = "Monday";
                break;
            case 2:
                weekday = "Tuesday";
                break;
            case 3:
                weekday = "Wednesday";
                break;
            case 4:
                weekday = "Thursday";
                break;
            case 5:
                weekday = "Friday";
                break;
            case 6:
                weekday = "Saturday";
        }
        return weekday;

    }

    const setMonthName = (monthNum) => {
        let monthName;
        switch (monthNum) {
            case 0:
                monthName = "January";
                break;
            case 1:
                monthName = "February";
                break;
            case 2:
                monthName = "March";
                break;
            case 3:
                monthName = "April";
                break;
            case 4:
                monthName = "May";
                break;
            case 5:
                monthName = "June";
                break;
            case 6:
                monthName = "July";
                break;
            case 7:
                monthName = "August";
                break;
            case 8:
                monthName = "September";
                break;
            case 9:
                monthName = "October";
                break;
            case 10:
                monthName = "November";
                break;
            case 11:
                monthName = "December";
        }
        return monthName;

    }

    //get ref to save button to attach listener
    const saveBtn = $('.saveBtn')


    //set the date in the header
    const setDateHeader = () => {
        const weekNum = now.day();
        const dayNum = now.date();
        const monthNum = now.month();
        const year = now.year();
        let foundDay = setWeekDay(weekNum);
        let foundMonth = setMonthName(monthNum);
        let currentDayString = foundDay + " " + foundMonth + " " + dayNum + ", " + year;
        const currentDateParagraph = $('#currentDay');
        currentDateParagraph.text(currentDayString);
        let lastUpdate = localStorage.getItem("Last Update");
        if (lastUpdate) {
            $("#lastUpdated").text("Last Update: " + lastUpdate);
        }

    }

    setDateHeader()
    //attach a listener to the click so that events can be saved on click
    saveBtn.on("click", (event) => {
        console.log($(event.target).parent());
        let parentElement = $(event.target).parent();
        let hourId;
        let storedEvent;
        if (parentElement.is("button")) {
            let divElement = $(parentElement).parent();
            hourId = divElement[0].id;
            storedEvent = $(parentElement).prev().val();
        }
        else {
            hourId = parentElement[0].id;
            storedEvent = $(event.target).prev().val();
        }

        localStorage.setItem(hourId, storedEvent);
        const currentDate = dayjs();
        const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
        localStorage.setItem("Last Update", formattedDate);
        $("#lastUpdated").text("Last Update: " + formattedDate);
    })


    //on page load check to see if events exist and put them in the right place if they do
    const loadSavedEvents = () => {
        for (let i = 9; i < 18; i++) {
            let hourId = 'hour-' + i;
            let foundEvent = localStorage.getItem(hourId);
            if (foundEvent) {
                $('#' + hourId).children('textarea').val(foundEvent);
            }
        }

    }
    //check what hour it is and set the blocks accordingly
    const setColorBlocks = () => {
        let currentHour = now.hour();

        for (let i = 9; i < 18; i++) {
            if (i < currentHour) {
                let hourId = "#hour-" + i;
                $(hourId).addClass('past')
            }
            else if (i == currentHour) {
                let hourId = "#hour-" + i;
                $(hourId).addClass('present')
            }
            else {
                let hourId = "#hour-" + i;
                $(hourId).addClass('future')
            }
        }

    }

    setColorBlocks();
    loadSavedEvents();

});

