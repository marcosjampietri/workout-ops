import Link from "next/link";

export const NavButton = ({ href, title }: any) => {
  return (
    <Link className="p-2 m-2 text-center border rounded-2xl" href={href}>
      {title}
    </Link>
  );
};
export default async function Home() {
  try {
    // Test Nod backend
    const nodeRes = await fetch("http://localhost:3001/");
    const nodeData = await nodeRes.json();

    // Test Python backend
    const pythonRes = await fetch("http://localhost:8000/");
    const pythonData = await pythonRes.json();

    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="p-4 max-w-xs h-screen mx-auto rounded-xl shadow-md space-y-4 border border-gray-200">
          <h1>Backend Test</h1>
          <p>Node.js API: {nodeData.message || "Loading..."}</p>
          <p>Python API: {pythonData.message || "Loading..."}</p>
          <div className="flex flex-col">
            <NavButton href="/history" title={"history"} />
            <NavButton href="/database" title={"build new workout"} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div style={{ padding: "20px" }}>
        <h1>Backend Test</h1>
        <p>Error fetching data. Please check the backend servers.</p>
      </div>
    );
  }
}
