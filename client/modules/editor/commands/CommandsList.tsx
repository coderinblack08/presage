import { Text, List, ListItem } from "@chakra-ui/react";
import { IconCursorText } from "@tabler/icons";
import React from "react";

interface CommandsListProps {
  items: any[];
  command: (props: any) => void;
}

export class CommandsList extends React.Component<CommandsListProps> {
  focusedRef: React.RefObject<HTMLElement>;

  constructor(props: CommandsListProps) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.focusedRef = React.createRef();
  }

  state = {
    selectedIndex: 0,
  };

  onKeyDown({ event }: { event: KeyboardEvent }) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
    this.focusedRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
    this.focusedRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index: number) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }

  componentDidUpdate(prevProps: CommandsListProps) {
    if (prevProps.items.length !== this.props.items.length) {
      this.setState({ selectedIndex: 0 });
    }
  }

  render() {
    const { items } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div className="rounded-lg border shadow py-2 w-72">
        {items.length === 0 ? (
          <Text py={2} px={4} color="gray.500">
            No commands found
          </Text>
        ) : (
          items.map(({ title }, index) => (
            <button
              key={index}
              onClick={() => this.selectItem(index)}
              className={`flex items-center space-x-4 w-full p-2 text-left ${
                selectedIndex === index ? "bg-gray-100" : "bg-white"
              }`}
              {...(selectedIndex === index
                ? { ref: this.focusedRef as any }
                : {})}
            >
              <div className="inline-flex shadow-sm rounded-xl items-center justify-center p-2 border bg-white">
                <IconCursorText />
              </div>
              <div>
                <span className="font-semibold text-gray-600">{title}</span>
                <p className="text-gray-400 text-sm mt-1">
                  Start writing with plain text
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    );
  }
}
