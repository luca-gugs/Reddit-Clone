import { Post } from '../generated/graphql';

export const splitToChunks: any = (flatArray: [], numCols: number) => {
  const newArray = [];
  for (let c = 0; c < numCols; c++) {
    newArray.push([]);
  }
  for (let i = 0; i < flatArray.length; i++) {
    const mod = i % numCols;
    newArray[mod].push(flatArray[i]);
  }
  return newArray;
};
