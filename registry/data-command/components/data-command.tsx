"use client";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  LoaderIcon,
  MoveUpLeftIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import {
  ComponentRef,
  FC,
  Fragment,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";

export type FetchCommandDataSubItems = (_props: {
  search: string;
}) => Promise<CommandDataItem[]>;

export interface CommandDataItem {
  label: ReactNode;
  value: string;
  loadItems?: FetchCommandDataSubItems;
  loadOneItem?: (_key: string) => Promise<CommandDataItem>;
  onSelect?: () => void;
  icon?: ReactNode;
  searchPlaceholder?: string;
}

export interface CommandHistoryItem {
  list?: string[];
  isLoading?: boolean;
  fetch_type: "list" | "one";
}

export const DataCommand: FC<{
  items: CommandDataItem[];
  onClose?: () => void;
  defaultPath?: string[];
}> = ({ items, onClose, defaultPath = [] }) => {
  const listRef = useRef<ComponentRef<typeof CommandList> | null>(null);
  const [commandChainKeys, setCommandChainKeys] =
    useState<string[]>(defaultPath);
  const [search, setSearch] = useState("");
  const fetching = useRef(new Map<string, boolean | undefined>());
  const [commandHistory, setCommandHistory] = useState<
    Record<string, CommandHistoryItem | undefined>
  >({});

  const appendCommandHistory = ({
    key,
    value,
  }: {
    key: string;
    value: CommandHistoryItem;
  }) => {
    fetching.current.set(key, !!value.isLoading);
    setCommandHistory((prev) => ({ ...prev, [key]: value }));
  };

  const commandKeyToItemMap = useRef(
    new Map<string, CommandDataItem | undefined>()
  );

  const addCommandItemToMap = (itemKey: string, item: CommandDataItem) => {
    commandKeyToItemMap.current.set(itemKey, item);
    return itemKey;
  };

  const addComandItemsToMap = (
    chainKey: string,
    commandItems: CommandDataItem[]
  ) =>
    commandItems.map((item) =>
      addCommandItemToMap([chainKey, item.value].join("."), item)
    );

  const refinedChain = useMemo(
    () =>
      commandChainKeys.reduce(
        (acc, curr, idx, arr) => {
          const prevKey = acc.chain.map((i) => i?.value).join(".");
          const chainKey = [prevKey, curr].filter(Boolean).join(".");
          const currentItem =
            acc.list.find((i) => i?.value === curr) ||
            commandKeyToItemMap.current.get(chainKey);
          const lastItem = acc.chain.at(-1);

          if (!currentItem) {
            if (
              lastItem?.loadOneItem &&
              !commandHistory[prevKey] &&
              !fetching.current.get(prevKey)
            ) {
              appendCommandHistory({
                key: prevKey,
                value: { isLoading: true, fetch_type: "one" },
              });
              lastItem
                .loadOneItem(curr)
                .then((item) => {
                  const address = addCommandItemToMap(chainKey, item);
                  appendCommandHistory({
                    key: prevKey,
                    value: {
                      list: [address],
                      isLoading: false,
                      fetch_type: "one",
                    },
                  });
                })
                .catch(() => {
                  appendCommandHistory({
                    key: prevKey,
                    value: { isLoading: false, fetch_type: "one" },
                  });
                });
            }
            return {
              ...acc,
              chain: [
                ...acc.chain,
                {
                  label: <LoaderIcon className="animate-spin" />,
                  value: curr,
                } as CommandDataItem,
              ],
              list: [],
            };
          }
          addCommandItemToMap(chainKey, currentItem);

          const isLastItem = idx === arr.length - 1;
          const key = isLastItem
            ? [chainKey, search].filter(Boolean).join(":")
            : chainKey;

          if (
            currentItem.loadItems &&
            !(commandHistory[key]?.fetch_type === "list") &&
            !fetching.current.get(key) &&
            (isLastItem || !currentItem.loadOneItem)
          ) {
            appendCommandHistory({
              key,
              value: { isLoading: true, fetch_type: "list" },
            });
            currentItem
              .loadItems({ search })
              .then((children) => {
                const childAddresses = addComandItemsToMap(chainKey, children);
                appendCommandHistory({
                  key,
                  value: {
                    list: childAddresses,
                    isLoading: false,
                    fetch_type: "list",
                  },
                });
              })
              .catch(() => {
                appendCommandHistory({
                  key,
                  value: { isLoading: false, fetch_type: "list" },
                });
              });
          }
          return {
            chain: [...acc.chain, currentItem],
            list:
              commandHistory[key]?.list?.map((childKey) =>
                commandKeyToItemMap.current.get(childKey)
              ) ?? [],
            isLoading: !!commandHistory[key]?.isLoading,
          };
        },
        {
          chain: [] as CommandDataItem[],
          list: items as (CommandDataItem | undefined)[],
          isLoading: false,
        }
      ),
    [commandChainKeys, commandHistory, search, items]
  );

  const handleTab = (item: CommandDataItem) => {
    setCommandChainKeys((prev) => [...prev, item.value]);
    setSearch("");
  };

  return (
    <Command
      shouldFilter={refinedChain.chain.length === 0}
      onKeyDown={(e) => {
        const currentFocusName = Array.from(
          listRef.current?.children[0]?.children ?? []
        )
          .find((el) => el.ariaSelected === "true")
          ?.getAttribute("data-value");

        const currentFocus = refinedChain.list.find(
          (i) => i?.value === currentFocusName
        );

        if (e.key === "Tab" && currentFocus?.loadItems) {
          e.preventDefault();
          handleTab(currentFocus);
        }
        if (e.key === "Backspace" && !search) {
          e.preventDefault();
          setCommandChainKeys((p) => p.slice(0, p.length - 1));
        }
        if (e.key === "Enter" && !search && !currentFocus) {
          e.preventDefault();
          const lastItem = refinedChain.chain.at(-1);
          if (lastItem?.onSelect) {
            lastItem.onSelect();
            onClose?.();
          }
        }
      }}
    >
      <div className="flex gap-1 p-1 items-center border-b">
        <SearchIcon className="ml-2 text-gray-500 size-4" />
        {refinedChain.chain.map((i, idx) => (
          <Fragment key={i.value}>
            <Badge
              onClick={() =>
                setCommandChainKeys((prev) => prev.slice(0, idx + 1))
              }
              className="cursor-pointer"
              variant="secondary"
            >
              {i.icon}
              {i.label}
            </Badge>
            <ChevronRightIcon className="text-gray-500" />
          </Fragment>
        ))}
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder={
            refinedChain.chain.at(-1)?.searchPlaceholder ?? "Search..."
          }
        />
        {(search || commandChainKeys.length > 0) && (
          <XIcon
            onClick={() => {
              setSearch("");
              setCommandChainKeys([]);
            }}
            className="ml-auto size-4 mr-3 z-20 text-gray-500 hover:text-white cursor-pointer"
          />
        )}
      </div>
      <CommandList ref={listRef} className="p-1">
        {refinedChain.list.map(
          (item) =>
            item && (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  if (item.onSelect) {
                    item.onSelect();
                    onClose?.();
                  }
                }}
                value={item.value}
                className="cursor-pointer group/item"
              >
                {item.icon}
                <span>{item.label}</span>
                <span className="ml-auto" />
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] text-gray-500 hidden md:group-data-[selected=true]/item:flex text-xs p-1",
                    item.onSelect
                      ? ""
                      : "group-data-[selected=true]/item:hidden"
                  )}
                >
                  Enter
                </Badge>
                <Badge
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTab(item);
                  }}
                  variant="outline"
                  className={cn(
                    "text-[10px] text-gray-500 border-0 md:hidden group-data-[selected=true]/item:flex text-xs p-1",
                    item.loadItems
                      ? ""
                      : "group-data-[selected=true]/item:hidden"
                  )}
                >
                  <span className="hidden md:block">Tab</span>
                  <MoveUpLeftIcon className="md:hidden text-white" />
                </Badge>
              </CommandItem>
            )
        )}
      </CommandList>
      {refinedChain.isLoading ? (
        <LoaderIcon className="animate-spin text-center mx-auto mt-6 mb-8 size-6" />
      ) : (
        <CommandEmpty className="flex flex-col items-center p-5 gap-2 text-gray-500">
          <p>No results</p>
        </CommandEmpty>
      )}
    </Command>
  );
};
