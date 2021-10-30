export const innerJoin = (
  left: any[],
  right: any[],
  options: {
    joinKey: string; // for left table
    fieldName: string;
  }
) => {
  const { joinKey, fieldName } = options;
  const result = [];
  for (const leftItem of left) {
    const rightItem = right.find((item) => item.id === leftItem[joinKey]);
    if (rightItem) {
      result.push({ ...leftItem, [fieldName]: rightItem });
    }
  }
  return result;
};
