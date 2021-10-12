import { Portal } from 'pages/experiments/portal/Portal';
import { Container } from 'src/components/Container';
import { Nav } from 'src/components/nav/Nav';
import SEO from 'src/components/Seo';

function Page() {
  return (
    <>
      <Nav />
      <SEO title="Experiments: WEBGL Portal" />
      <Container>
        <div className="mx-auto mx-w-md flex flex-col items-center content-center">
          <Portal />
        </div>
      </Container>
    </>
  );
}

export default Page;
