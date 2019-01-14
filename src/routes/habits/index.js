import { h } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

import { addHabitsToCalendar, getTodayKey } from '../../utils';

const dayNames = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const today = getTodayKey();

const HabitsColumn = ({habits, track, today}) => (
	<div class={style.HabitsColumn}>
		<h2>Habits</h2>
		<ul>
			{habits.map(habit => (
				<li class={today && today.includes(habit) ? style.checked  : null}  onClick={() => track(habit)}>{habit}<i>✔</i></li>
			))}
		</ul>
	</div>
);

const DayHeader = ({day}) => (
	<header class={day.weekDay === 0 || day.weekDay === 6 ? style.weekend:null}>
		{dayNames[day.weekDay]}
		<b>{day.day}</b>
		<span>{monthNames[day.month]}</span>
	</header>
);

const CalendarColumn = ({day,habits}) => (
	<div class={style.CalendarColumn}>
		<DayHeader day={day} />
		{habits.map( habit => <i class={day.habits && day.habits.includes(habit) ? style.done : null} style={{opacity: day.streak && day.streak[habit] ? day.streak[habit]*0.1 : 0}}/>)}
	</div>
);

const Habits = ({habits, days, calendar, trackHabit}) => {
	let calendarWithHabits = addHabitsToCalendar(days, calendar);
	return (
	<div class={style.Home}>
		{habits && <HabitsColumn habits={habits} track={habit => trackHabit(habit)} today={days[today]}/>}
		<div class={style.Calendar}>
			{calendar && calendar.map( day => day && <CalendarColumn day={day} habits={habits} />)}
		</div>
	</div>
) };

export default Habits;
