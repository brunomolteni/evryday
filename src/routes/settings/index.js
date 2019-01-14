import { h, Component } from 'preact';
import style from './style';

const Settings = ({habits, addHabit, removeHabit, clear}) => (
	<div class={style.settings}>
		<button onClick={addHabit}>Add new daily habit</button>
		<ul>
		{habits.map( habit => <li>{habit} <button onClick={() => removeHabit(habit)}>Delete</button></li> )}
		</ul>
		<button onClick={clear}>Delete history</button>
	</div>
);
export default Settings;
