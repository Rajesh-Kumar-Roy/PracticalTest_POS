import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { MasterService } from './master/master.service';
import { Product, ProductBrand, ProductType } from '../../shared/models/product.model';
import { map, Observable, of } from 'rxjs';
import { IPagination, Pagination } from '../../shared/models/pagination.model';
import { PosParams } from '../../shared/models/posParam.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseService = inject(MasterService);
  url = `${environment.apiUrl}product`;
  pagination= new Pagination<Product>();
  posParams = new PosParams();
  productCache = new Map();
  constructor(private _http: HttpClient) { }

  post(obj: Product): Observable<any>{
    return this.baseService.post<any>(this.url, obj);
  }

  loadAll():Observable<Product[]>{
    return this.baseService.get<Product[]>(this.url);
  }

  loadAllBrands(): Observable<ProductBrand[]>{
    return this.baseService.get<ProductBrand[]>(`${this.url}/GetAllBrands`);
  }

  loadAllTypes():Observable<ProductType[]>{
    return this.baseService.get<ProductType[]>(`${this.url}/GetAllTypes`);
  }

  getProducts(useCache: boolean){
    if(useCache === false){
      this.productCache = new Map();
    }
    if(this.productCache.size > 0 && useCache === true){
      if(this.productCache.has(Object.values(this.posParams).join('-'))){
        this.pagination.data = this.productCache.get(Object.values(this.posParams).join('-'));
        return of(this.pagination);
      }
    }
    let params = new HttpParams();

    if(this.posParams.brandId !== 0){
      params = params.append('brandId',this.posParams.brandId.toString());
    }
    if(this.posParams.typeId !== 0){
      params = params.append('typeId',this.posParams.typeId.toString());
    }
    if(this.posParams.search){
      params = params.append('search',this.posParams.search);
    }
     // params = params.append('sort',this.posParams.sort);
      params = params.append('pageNumber', this.posParams.pageNumber.toString());
      params = params.append('pageSize', this.posParams.pageSize.toString());
      return this._http.get<IPagination<Product>>(this.url,{observe:'response',params})
      .pipe(
        map(response=>{
          this.productCache.set(Object.values(this.posParams).join('-'), response.body?.data);
          this.pagination = response.body != null ? response.body : new Pagination<Product>();
          return this.pagination;
      }));
  }
  setPosParams(params: PosParams){
    this.posParams = params;
  }
  getPosParams(){
    return this.posParams;
  }

}
