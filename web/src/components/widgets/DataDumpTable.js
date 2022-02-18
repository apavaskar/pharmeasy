import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React from "react";
import {Button} from "primereact/button";
import _ from 'lodash';
const DataDumpTable = ({title, data, key, cols, headerGroup}) => {
    const exportExcel = () => {
        if (data.length === 0) return;
        let transfomedData = JSON.parse(JSON.stringify(data)).map(row => {
           var t = {};
           cols.forEach(col => {
               t[col.exportHeader || col.header] = _.get(row, col.field)
           });
           return t;
        });
        const fieldList = cols.map(col => col.field)
        const keysToSkip = [];
        const row = data[0];
        Object.keys(row).forEach(key => {if (!fieldList.includes(key)) keysToSkip.push(key)});
        transfomedData.forEach(row => {
            keysToSkip.forEach(key => delete row[key])
        });
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.book_new();
            xlsx.utils.sheet_add_json(worksheet, transfomedData, {origin: 'A1', skipHeader: false});
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, title);
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    const exportHeader = (
        <div className="p-d-flex p-ai-center export-buttons">
            <Button type="button" icon="pi pi-file-excel"
                    onClick={exportExcel} className="p-button-success p-mr-2" data-pr-tooltip="XLS" />
        </div>
    );
    return   (          <Panel header={title}>
    <DataTable value={data}  dataKey={key} header={exportHeader}
                scrollHeight="400px"
               className="p-datatable-sm"
               virtualScrollerOptions={{ itemSize: 100 }}
               headerColumnGroup={headerGroup} scrollable stripedRows={true}>
        {
            cols.map((col, index) => {
                if(col.body !== undefined) {
                    return <Column key={index}
                            header={col.header}
                            body={col.body}
                            className={col.className}
                            headerStyle={{width: col.width}}/>;
                } else
                {
                    return <Column key={index}
                            header={col.header}
                            field={col.field}
                            className={col.className}
                            headerStyle={{width: col.width }}/>
                }
            })
        }
    </DataTable>
</Panel>);
}

export default DataDumpTable;
