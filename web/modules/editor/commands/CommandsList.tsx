import React from "react";

interface CommandsListProps {
  items: any[];
  command: (props: any) => void;
}

export class CommandsList extends React.Component<CommandsListProps> {
  focusedRef: React.RefObject<HTMLElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: CommandsListProps) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.focusedRef = React.createRef();
    this.fileInputRef = React.createRef();
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
    this.setState({ selectedIndex: index });

    if (item) {
      if (item.title == "Image") {
        this.fileInputRef.current?.click();
      } else {
        this.props.command({ ...item });
      }
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
      <div className="rounded-lg bg-white border shadow py-2 w-80">
        <input
          type="file"
          accept="image/*"
          multiple={false}
          ref={this.fileInputRef}
          className="hidden"
          onChange={() => {
            this.props.command({
              ...this.props.items[selectedIndex],
              file: (this.fileInputRef.current?.files || [])[0],
            });
          }}
        />
        {items.length === 0 ? (
          <p className="py-2 px-4 text-gray-500">No commands found</p>
        ) : (
          items.map(({ title, icon, description }, index) => (
            <button
              key={index}
              onClick={() => this.selectItem(index)}
              className={`flex items-center space-x-4 w-full px-4 py-3 text-left transition ease-in-out ${
                selectedIndex === index
                  ? "bg-gray-100"
                  : "bg-white hover:bg-gray-50"
              }`}
              {...(selectedIndex === index
                ? { ref: this.focusedRef as any }
                : {})}
            >
              <div className="inline-flex shadow-sm rounded-xl items-center justify-center p-2 border bg-white text-gray-400">
                {icon}
              </div>
              <div>
                <span className="font-semibold text-gray-600">{title}</span>
                <p className="text-gray-400 text-sm mt-1">{description}</p>
              </div>
            </button>
          ))
        )}
      </div>
    );
  }
}
