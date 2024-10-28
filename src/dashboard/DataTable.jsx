import React from 'react';
import Button from './Button';

const DataTable = ({ columns, data, actions = [] }) => {
  // Filter out the 'action' column if no actions are provided
  const displayColumns = actions.length > 0 
    ? columns 
    : columns.filter(column => column.key !== 'action');

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
            {displayColumns.map((column) => (
              <th key={column.key} className="py-3 px-6 text-left">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-normal">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-100">
              {displayColumns.map((column) => (
                <td key={column.key} className="py-3 px-6 text-left whitespace-nowrap">
                  {column.key === 'status' ? (
                    <span className={`flex items-center ${row[column.key] === 'SCHEDULED' ? 'text-green-600' : 'text-red-600'}`}>
                      <span className={`h-2.5 w-2.5 rounded-full mr-2 ${row[column.key] === 'SCHEDULED' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                      {row[column.key]}
                    </span>
                  ) : column.key === 'action' ? (
                    <div className="flex space-x-2">
                      {actions.map((action, index) => (
                        <Button
                          key={index}
                          variant={action.variant}
                          onClick={() => action.onClick(row.id)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;