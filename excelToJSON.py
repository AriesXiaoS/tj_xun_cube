import xlrd
import tkinter as tk
from tkinter import filedialog

def toJSON(excel_path):
    xl=xlrd.open_workbook(excel_path)
    table=xl.sheet_by_index(0)
    nrows=table.nrows
    keys=table.row_values(0)
    result=[]
    for i in range(1,nrows):
        oneline='{'
        for j in range(len(keys)):
            cell=table.cell_value(i,j)
            if type(cell)==float or type(cell)==int :
                cell=str(int(cell))
            if '\n' in cell:
                cell.replace('\n','')
            #print(cell)
            oneline += '"{}":"{}"'.format(keys[j],cell)
            if j!=(len(keys)-1):
                oneline += ','
        oneline += '}\n'
        #oneline finished
        result.append(oneline)
        #print(oneline)
    return result

if __name__=='__main__':
    root=tk.Tk()
    root.withdraw()
    root.update()
    excel_path=filedialog.askopenfilename()
    #print(excel_path)
    file_type=excel_path.split('.')[-1]
    if file_type=='xlsx' or file_type=='xls':
        res=toJSON(excel_path)
        print('共找到{}条数据'.format(len(res)))
        fp=open('result.json','w',encoding='utf-8',newline='\n')
        for i in range(len(res)):
            fp.write(res[i])
        fp.close()
        print('result.json写入完成')
    else:
        print('文件类型错误！')
    
    a=input('\n按回车键退出......')
    
