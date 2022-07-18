import {
  getPreventDefaultHandler,
  isMarkActive,
  MarkToolbarButtonProps,
  toggleMark,
  useEventPlateId,
  usePlateEditorState,
  Value,
  withPlateEventProvider,
} from "@udecode/plate";

export const StyledToolbarMark = withPlateEventProvider(
  <V extends Value>({
    id,
    type,
    clear,
    icon,
    ...props
  }: MarkToolbarButtonProps<V>) => {
    id = useEventPlateId(id);
    const editor = usePlateEditorState(id)!;

    const onClick = (() =>
      editor
        ? getPreventDefaultHandler(toggleMark, editor, { key: type, clear })
        : undefined)();

    return (
      <span
        role="button"
        onMouseDown={onClick}
        className={`block select-none p-1 rounded-lg transition ${
          !!editor?.selection && isMarkActive(editor, type)
            ? "bg-gray-100"
            : "text-gray-500"
        }`}
        {...props}
      >
        {icon}
      </span>
    );
  }
);
