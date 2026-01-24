import React from 'react';
import { useLocation } from 'react-router-dom';
import {
	Sidebar,
	Brand,
	Illustration,
	Title,
	Subtitle,
	Nav,
	NavLink,
	FeaturesSection,
	Feature,
	FeatureIcon,
	FeatureText,
	StatsSection,
	Stat,
	StatNumber,
	StatLabel,
	Testimonial,
	TestimonialText,
	TestimonialAuthor,
	TrustBadges,
	Badge,
} from './AuthSideBar.styles';

const AuthSideBar: React.FC = () => {
		const location = useLocation();
		const isLoginPage = location.pathname === '/login';

	return (
		<Sidebar aria-label="Authentication sidebar" data-cursor-block>
			<Brand to="/">✨ RoutineTracker</Brand>

			<Illustration aria-hidden="true" />

			<Title>Transform Your Life,<br />One Habit at a Time</Title>
			<Subtitle>
				Join thousands of achievers building powerful routines, tracking meaningful progress,
				and unlocking their full potential every single day.
			</Subtitle>

			<StatsSection>
				<Stat>
					<StatNumber>50K+</StatNumber>
					<StatLabel>Active Users</StatLabel>
				</Stat>
				<Stat>
					<StatNumber>2M+</StatNumber>
					<StatLabel>Habits Tracked</StatLabel>
				</Stat>
				<Stat>
					<StatNumber>95%</StatNumber>
					<StatLabel>Success Rate</StatLabel>
				</Stat>
			</StatsSection>

			<FeaturesSection>
				<Feature>
					<FeatureIcon>🎯</FeatureIcon>
					<FeatureText>Smart Goal Tracking</FeatureText>
				</Feature>
				<Feature>
					<FeatureIcon>📊</FeatureIcon>
					<FeatureText>Visual Progress Insights</FeatureText>
				</Feature>
				<Feature>
					<FeatureIcon>🔥</FeatureIcon>
					<FeatureText>Streak Motivation</FeatureText>
				</Feature>
			</FeaturesSection>

			<Testimonial>
				<TestimonialText>
					"RoutineTracker helped me build consistency I never thought possible.
					A true game-changer!"
				</TestimonialText>
				<TestimonialAuthor>— Piyush Singh, Web Admin</TestimonialAuthor>
			</Testimonial>

			<Nav>
				{isLoginPage ? (
					<NavLink to="/register">
						Get Started Free
					</NavLink>
				) : (
					<NavLink to="/login">
						Sign In
					</NavLink>
				)}
			</Nav>

			<TrustBadges>
				<Badge>🔒 Secure & Private</Badge>
				<Badge>✓ Free Forever</Badge>
				<Badge>⚡ No Credit Card</Badge>
			</TrustBadges>
		</Sidebar>
	);
};

export default AuthSideBar;

