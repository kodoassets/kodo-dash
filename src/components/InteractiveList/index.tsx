import Button from "../Button";

interface InteractiveListItem {
  id: string;
  text: string;
}

interface ListItemProps {
  onRemove: (item: InteractiveListItem) => void;
  item: InteractiveListItem;
}
const ListItem = ({ item, onRemove }: ListItemProps) => {
  return (
    <div className="flex flex-row mt-2 w-full justify-between">
      <a
        className="underline text-blue-500 truncate"
        href={item.text}
        target="_blank"
      >
        {item.text}
      </a>
      <Button onClick={() => onRemove(item)} text="remove" />
    </div>
  );
};

interface Props {
  items: InteractiveListItem[];
  onRemoveItem: (item: InteractiveListItem) => void;
}

const InteractiveList = ({ items, onRemoveItem }: Props) => {
  return (
    <div className="w-full truncate">
      {items.map((i) => {
        return <ListItem key={i.id} item={i} onRemove={onRemoveItem} />;
      })}
    </div>
  );
};

export default InteractiveList;
