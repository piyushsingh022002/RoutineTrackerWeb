import React from 'react';
import {
	Sidebar,
	Brand,
	Illustration,
	Title,
	Subtitle,
	Nav,
	NavLink,
} from './AuthSideBar.styles';

const AuthSideBar: React.FC = () => {
	return (
		<Sidebar aria-label="Authentication sidebar">
			<Brand to="/">RoutineTracker</Brand>

			<Illustration aria-hidden="true" />

			<Title>Build habits. Track progress.</Title>
			<Subtitle>
				Create consistent routines, track streaks, and reach your goals — one day
				at a time.
			</Subtitle>

			<Nav>
				<NavLink to="/login">Sign in</NavLink>
				<NavLink outline to="/register">
					Create account
				</NavLink>
			</Nav>
		</Sidebar>
	);
};

export default AuthSideBar;

