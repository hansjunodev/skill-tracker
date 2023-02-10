import SkillCard from "@/components/SkillCard";
import Head from "next/head";
import React, { Reducer, useEffect, useReducer } from "react";
import { SkillsActionType, SkillsAction, Skill } from "@/types/skill";
import { v4 as uuidv4 } from "uuid";
import AddSkill from "@/components/AddSkill";

const skillsReducer: Reducer<Skill[], SkillsAction> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SkillsActionType.CREATE_SKILL: {
      if (state.length > 10) return state;

      return [
        ...state,
        {
          id: uuidv4(),
          currentEffort: 0,
          duration: 0,
          goalEFfort: 0,
          title: payload,
        },
      ];
    }
    case SkillsActionType.DELETE_SKILL: {
      const { id } = payload;

      return state.filter((s) => s.id !== id);
    }
    case SkillsActionType.ADD_DURATION: {
      const { id, durationToAdd } = payload;

      const newItems = state.map((s) => {
        if (s.id === id) {
          return { ...s, duration: s.duration + durationToAdd };
        } else {
          return s;
        }
      });

      return newItems;
    }
    case SkillsActionType.CLEAR:
      return [];
    case SkillsActionType.LOAD_STATE:
      console.log(payload);
      if (payload.length > 10) return payload.slice(0, 10);
      return [...payload];
  }
};

export default function Home(): JSX.Element {
  const [state, dispatch] = useReducer(skillsReducer, []);

  const handleAddSkillClick = (title: string) => {
    dispatch({ type: SkillsActionType.CREATE_SKILL, payload: title });
  };

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("state")) as Skill[];

    if (savedState !== null) {
      dispatch({
        type: SkillsActionType.LOAD_STATE,
        payload: savedState,
      });
    }
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem("state", JSON.stringify(state));
    }
  }, [state]);

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
        {state.map((skill) => (
          <SkillCard key={skill.id} skill={skill} dispatch={dispatch} />
        ))}
        <br />
        <>
          <AddSkill onAddSkill={handleAddSkillClick} />
        </>
      </main>
    </>
  );
}
