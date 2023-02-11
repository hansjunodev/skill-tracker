export interface Skill {
  id: string;
  title: string;
  duration: number;
  currentEffort: number;
  goalEFfort: number;
}

export enum SkillsActionType {
  ADD_DURATION = "ADD_DURATION",
  CREATE_SKILL = "CREATE_SKILL",
  DELETE_SKILL = "DELETE_SKILL",
  CLEAR = "CLEAR",
  LOAD_STATE = "LOAD_STATE",
  CHANGE_TITLE = "CHANGE_TITLE",
}

export interface AddDurationAction {
  type: SkillsActionType.ADD_DURATION;
  payload: {
    id: string;
    durationToAdd: number;
  };
}

export interface CreateSkillAction {
  type: SkillsActionType.CREATE_SKILL;
  payload: string;
}

export interface DeleteSkillAction {
  type: SkillsActionType.DELETE_SKILL;
  payload: {
    id: string;
  };
}

export interface ClearAction {
  type: SkillsActionType.CLEAR;
}

export interface LoadStateAction {
  type: SkillsActionType.LOAD_STATE;
  payload: Skill[];
}

export interface ChangeTitleAction {
  type: SkillsActionType.CHANGE_TITLE;
  payload: {
    id: string;
    title: string;
  };
}

export type SkillsAction =
  | AddDurationAction
  | CreateSkillAction
  | DeleteSkillAction
  | ClearAction
  | LoadStateAction
  | ChangeTitleAction;
