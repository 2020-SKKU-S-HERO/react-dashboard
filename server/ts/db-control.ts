import { Connection, createConnection, FieldInfo, MysqlError } from 'mysql';
import dbInfo from './secret/db-info';

const connection: Connection = createConnection(dbInfo);

export function getData(queryStr: string, onGetData: ((data: any) => void)): void {
  connection.query(queryStr, (error: MysqlError | null, results: any, fields: FieldInfo | undefined): void => {
    if (error) {
      throw error;
    }
    
    onGetData(results);
  });
}