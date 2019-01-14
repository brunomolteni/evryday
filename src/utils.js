import {Calendar} from 'calendar-base';

const cal = new Calendar;
window.cal = cal;

export function getTodayKey() {
  return (new Date).toISOString().split('T')[0];
}

export function getFirstDayAvailable(days) {
  return Object.keys(days).sort((a, b) => a.replace(/-/g,'') - b.replace(/-/g,''))[0];
}

export function createCalendar (days) {
  const today = getTodayKey().split('-');
  const upToToday = day => day.day <= today[2];
  if(!days || !Object.keys(days).length){
    return cal.getCalendar(today[0], today[1]-1).filter(upToToday);
  }
  const firstDayAvailable = getFirstDayAvailable(days).split('-');
  var calendarColumns = [];

  if(+today[0] > +firstDayAvailable[0]){  // before than this year
    // first available month
    for (var k = +firstDayAvailable[1]; k <= 12; k++) {
      let month = cal.getCalendar(firstDayAvailable[0],k-1);
      calendarColumns = calendarColumns.concat(month);
    }
    // years in between
    for (var remainingYears = +today[0] - (+firstDayAvailable[0]+1); remainingYears > 0; remainingYears--) {
        for (var remainingMonths = 0; remainingMonths < 12; remainingMonths++) {
          let month = cal.getCalendar(+today[0]-remainingYears,remainingMonths);
          calendarColumns = calendarColumns.concat(month);
        }
    }
    // current year
    for (var remainingMonths = 0; remainingMonths < +today[1]; remainingMonths++) {
      let month = cal.getCalendar(+today[0],remainingMonths);
      calendarColumns = calendarColumns.concat(month).filter(upToToday);
    }
  }
  else if(+today[1] > +firstDayAvailable[1]){ // before this month
    for (var remainingMonths = +today[1] - +firstDayAvailable[1]; remainingMonths >= 0; remainingMonths--) {
      let month = cal.getCalendar(firstDayAvailable[0], +firstDayAvailable[1] - remainingMonths -1);
      calendarColumns = calendarColumns.concat(month);
    }
  } else{ // this month only
    let month = cal.getCalendar(firstDayAvailable[0], firstDayAvailable[1]-1)
    calendarColumns = calendarColumns.concat( month ).filter(upToToday);
  }
  return calendarColumns;
}

export function addHabitsToCalendar(days,calendar){
  Object.keys(days).forEach( day => {
    let date = day.split('-');
    let index = calendar.findIndex( el => el && el.day === +date[2] && el.month === +date[1]-1 && el.year === +date[0]);
    console.log(day, index > -1 ? 'found': 'not-found');
    if(index > -1){
      var today = calendar[index];
      var prevDay = calendar[index-1];
      today.habits = days[day];
      today.streak = {};
      today.habits.forEach( habit => {
        today.streak[habit] = prevDay && prevDay.streak && prevDay.streak[habit] ? prevDay.streak[habit] + 1 : 1;
      })
    };
  });

  return calendar;
}
