import SkillCard from "@/components/SkillCard";
import Head from "next/head";
import React, { Reducer, useEffect, useReducer, useRef } from "react";
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
      if (payload.length > 10) return payload.slice(0, 10);
      return [...payload];
    case SkillsActionType.CHANGE_TITLE: {
      const { id, title } = payload;

      const newItems = state.map((s) => {
        if (s.id === id) {
          return { ...s, title };
        } else {
          return s;
        }
      });

      return newItems;
    }
  }
};

export default function Home(): JSX.Element {
  const [state, dispatch] = useReducer(skillsReducer, []);
  const isFirstRender = useRef<boolean>(true);

  const handleAddSkillClick = (title: string) => {
    dispatch({ type: SkillsActionType.CREATE_SKILL, payload: title });
  };

  useEffect(() => {
    const saved = localStorage.getItem("state");
    const initialState = saved ? (JSON.parse(saved) as Skill[]) : [];

    if (initialState !== null) {
      dispatch({
        type: SkillsActionType.LOAD_STATE,
        payload: initialState,
      });
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
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
