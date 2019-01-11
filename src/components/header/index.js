import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>Evryday</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Habits</Link>
			<Link activeClassName={style.active} href="/settings">Settings</Link>
		</nav>
	</header>
);

export default Header;
