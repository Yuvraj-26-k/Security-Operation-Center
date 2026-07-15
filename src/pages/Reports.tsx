export default function Reports() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-black">
        Security Reports
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="rounded-2xl bg-[#111827] p-8 border border-cyan-500/20">
          <h2 className="text-xl font-bold">Weekly Report</h2>
          <p className="mt-3 text-gray-400">
            Threat summary for the last 7 days.
          </p>
        </div>

        <div className="rounded-2xl bg-[#111827] p-8 border border-cyan-500/20">
          <h2 className="text-xl font-bold">Monthly Report</h2>
          <p className="mt-3 text-gray-400">
            Executive security overview.
          </p>
        </div>

        <div className="rounded-2xl bg-[#111827] p-8 border border-cyan-500/20">
          <h2 className="text-xl font-bold">Compliance</h2>
          <p className="mt-3 text-gray-400">
            Audit and compliance summary.
          </p>
        </div>

      </div>

    </div>
  );
}