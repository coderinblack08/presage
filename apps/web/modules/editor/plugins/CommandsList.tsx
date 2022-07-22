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

  componentDidUpdate(
    prevProps: CommandsListProps,
    prevState: CommandsListProps
  ) {
    if (prevProps.items.length !== this.props.items.length) {
      this.setState({ selectedIndex: 0 });
    }
  }

  render() {
    const { items } = this.props;
    const { selectedIndex } = this.state;

    return (
      <ul className="bg-white py-1.5 overflow-auto rounded-lg border shadow w-64">
        {items.length === 0 ? (
          <p className="text-gray-500 px-4 py-2">No commands found</p>
        ) : (
          items.map(({ title }, index) => (
            <li
              key={index}
              {...(selectedIndex === index
                ? { ref: this.focusedRef as any }
                : {})}
            >
              <button
                className={`px-4 py-2 cursor-pointer focus:outline-none focus:bg-gray-100 hover:bg-gray-200 transition ${
                  selectedIndex === index ? "bg-gray-100" : ""
                } w-full text-left`}
                onClick={() => this.selectItem(index)}
              >
                <span>{title}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    );
  }
}
