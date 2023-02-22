import AddSkill from "@/components/AddSkill";
import Kbd from "@/components/Kbd";
import SkillCard from "@/components/SkillCard";
import { skillsReducer } from "@/reducers/skillsReducer";
import { Skill, SkillsActionType } from "@/types/skill";
import Head from "next/head";
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef
} from "react";

export default function Home(): JSX.Element {
  const [state, dispatch] = useReducer(skillsReducer, []);
  const isFirstRender = useRef<boolean>(true);
  const intervalRef = useRef<number>(null);
  const handleKeyUp = useCallback<KeyboardEventHandler>(
    (e) => {
      const num = Number.parseInt(e.key, 10) - 1;

      if (!Number.isNaN(num)) {
        if (num < state.length) {
          const { id } = state[num];
          const { isRunning } = state[num];

          // TODO: Create a TOGGLE Action
          dispatch({
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
      <main className="mx-auto my-5 flex max-w-xs flex-col items-center space-y-2">
        {state.map((skill, i) => (
          <div
            key={skill.id}
            className="flex w-full items-center justify-end space-x-5"
          >
            <Kbd>{i + 1}</Kbd>
            <SkillCard skill={skill} dispatch={dispatch} />
          </div>
        ))}
        <AddSkill onAddSkill={handleAddSkillClick} />
      </main>
    </>
  );
}
