import PropTypes from 'prop-types';
import { useLayoutEffect, useRef, useState } from 'react';

export const Character = ({ name, species, image, status, gender }) => {
	const imgRef = useRef();

	const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		const { width, height } = imgRef.current.getBoundingClientRect();
		// console.log(imgRef.current.getBoundingClientRect());
		setBoxSize({ width, height });
	}, [image]);

	return (
		<>
			<div className='card' style={{ display: 'flex' }}>
				<div className='card-header'>
					<h5 className='card-title'>{name}</h5>
				</div>
				<img ref={imgRef} srcSet={image} className='card-img-top' alt={name} />
				<div className='card-body'>
					<p className='card-text text-center'>
						{species} / {gender}
					</p>
					<p className='card-text text-center'>{status}</p>
				</div>
			</div>

			<code>{JSON.stringify(boxSize)}</code>
		</>
	);
};

Character.propTypes = {
	name: PropTypes.string.isRequired,
	species: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	gender: PropTypes.string.isRequired,
};
