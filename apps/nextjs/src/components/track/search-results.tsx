"use client";

import type { CSSProperties } from "react";
import { forwardRef, memo } from "react";
import { useAtom } from "jotai";
import memoize from "memoize-one";
import AutoSizer from "react-virtualized-auto-sizer";
import { areEqual, FixedSizeList as List } from "react-window";

import type { FoodItem } from "@nourish/db/src/schema";

import { FoodItemCard } from "~/components/track/food-item-card";
import { searchResultsAtom } from "~/components/track/search-foods";
import { api } from "~/trpc/react";

interface RowProps {
  data: {
    items: FoodItem[];
  };
  index: number;
  style: CSSProperties;
}

const Row = memo(({ data, index, style }: RowProps) => {
  const { items } = data;
  const item = items[index];

  if (!item) {
    return null;
  }

  return (
    <div
      style={{
        ...style,
      }}
      className="px-4 pb-2"
      key={index}
    >
      <FoodItemCard foodItem={item} />
    </div>
  );
}, areEqual);
Row.displayName = "Row";

const createItemData = memoize((items: FoodItem[]) => ({
  items,
}));

export default function SearchResults() {
  const [searchResults] = useAtom(searchResultsAtom);

  const itemData = createItemData(searchResults);

  // const { isPending, isError, data, error } = api.foodItem.all.useQuery();

  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  return (
    <div className="flex h-full w-full flex-col">
      <h3 className="px-4 pb-2 text-sm font-medium text-muted-foreground">
        Results
      </h3>
      {searchResults.length === 0 ? (
        <div className="px-4 py-2 text-sm text-muted-foreground">
          No results found.
        </div>
      ) : (
        <div className="flex-1">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={searchResults.length}
                itemData={itemData}
                itemSize={72}
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
}
