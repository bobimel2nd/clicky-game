import React from 'react';
import "./Title.css";

const Title = (props) =>
	<nav className="navbar">
		<ul>
			<li className="bold"><strong>Clicky Game</strong></li>
			<li>{props.text}</li>
			<li className="small">Current Picks: {props.curr} | Best Picks: {props.best} | Perfects: {props.wins}</li>
		</ul>
	</nav>

export default Title;
