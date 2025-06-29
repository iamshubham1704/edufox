export default async function Leaderboard() {
  const res = await fetch("http://localhost:3000/api/leaderboard", { cache: "no-store" });
  const students = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      {students.map((s) => (
        <div key={s.id} className="flex items-center space-x-4">
          <span className="text-2xl">{s.avatar}</span>
          <span>{s.name}</span>
          <span>{s.score}</span>
        </div>
      ))}
    </div>
  );
}
