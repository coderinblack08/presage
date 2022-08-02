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
    // this.focusedRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
    // this.focusedRef.current?.scrollIntoView({ behavior: "smooth" });
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
      <ul className="bg-white dark:bg-gray-900 dark:border-gray-800 dark:border-2 py-1.5 overflow-auto rounded-xl border shadow-sm w-64">
        {items.length === 0 ? (
          <p className="text-gray-500 px-4 py-2">No commands found</p>
        ) : (
          items.map(({ title, icon }, index) => (
            <li
              key={index}
              {...(selectedIndex === index
                ? { ref: this.focusedRef as any }
                : {})}
            >
              <button
                className={`flex items-center gap-2 p-2 cursor-pointer focus:outline-none hover:bg-blue-100 dark:hover:bg-blue-400/10 transition ${
                  selectedIndex === index
                    ? "bg-blue-100/50 dark:bg-blue-400/10"
                    : ""
                } w-full text-left`}
                onClick={() => this.selectItem(index)}
              >
                <span
                  className={`text-gray-500 ${
                    selectedIndex === index ? "dark:text-blue-300" : ""
                  }`}
                >
                  {icon}
                </span>
                <span
                  className={
                    selectedIndex === index
                      ? "dark:text-blue-300"
                      : "dark:text-gray-500"
                  }
                >
                  {title}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    );
  }
}
