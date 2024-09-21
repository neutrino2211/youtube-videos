import {Circle, Line, Txt, makeScene2D} from '@motion-canvas/2d';
import {createRef, easeInOutCubic} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Create your animations here

  const outerNode = createRef<Circle>();
  const idsNode = createRef<Circle>();
  const clientOne = createRef<Circle>();
  const clientTwo = createRef<Circle>();
  const clientThree = createRef<Circle>();

  const alarm = createRef<Txt>();

  view.add(
    <>
      <Line
        points={[
          [0, -225],
          [-350, 250]
        ]}
        stroke={'white'}
        lineWidth={8}
        radius={40}
        startArrow
      />
      <Line
        points={[
          [0, -225],
          [350, 250]
        ]}
        stroke={'white'}
        lineWidth={8}
        radius={40}
        startArrow
      />
      <Line
        points={[
          [0, -225],
          [0, 250]
        ]}
        stroke={'white'}
        lineWidth={8}
        radius={40}
        startArrow
      />
      <Line
        points={[
          [-750, -225],
          [0, -225]
        ]}
        stroke={'white'}
        lineWidth={8}
        radius={40}
        startArrow
      />
      <Line
        points={[
          [750, -225],
          [0, -225]
        ]}
        stroke={'white'}
        lineWidth={8}
        radius={40}
        startArrow
      />,
    </>
  );

  view.add(
    <>
      <Circle ref={outerNode} size={250} position={[-750, -225]} fill={'lightseagreen'} />
      <Circle ref={idsNode} size={250} position={[0, -225]} fill={'red'}/>

      <Circle ref={clientOne} size={250} position={[0, 250]} fill={'#cc0077'}/>
      <Circle ref={clientTwo} size={250} position={[-350, 250]} fill={'#00cc77'}/>
      <Circle ref={clientThree} size={250} position={[350, 250]} fill={'#0077cc'}/>

      <Txt ref={alarm} scale={5} position={[750, -225]} text={"📄"} />
    </>
  );

  view.add(
    <>
      <Txt scale={1.4} position={[-750, -400]} fill={"white"} text={"INTERNET"}/>
      <Txt scale={1.4} position={[0, -400]} fill={"white"} text={"IDS"}/>
      <Txt scale={1.4} position={[750, -400]} fill={"white"} text={"LOGS"}/>
      <Txt scale={1.4} position={[0, 450]} fill={"white"} text={"CLIENTS"}/>
    </>
  );

  for(let i = 0; i < 10; i++) {
    const ok = () => Math.random() <= 0.54
    const clientPositions = [clientOne().position(), clientTwo().position(), clientThree().position()]

    const outer = createRef<Txt>();
    view.add(<Txt ref={outer} scale={2} position={outerNode().position} text={ok() ? "✅" : "👾"}/>);

    yield* outer().position(idsNode().position, 2, easeInOutCubic);
    if (outer().text() == "✅") {
      const pos = clientPositions[Math.floor(Math.random() * 3)]
      yield* outer().position(pos, 2, easeInOutCubic)
    } else {
      outer().text("🚨");
      yield* outer().position(alarm().position, 2, easeInOutCubic)
    }

    outer().remove();
  }
});