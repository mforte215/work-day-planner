$(function () {

    let now = dayjs()

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

    const rootEl = $('#root');
    const saveBtn = $('.saveBtn')

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
    }

    setDateHeader()

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
    })

    const loadSavedEvents = () => {
        for (let i = 9; i < 18; i++) {
            let hourId = 'hour-' + i;
            let foundEvent = localStorage.getItem(hourId);
            if (foundEvent) {
                $('#' + hourId).children('textarea').val(foundEvent);
            }
        }
    }

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

