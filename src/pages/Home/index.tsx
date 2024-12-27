import PageTransition from "../../animations/PageTransition";
import { useStore } from "../../store";

export default function HomePage() {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.addBear);

  return (
    <PageTransition>
      This is the Home page. Bears: {bears}
      <br />
      <button onClick={increasePopulation}>Add bears</button>
    </PageTransition>
  );
}
