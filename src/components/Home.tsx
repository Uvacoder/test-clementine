import * as React from 'react';
import { useKBar } from 'kbar';
import { DropResult } from 'react-beautiful-dnd';
import { Tab } from '@headlessui/react';
import { PlusIcon } from '@radix-ui/react-icons';

import { getItems, reorder } from '../helpers';
import EntryList from './EntryList';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Home = () => {
  const { query } = useKBar();

  const [items, setItems] = React.useState(getItems(15));
  const [allTab, setAllTab] = React.useState(true);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);
  };

  const handleAllTabs = (index: number) => {
    if (index > 0) {
      setAllTab(false);
    }
    if (index === 0) {
      setAllTab(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 pb-8 pr-8">
        <button
          title="⌘K"
          className=" rounded bg-neutral-100/70 p-1.5 transition-colors duration-150 ease-in-out hover:bg-neutral-200/70 dark:bg-neutral-700/50 dark:hover:bg-neutral-600/50"
          onClick={query.toggle}
        >
          <PlusIcon className="h-8 w-8 opacity-75" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="mt-24 w-5/6 max-w-7xl py-16 font-mono">
          <Tab.Group onChange={(index) => handleAllTabs(index)}>
            <Tab.List className="mb-6 flex space-x-1 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800">
              <Tab
                key={0}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-md py-3 font-sans font-medium leading-5',
                    selected
                      ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-500 dark:text-neutral-100'
                      : ' text-neutral-600 hover:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-neutral-700'
                  )
                }
              >
                {'All'}
              </Tab>
              {Object.values(items)
                .slice(0, 4)
                .map((item) => (
                  <Tab
                    key={item.id}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-md py-3 font-sans font-medium leading-5',
                        selected
                          ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-500 dark:text-neutral-100'
                          : ' text-neutral-600 hover:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-neutral-700'
                      )
                    }
                  >
                    {item.department}
                  </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                key={0}
                className="rounded-md bg-neutral-50 p-3 dark:bg-neutral-800"
              >
                <ul>
                  <EntryList
                    items={items}
                    onDragEnd={onDragEnd}
                    key={0}
                    category={'all'}
                  />
                </ul>
              </Tab.Panel>
              {Object.values(items).map((categories, idx) => (
                <Tab.Panel
                  key={idx}
                  className="rounded-md bg-neutral-50/50 p-3 dark:bg-neutral-800/50"
                >
                  <ul>
                    <EntryList
                      items={items}
                      onDragEnd={onDragEnd}
                      key={idx}
                      category={!allTab ? categories.department : 'all'}
                    />
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

export default Home;
