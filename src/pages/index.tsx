import SkillCard from "@/components/SkillCard";
import Head from "next/head";
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { SkillsActionType, Skill } from "@/types/skill";
import AddSkill from "@/components/AddSkill";
import { skillsReducer } from "@/reducers/skillsReducer";

export default function Home(): JSX.Element {
  const [state, dispatch] = useReducer(skillsReducer, []);
  const isFirstRender = useRef<boolean>(true);
  const intervalRef = useRef<number>(null);
  const handleKeyUp = useCallback<KeyboardEventHandler>(
    (e) => {
      const num = Number.parseInt(e.key) - 1;

      if (!isNaN(num)) {
        if (num < state.length) {
          const id = state[num].id;
          const isRunning = state[num].isRunning;

          // TODO: Create a TOGGLE Action
          dispatch({
            type: isRunning ? SkillsActionType.STOP : SkillsActionType.START,
            payload: id,
          });

          console.log({
            type: isRunning ? SkillsActionType.STOP : SkillsActionType.START,
            payload: id,
          });

          // How do we handle local storage updates from a different tab? iframe? popup?
          // See: https://stackoverflow.com/questions/54346866/save-to-localstorage-from-reducer-hook SECOND ANSWER
        }
      }
    },
    [state]
  );

  const handleAddSkillClick = (title: string) => {
    dispatch({ type: SkillsActionType.CREATE_SKILL, payload: title });
  };

  useEffect(() => {
    let intervalStartTime = Date.now();

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const timePassed = Date.now() - intervalStartTime;

      state.forEach((s) => {
        if (s.isRunning) {
          dispatch({
            type: SkillsActionType.ADD_DURATION,
            payload: { id: s.id, durationToAdd: timePassed },
          });
        }
      });

      intervalStartTime = Date.now();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [state]);

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
    document.addEventListener("keyup", handleKeyUp);

    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

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
      <main className="flex flex-col items-center space-y-2">
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
