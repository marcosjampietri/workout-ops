const exampleResponse = {
  success: true,
  data: [
    {
      name: "neck",
    },
    {
      name: "lower arms",
    },
    {
      name: "shoulders",
    },
    {
      name: "cardio",
    },
    {
      name: "upper arms",
    },
    {
      name: "chest",
    },
    {
      name: "lower legs",
    },
    {
      name: "back",
    },
    {
      name: "upper legs",
    },
    {
      name: "waist",
    },
  ],
};

interface BodyPart {
  name: string;
}

export default async function Database() {
  const res = await fetch("https://oss.exercisedb.dev/api/v1/bodyparts");
  const bodyparts: { success: boolean; data: BodyPart[] } = await res.json();

  const exerciseRes = await fetch(
    `https://oss.exercisedb.dev/api/v1/exercises?bodyPart=upper%20legs&limit=15`,
  );
  const exercises: { success: boolean; data: any[] } = await exerciseRes.json();

  console.log("Exercises:", exercises);

  if (!bodyparts.success || !exercises.success) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Error fetching data</h1>
        <p>There was an error fetching the body parts or exercises data.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* bodyparts: {bodyparts.data.map((part) => part.name).join(", ")}¿\ */}
      Exercises:{" "}
      <div className="flex flex-col justify-center">
        {exercises.data.map((exercise) => {
          return (
            <div key={exercise.id} className="p-2 m-2 text-center border">
              {exercise.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
