import React, { ChangeEvent, FC, useState } from 'react';
import { Button } from 'src/components/button/Button';
import { Footer } from 'src/components/footer/Footer';
import { Input } from 'src/components/input/Input';
import { Nav } from 'src/components/nav/Nav';
import SEO from 'src/components/Seo';
import { Container } from 'src/components/Container';

const wifiTemplate = `WIFI:T:WPA;S:your_network_name;P:your_network_password;;`;
const emailTemplate = `mailto:email@domain.com`;
const smsTemplate = `sms://+1234-567-8910`;

const QRCode: FC<any> = (props) => {
  const [input, setInput] = useState('');
  const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setInput(e.currentTarget.value);
  };
  const [image, setImage] = useState('/images/qr-wikipedia.png');
  const [error, setError] = useState('');

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
      <SEO title="Experiments: QR code generator" />
      <Container>
        <div className="mx-auto mx-w-md flex flex-col items-center content-center">
          <img
            src={image}
            style={{
              margin: '2rem',
              background: 'gray',
              width: 512,
              height: 512,
              display: 'block'
            }}
            alt="qr code"
          />
          <form
            action=""
            noValidate
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'flex', flexBasis: 'space-around' }}
          >
            <ul style={{ paddingRight: '1rem' }}>
              <li>
                <Button
                  text="SMS template"
                  onClick={() => setInput(smsTemplate)}
                />
              </li>
              <li>
                <Button
                  text="Email template"
                  onClick={() => setInput(emailTemplate)}
                />
              </li>
              <li>
                <Button
                  text="Wifi template"
                  onClick={() => setInput(wifiTemplate)}
                />
              </li>
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="input">QR code value</label>
              <Input
                style={{ minWidth: 350 }}
                name="input"
                value={input}
                onChange={updateInput}
              />
              <Button text="Submit" onClick={submit} />
            </div>
          </form>
          <h4>{error}</h4>
          <p>
            <a
              target="_blank"
              href="https://github.com/trevor-atlas/weekend"
              rel="noreferrer"
            >
              Source code for the QR code endpoint
            </a>
          </p>
        </div>
      </Container>
    </>
  );
};

export default QRCode;
