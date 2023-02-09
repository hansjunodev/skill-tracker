import SkillCard from "@/components/SkillCard";
import Head from "next/head";
import React, { useReducer } from "react";
import { SkillsAction, SkillsActionKind, SkillsState } from "@/types/skill";


const initialData: SkillsState = {
  items: [
    {
      id: 0,
      title: "Learning webdev",
      duration: 0,
      currentEffort: 0,
      goalEffort: 0,
    },
    {
      id: 1,
      title: "Learning piano",
      duration: 0,
      currentEffort: 0,
      goalEffort: 0,
    },
    {
      id: 2,
      title: "Exercising",
      duration: 0,
      currentEffort: 0,
      goalEffort: 0,
    },
  ]
};

const skillsReducer = (state: SkillsState, action: SkillsAction): SkillsState => {
  const { items } = state;
  const { type, payload } = action;

  console.log(payload)

  switch (type) {
    case SkillsActionKind.ADD_DURATION: {
      const newItems = items.map((item) => {
        if (item.id === payload.id) {
          return { ...item, duration: item.duration + payload.duration };
        } else {
          return item;
        }
      });


      return {
        items: newItems
      }
    }
  }
};

export default function Home(): JSX.Element {
  const [state, dispatch] = useReducer(skillsReducer, initialData);

  return (
    <>
      <Head>
        <title>Skill Tracker</title>
        <meta
          name="description"
          content="Keep track of the cumulative amount of time you've spent on learning something new"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {state.items.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            dispatch={dispatch}
          />
        ))}
        <button>Add Skill</button>
      </main>
    </>
  );
}
