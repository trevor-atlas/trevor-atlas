import { Wormhole } from 'src/portal/Wormhole';
import { Container } from 'src/components/Container';
import SEO from 'src/components/Seo';

function Page() {
  return (
    <>
      <SEO title="Experiments: WEBGL Portal" />
      <Container>
        <div className="mx-auto mx-w-md flex flex-col items-center content-center">
          <p>A wormhole renderer written in WEBGL shaders.</p>
          <p>
            This uses modified{' '}
            <a href="https://www.wikiwand.com/en/Black-body_radiation">
              blackbody radiation
            </a>{' '}
            formulas to render an awesome looking wormhole!
          </p>
          <Wormhole />
        </div>
      </Container>
    </>
  );
}

export default Page;
