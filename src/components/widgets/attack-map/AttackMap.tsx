import AttackStats from "./AttackStats";
import AttackToolbar from "./AttackToolbar";
import WorldMap from "./WorldMap";

import useAttackMap from "../../../hooks/useAttackMap";

export default function AttackMap() {
  const {
    connected,
    attacks,
  } = useAttackMap();

  return (
    <div className="cyber-card rounded-3xl border border-cyan-500/20 bg-[#0B1220]/80 p-6 shadow-2xl backdrop-blur-xl">

      <AttackToolbar
        connected={connected}
        totalAttacks={attacks.length}
      />

      <div className="mt-6">

        <WorldMap
          attacks={attacks}
        />

      </div>

      <AttackStats
        attacks={attacks}
      />

    </div>
  );
}