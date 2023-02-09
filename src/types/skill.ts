export enum SkillsActionKind {
  ADD_DURATION = "addDuration",
}

export interface SkillsAction {
  type: SkillsActionKind;
  payload: {
    id: number;
    duration: number;
  };
}

export interface SkillsState {
  items: [Skill];
}

export interface Skill {
  id: number;
  title: string;
  duration: number;
  currentEffort: number;
  goalEFfort: number;
}
