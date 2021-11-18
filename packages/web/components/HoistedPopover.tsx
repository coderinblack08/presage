import React from "react";

export const useHoistedPopover = (
  trigger: (fn: any) => React.ReactNode,
  content: (props: { visible: boolean; setVisible: any }) => React.ReactNode
) => {
  const [visible, setVisible] = React.useState(false);

  return [trigger(setVisible), content({ visible, setVisible })];
};
