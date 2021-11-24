import { Text, List, ListItem } from "@chakra-ui/react";
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
      <List
        w={56}
        shadow="sm"
        rounded="lg"
        border="1px"
        borderColor="gray.200"
        py={2}
      >
        {items.length === 0 ? (
          <Text py={2} px={4} color="gray.500">
            No commands found
          </Text>
        ) : (
          items.map(({ title }, index) => (
            <ListItem
              as="button"
              display="block"
              py={1.5}
              px={4}
              key={index}
              onClick={() => this.selectItem(index)}
              w="full"
              textAlign="left"
              bg={selectedIndex === index ? "gray.100" : "white"}
              {...(selectedIndex === index
                ? { ref: this.focusedRef as any }
                : {})}
            >
              <span className="font-semibold">{title}</span>
            </ListItem>
          ))
        )}
      </List>
    );
  }
}
