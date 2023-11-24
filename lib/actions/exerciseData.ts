export interface ExerciseType {
  difficulty?: string;
  equipment?: string;
  muscle?: string;
  instructions?: string;
  name?: string;
  type?: string;
}

export async function getAllData({ muscle }: ExerciseType) {
  const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "X-Api-Key": `${process.env.NEXT_PUBLIC_EXERCISE_KEY}` },
  });
  const exercise = response.json();
  return exercise;
  console.log(exercise);
}
