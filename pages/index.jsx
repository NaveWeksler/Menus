import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const HomePage = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	return (
		<div className='h-screen flex items-center justify-center dark:bg-black'>
			<select
				value={theme}
				onChange={(e) => setTheme(e.target.value)}
				data-test-id='theme-selector'>
				<option value='system'>System</option>
				{mounted && (
					<>
						<option value='dark'>Dark</option>
						<option value='light'>Light</option>
					</>
				)}
			</select>
		</div>
	);
};

export default HomePage;
