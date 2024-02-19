import React from 'react';

interface ListItem {
  Title: string;
  Description: string;
  Link: string;
}

interface ListComponentProps {
  items: ListItem[];
}

function ListComponent({ items }: ListComponentProps): JSX.Element {
  return (
    <ul className="bg-gray-100 rounded-lg p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white overflow-y-auto max-h-80 mb-6">
      {items.map((item) => {
        const { Title, Description, Link } = item;

        // eslint-disable-next-line
        const validLink =
          Link.startsWith('http://') || Link.startsWith('https://')
            ? Link
            : `http://${Link}`;

        return (
          <li
            key={`${Title} - ${Link}`}
            className="flex flex-col items-center py-2 border-b border-gray-200"
          >
            <a
              className="flex items-center py-2"
              href={validLink}
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-gray-100">{Title}</span>
              <span className="text-gray-100 mx-2"> - </span>
              <span className="text-gray-100">{Link}</span>
            </a>
            <span className="text-gray-100">{Description}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default ListComponent;
