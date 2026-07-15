import { useEffect, useState } from "react";

interface DashboardResponse {
  top_attack_types: [string, number][];
}

interface Rule {
  name: string;
  engine: string;
  status: string;
  hits: number;
}

export default function Rules() {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:8000/dashboard");
        const data: DashboardResponse = await response.json();

        const generatedRules: Rule[] = data.top_attack_types.map(
          ([attack, count]) => ({
            name: `${attack} Detection`,
            engine: "SentinelSOC",
            status: "Enabled",
            hits: count,
          })
        );

        setRules(generatedRules);
      } catch (error) {
        console.error("Failed to fetch rules:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-white">
          Detection Rules
        </h1>

        <p className="mt-2 text-gray-400">
          Active detection rules generated from observed attack patterns
        </p>
      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="pb-4">Rule</th>
              <th>Engine</th>
              <th>Status</th>
              <th>Matches</th>
            </tr>
          </thead>

          <tbody>
            {rules.length > 0 ? (
              rules.map((rule, index) => (
                <tr
                  key={index}
                  className="border-b border-[#1f2937] hover:bg-[#182233]"
                >
                  <td className="py-5 font-semibold">
                    {rule.name}
                  </td>

                  <td>{rule.engine}</td>

                  <td>
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                      {rule.status}
                    </span>
                  </td>

                  <td>{rule.hits}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-gray-500"
                >
                  No detection rules available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}