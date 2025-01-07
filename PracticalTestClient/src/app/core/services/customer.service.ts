import { inject, Injectable } from '@angular/core';
import { MasterService } from './master/master.service';
import { environment } from '../../Environments/environment';
import { IPagination, Pagination } from '../../shared/models/pagination.model';
import { PosParams } from '../../shared/models/posParam.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../../shared/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    baseService = inject(MasterService);
    url = `${environment.apiUrl}customer`;
    private submitEvent = new BehaviorSubject<any>(null);

    submitForm$ = this.submitEvent.asObservable();
  
   
    
    constructor(private _http: HttpClient) { }
  

    triggerSubmit(): void {
        this.submitEvent.next(null);
    }

    post(obj: Customer): Observable<any>{
      return this.baseService.post<any>(this.url, obj);
    }
  
    loadAll():Observable<Customer[]>{
      return this.baseService.get<Customer[]>(this.url);
    }
 
    
}
