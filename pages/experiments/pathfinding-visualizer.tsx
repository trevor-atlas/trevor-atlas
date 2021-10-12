import React from 'react';
import { Footer } from 'src/components/footer/Footer';
import { Nav } from 'src/components/nav/Nav';
import { Pathfinder } from 'src/components/pathfinder/Pathfinder';
import SEO from 'src/components/Seo';
import { Container } from 'src/components/Container';

const PathfindingVisualizer: React.FunctionComponent<void> = (props) => (
  <>
    <SEO title="Experiments: Pathfinding Visualizer" />
    <Container>
      <Pathfinder />
    </Container>
  </>
);

export default PathfindingVisualizer;
