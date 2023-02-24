import { History, Skill, SkillsAction, SkillsActionType } from "@/types/skill";
import { Reducer } from "react";
import { v4 as uuidv4 } from "uuid";

export function calculateTotalDuration(history: History): number {
  let total = 0;

  for (let i = 1; i < history.length; i += 2) {
    const from = history[i - 1];
    const to = history[i];
    const duration = to.timestamp - from.timestamp;

    total += duration;
  }

  console.log(history.length);
  console.log(total);

  return total;
}

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
          history: [],
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
        }
        return s;
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
        }
        return s;
      });

      return newItems;
    }
    case SkillsActionType.START:
      return state.map((s) =>
        s.id === payload
          ? {
              ...s,
              isRunning: true,
              history: [
                ...s.history,
                { action: "START", timestamp: new Date() },
              ],
            }
          : s
      );
    case SkillsActionType.STOP:
      return state.map((s) =>
        s.id === payload
          ? {
              ...s,
              isRunning: false,
              history: [
                ...s.history,
                { action: "STOP", timestamp: new Date() },
              ],
            }
          : s
      );
    case SkillsActionType.UNDO: {
      return state.map((s) => {
        if (s.id === payload) {
          return {
            ...s,
            isRunning: s.isRunning,
            history: s.history.slice(0, -1),
            duration: calculateTotalDuration(s.history.slice(0, -1)),
          };
        }
        return s;
      });
    }

    default:
      return state;
  }
};

export default skillsReducer;
