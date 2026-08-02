export default async function Home() {
  // Test Node backend
  const nodeRes = await fetch("http://localhost:3001/");
  const nodeData = await nodeRes.json();

  // Test Python backend
  const pythonRes = await fetch("http://localhost:8000/");
  const pythonData = await pythonRes.json();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Backend Test</h1>
      <p>Node.js API: {nodeData.message || "Loading..."}</p>
      <p>Python API: {pythonData.message || "Loading..."}</p>
    </div>
  );
}
