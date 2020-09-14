import React, { ChangeEvent, FC, useState } from 'react';
import { Button } from 'src/components/button/Button';
import { Footer } from 'src/components/Footer';
import { Input } from 'src/components/input/Input';
import { Nav } from 'src/components/nav/Nav';
import SEO from 'src/components/Seo';
import { Container } from 'src/components/Container';

const QRCode: FC<any> = (props) => {
	const [input, setInput] = useState('');
	const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
		setError('');
		setInput(e.currentTarget.value);
	};
	const [image, setImage] = useState('/images/qr-wikipedia.png');
	const [error, setError] = useState('');

	const wifiTemplate = `WIFI:T:WPA;S:your_network_name;P:your_network_password;;`;

	const submit = async () => {
		try {
			const data = await fetch(
				`https://weekend.now.sh/api/encode?content=${input}&size=512`,
				{
					cache: 'no-cache'
				}
			);
			const buffer = await data.arrayBuffer();
			const blob = new Blob([buffer]);
			const imageURL = URL.createObjectURL(blob);
			setImage(imageURL);
		} catch (e) {
			setError('Something went wrong creating that QR code, sorry!');
		}
	};
	return (
		<>
			<Nav />
			<SEO title="Experiments: Pathfinding Visualizer" />
			<Container>
				<div className="mx-auto mx-w-md flex flex-col items-center content-center">
					<Button
						text="Load Wifi Access template"
						onClick={() => setInput(wifiTemplate)}
					/>
					<img
						src={image}
						style={{
							margin: '2rem',
							background: 'gray',
							width: 512,
							height: 512,
							display: 'block'
						}}
						alt=""
					/>
					<form
						action=""
						noValidate
						onSubmit={(e) => e.preventDefault()}
					>
						<label htmlFor="input">QR code value</label>
						<br />
						<Input
							style={{ width: 500 }}
							name="input"
							value={input}
							onChange={updateInput}
						/>
						<br />
						<Button text="Submit" onClick={submit} />
					</form>
					<h4>{error}</h4>
				</div>
			</Container>
			<Footer />
		</>
	);
};

export default QRCode;
