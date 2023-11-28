import { useCounter, useFetch } from '../hooks';
import { Character, LoadingCharacter } from '../03-example';

export const Layout = () => {
	const { counter, increment } = useCounter(1);

	const { data, isLoading, hasError } = useFetch(
		`https://rickandmortyapi.com/api/character/${counter}`,
	);

	const { name, species, image, status, gender } = !!data && data;

	return (
		<>
			<h1>Rick and Morty Characters</h1>
			<hr />

			{isLoading ? (
				<LoadingCharacter />
			) : (
				<Character
					name={name}
					species={species}
					image={image}
					status={status}
					gender={gender}
				/>
			)}

			<button
				className='btn btn-primary mt-3'
				disabled={isLoading}
				onClick={() => increment()}
			>
				Next character
			</button>
		</>
	);
};
