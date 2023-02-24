import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
  ) { }

  getLocalStorage(key: any): any {
    return localStorage.getItem('mini-studio'+key);
  }

  saveLocalStorage(key: any, value: any): void {
    localStorage.setItem('mini-studio'+key, JSON.stringify(value));
  }

  removeLocalStorage(key: any): void {
    localStorage.removeItem('mini-studio'+key);
  }

  removeAllLocalStorage(): void {
    localStorage.clear();
  }

}
