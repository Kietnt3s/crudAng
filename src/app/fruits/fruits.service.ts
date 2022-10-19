import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fruits } from './fruits';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {

  constructor(private http: HttpClient) { }
  get(){
    return this.http.get<Fruits[]>(`http://localhost:3000/fruits`)
  }
  create(payload:Fruits){
    return this.http.post<Fruits>(`http://localhost:3000/fruits`,payload)

  }
  getById(id:number){
    return this.http.get<Fruits>(`http://localhost:3000/fruits/${id}`)

  }
  update(payload:Fruits){
    return this.http.put<Fruits>(`http://localhost:3000/fruits/${payload.id}`,payload)

  }
  delete(id:number){
    return this.http.delete<Fruits>(`http://localhost:3000/fruits/${id}`)
  }
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}
