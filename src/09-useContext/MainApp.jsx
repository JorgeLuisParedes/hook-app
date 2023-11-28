import { Navigate, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';
import { HomePage, AboutPage, LoginPage, NavBar } from './';

export const MainApp = () => {
	return (
		<UserProvider>
			<NavBar />
			<hr />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/login' element={<LoginPage />} />

				<Route path='/*' element={<Navigate to='/about' />} />
			</Routes>
		</UserProvider>
	);
};
