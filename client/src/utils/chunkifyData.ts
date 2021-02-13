export const splitToChunks: any = (array: [], parts: number) => {
  let result = [];
  let init = Math.floor(array.length / parts);
  console.log(init);
  let count = [0, init];
  for (let i = parts; i > 0; i--) {
    console.log(i, 'parst');
    result.push(
      array.slice(
        count[count.length - 2],
        count[
          count[count.length - 1] <= array.length
            ? count.length - 1
            : array.length
        ]
      )
    );
    count.push(count[count.length - 1] + init);
  }
  console.log(count, 'count');
  return result;
};
