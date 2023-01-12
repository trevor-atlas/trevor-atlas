import React, { useRef, useState } from 'react';
import { GridEngine } from 'src/canvas/grid/GridEngine';
import { Button } from 'src/components/button/Button';
import { Cell } from 'src/components/pathfinder/Cell';
import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';

export function Pathfinder() {
  const [ran, setRan] = useState(false);
  const [running, setRunning] = useState(false);
  const [tooSmall, setTooSmall] = useState(true);
  const engine = useRef<GridEngine>();

  useIsomorphicLayoutEffect(() => {
    setTooSmall(window.innerWidth <= 1000);
    engine.current = new GridEngine(30, 50);
  }, []);

  return (
    <div className="my-32">
      <h1>Pathfinding Visualizer</h1>
      <p>Click and drag on a grid cell to add a wall</p>
      <div className="mb-8">
        <h4>Legend</h4>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <Cell isStart />
            <span> Start</span>
          </li>
          <li>
            <Cell isEnd />
            <span> End</span>
          </li>
          <li>
            <Cell isWall />
            <span> Wall</span>
          </li>
        </ul>
      </div>
      <div className="mb-2">
        <Button
          onClick={() => {
            setRan(false);
            engine.current!.genGrid(30, 50);
          }}
          disabled={running}
          text="Reset"
          className="mr-4"
        />
        <Button
          onClick={async () => {
            setRan(true);
            setRunning(true);
            await engine.current!.animateSolution();
            setRunning(false);
          }}
          disabled={ran || running}
          text="Start Animation"
        />
      </div>

      <canvas
        id="renderingContext"
        style={{ display: tooSmall ? 'none' : 'initial', marginBottom: '2rem' }}
      />
      <p>
        A fun way to learn more about canvas rendering and Dijkstra's algorithm!
      </p>

      <style jsx>{`
        #renderingContext {
          margin: 0;
          padding: 0;
          border: none;
        }
      `}</style>
    </div>
  );
}
