
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PasswordResponse {
  random_password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiPasswordService {
  private http = inject(HttpClient);

  generate(length: number): Observable<PasswordResponse> {
    return this.http.get<PasswordResponse>(
      `/api/password?length=${length}`
    );
  }
}
