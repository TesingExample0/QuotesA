import DataLoader from "dataloader";
import { Sub } from "../entities/Sub";


export const createSubLoader = () =>
new DataLoader<number, Sub>(async (subsIds) => {
  const subs = await Sub.findByIds(subsIds as number[]);
  const subIDtoSub: Record<number, Sub> = {};

  subs.forEach((u) => {
    subIDtoSub[u.id] = u;
  });

  const sortedSub = subsIds.map((subid) => subIDtoSub[subid]);
  return sortedSub;
});
