import React from 'react';
import { HeaderData, TableData } from './table-type';
import styled from 'styled-components';

type TableProps = {
  tableData: TableData;
};

const TableBlock = styled.table`
  margin-bottom: 0;
  border-top: 1px solid rgba(220, 224, 228);
  
  thead {
    border-bottom: 3px double rgba(220, 224, 228);
    
    th {
      text-align: center;
      font-weight: 500;
      font-size: 15px;
      padding: 10px 0;
      
      &:first-child {
        padding-left: 20px;
      }
      
      &:last-child {
        padding-right: 20px;
      }
    }
  }
  
  tbody {
    
    tr {
      border-bottom: 1px solid rgba(220, 224, 228);
      
      td {
        text-align: center;
        font-weight: 500;
        font-size: 15px;
        padding: 15px 0;
        
        &:first-child {
          padding-left: 20px;
        }
        
        &:last-child {
          padding-right: 20px;
        }
      }
    }
  }
`;

const Table: React.FC<TableProps> = ({ tableData }): JSX.Element => {
  return (
    <TableBlock className="table table-borderless">
      {tableData.headers &&
      <thead>
          <tr>
            {tableData.headers.map((headerData: HeaderData): JSX.Element => {
              if (headerData.width) {
                return (<th style={{width: headerData.width}}>{headerData.name}</th>);
              } else {
                return (<th>{headerData.name}</th>);
              }
            })}
          </tr>
      </thead>
      }
      <tbody>
        {tableData.dataset.map((rowData: string[]): JSX.Element => (
          <tr>
            {rowData.map((data: string): JSX.Element => (
              <td>{data}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableBlock>
  );
};

export default Table;