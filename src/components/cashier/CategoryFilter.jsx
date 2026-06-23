import { Button } from "../ui/button";
import { menuCategories } from "../../data/categoryData.js";

export function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant={selected === "All" ? "default" : "outline"}
        onClick={() => onSelect("All")}
        size="sm"
        className="rounded-full"
      >
        All Items
      </Button>
      {menuCategories.map((cat) => (
        <Button
          key={cat.id}
          variant={selected === cat.name ? "default" : "outline"}
          onClick={() => onSelect(cat.name)}
          size="sm"
          className="rounded-full"
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
