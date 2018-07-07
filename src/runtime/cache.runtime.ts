import { ISessionCache } from "../models";

export const cache: ISessionCache = {
  sessions: {
    byId: {},
    allIds: []
  }
};
