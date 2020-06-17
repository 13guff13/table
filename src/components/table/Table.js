import React, {useState, useEffect, useCallback} from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import {
  DetailsList,
  DetailsListLayoutMode,
  ConstrainMode,
  DetailsRow,
  SelectionMode,
} from '@fluentui/react/lib/DetailsList';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

import { useTableData } from '../../hooks';
import { copyAndSort } from '../../utils';

initializeIcons();

const classNames = mergeStyleSets({
  moderateValue: {
    backgroundColor: '#FFE45E',
  },
  criticalValue: {
    backgroundColor: '#F50049',
  },
  heighlitedValue: {
    backgroundColor: 'yellow',
  },
  headerClassName: {
    background: '#5AA9E6',
  },
});

export default function Table({config, items: rows}) {
  const {dataIsLoaded, payload, error} = useTableData();
  const [state, setState] = useState({items: [], columns: []});

  const configToColumns = useCallback((config, items) => {
    const onRenderItemColumn = (item, _, column) => {
      const fieldContent = item[column.fieldName];
      if (column.key === 'VALUE_1') {
        const value = Number(item[column.fieldName]);
        switch (true) {
          case value > 3000:
            return <span className={classNames.criticalValue}>{value}</span>
          case value > 2000:
            return <span className={classNames.moderateValue}>{value}</span>
          default:
            return <span>{value}</span>
        }
      }
      return <span>{fieldContent}</span>;
    }

    const onColumnClick = (e, column) => {
      const newColumns = columns.slice();
      const currColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
      newColumns.forEach((newCol) => {
        if (newCol === currColumn) {
          currColumn.isSortedDescending = !currColumn.isSortedDescending;
          currColumn.isSorted = true;
        } else {
          newCol.isSorted = false;
          newCol.isSortedDescending = false;
        }
      });

      const newItems = copyAndSort(items, currColumn.fieldName, currColumn.isSortedDescending);
      setState({
        columns: newColumns,
        items: newItems,
      });
    };

    const defColumn = () => ({
      headerClassName: classNames.headerClassName,
      isSorted: false,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick,
    })

    const columns = Object.keys(config).map((key) => {
      const retItem = defColumn();
      const it = config[key];
      retItem.name = it.label;
      retItem.maxWidth = it.width;
      retItem.minWidth = it.width;
      retItem.data = { type: it.type };
      retItem.key = retItem.fieldName = key;
      if (key === 'VALUE_1') {
        retItem.onRender = onRenderItemColumn
      }
  
      return retItem;
    })

    return columns;
  }, []);

  useEffect(() => {
    if (dataIsLoaded) {
      const { config, items } = payload;
      const columns = configToColumns(config, items);
      setState({columns, items});
    }
  }, [payload, dataIsLoaded])

  const onRenderRow = (props) => {
    const customStyles = {};
    if (props) {
      if (props.itemIndex % 2 === 0) {
        customStyles.root = { backgroundColor: '#D8EEFD' };
      }

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  };

  const { columns, items } = state;
  if (error) {
    throw new Error(error);
  }

  if (!dataIsLoaded) {
    return null;
  }
  
  return (
    <DetailsList
      onRenderRow={onRenderRow}
      items={items}
      constrainMode={ConstrainMode.unconstrained} 
      compact={false}
      columns={columns}
      selectionMode={SelectionMode.multiple}
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible={true}
      onItemInvoked={(e) => {console.log('enter has pressed on selected item')}}
      ariaLabelForSelectionColumn="Toggle selection"
      ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      checkButtonAriaLabel="Row checkbox"
    />
  );
}
