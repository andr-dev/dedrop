import { ComponentType, useEffect } from 'react';
import OnboardingDone from './OnboardingDone';
import OnboardingPrivateKey from './OnboardingPrivateKey';
import OnboardingStart from './OnboardingStart';

interface OnboardingScreen {
	/**
	 * React component for rendering this screen.
	 */
	component: ComponentType<Record<string, never>>;
	/**
	 * Unique key used to record progression to this screen
	 */
	key: string;
	/**
	 * Sets whether the user is allowed to skip this screen.
	 * @default false
	 */
	isSkippable?: boolean;
}

export const ONBOARDING_SCREENS: OnboardingScreen[] = [
	{
		component: OnboardingStart,
		key: 'start'
	},
	{
		component: OnboardingPrivateKey,
		key: 'private-key'
	},
	{
		component: OnboardingDone,
		key: 'done'
	}
];

export default function OnboardingRoot() {
	return (
		<div>
			onboarding root
		</div>
	);
}
