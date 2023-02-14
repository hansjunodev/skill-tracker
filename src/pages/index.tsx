import SkillCard from "@/components/SkillCard";
import Head from "next/head";
import React, { KeyboardEventHandler, MouseEventHandler, Reducer, useEffect, useReducer, useRef, useState } from "react";
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
  const intervalRef = useRef<number>(null);
  const [runningIds, setRunningIds] = useState<string[]>([]);

  const handleAddSkillClick = (title: string) => {
    dispatch({ type: SkillsActionType.CREATE_SKILL, payload: title });
  };

  const handleKeyUp: KeyboardEventHandler = (e) => {
    console.log(e.key);
  }

  const handleAction = (e: MouseEvent, skillId: string) => {
    if (e.target.innerHTML === "Start") {
      if (!runningIds.includes(skillId)) {
        setRunningIds([...runningIds, skillId]);
      }
    } else {
      setRunningIds(runningIds.filter(id => id !== skillId))
    }
  }

  useEffect(() => {
    let intervalStartTime = Date.now();

    clearInterval(intervalRef.current);

    console.log(runningIds)
    intervalRef.current = setInterval(() => {
      const timePassed = Date.now() - intervalStartTime;

      runningIds.forEach(id => dispatch({
        type: SkillsActionType.ADD_DURATION,
        payload: { id, durationToAdd: timePassed },
      }))

      intervalStartTime = Date.now();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [runningIds])

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

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [])

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
          <SkillCard key={skill.id} skill={skill} dispatch={dispatch} onAction={handleAction} />
        ))}
        <br />
        <>
          <AddSkill onAddSkill={handleAddSkillClick} />
        </>
      </main>
    </>
  );
}
