import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportCategory } from '../../models/interfaces/reportCategory.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {

  createOrUpdate!: string;
  categoryByToSend!: number;

  constructor(
    private http: HttpClient
    ) {}

  getReports(): Observable<any> {
    return this.http
      .get<any>(environment.apiUrl + 'report/api/v1')
      .pipe(map((res) => res.data));
  }

  getReportCategories(): Observable<any> {
    return this.http
      .get<any>(environment.apiUrl + 'report-category/api/v1')
      .pipe(map((res) => res.data));
  }

  archiveReports(id: string): Observable<any> {
    return this.http.put<any>(
      environment.apiUrl + `report/api/v1/${id}/archive`,
      {}
    );
  }

  resolveReports(id: string): Observable<any> {
    return this.http.put<any>(
      environment.apiUrl + `report/api/v1/${id}/resolve`,
      {}
    );
  }

  getCategoryReporById(categoryId: number){
    return this.http.get<any>(environment.apiUrl + `report-category/api/v1/${categoryId}`);
  }

  createCategoryReport(payload: ReportCategory){
    return this.http.post<any>(environment.apiUrl + `report-category/api/v1`, payload);
  }

  updateCategoryReport(categoryId: number, payload: ReportCategory){
    return this.http.put<any>(environment.apiUrl + `report-category/api/v1/${categoryId}`, payload);
  }

  deleteCategoryReport(categoryId: number){
    this.categoryByToSend = categoryId;
    return this.http.delete<any>(environment.apiUrl + `report-category/api/v1/${categoryId}`);
  }

  getValueFromReportCategory(){
    return this.createOrUpdate
  }

  getCategoryIdValue(){
    return this.categoryByToSend;
  }

}
