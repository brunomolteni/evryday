import { h } from 'preact';
import style from './style';

const habits = [
	{name: ''}
]

export default () => (
	<div class={style.home}>
		<HabitsList />
	</div>
);
