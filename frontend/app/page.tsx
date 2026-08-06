"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const NavButton = ({ href, title }: any) => {
  return (
    <Link className="p-2 m-2 text-center border rounded-2xl" href={href}>
      {title}
    </Link>
  );
};

export default function Home() {
  const [nodeMsg, setNodeMsg] = useState("");
  const [pythonMsg, setPythonMsg] = useState("");

  useEffect(() => {
    // Test Node.js backend
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setNodeMsg(data.message))
      .catch((err) => setNodeMsg("❌ Node API error"));

    // Test Python backend
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setPythonMsg(data.message))
      .catch((err) => setPythonMsg("❌ Python API error"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Backend Test</h1>
      <p>Node.js API: {nodeMsg || "Loading..."}</p>
      <p>Python API: {pythonMsg || "Loading..."}</p>
      <div className="flex flex-col">
        <NavButton href="/history" title={"history"} />
        <NavButton href="/database" title={"build new workout"} />
      </div>
    </div>
  );
}
