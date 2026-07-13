export default function Login() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-cyan-500/30 bg-[#111827] p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            SentinelSOC
          </h1>

          <p className="text-gray-400 mt-2">
            Security Operations Center
          </p>
        </div>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Operator ID"
            className="w-full rounded-lg border border-gray-700 bg-[#1e293b] px-4 py-3 mb-4"
          />

          <input
            type="password"
            placeholder="Passcode"
            className="w-full rounded-lg border border-gray-700 bg-[#1e293b] px-4 py-3 mb-4"
          />

          <button className="w-full rounded-lg bg-cyan-500 py-3 font-bold text-black">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}