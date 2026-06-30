import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:4700/api/media';

  mediaList = signal<any[]>([]);

  fetchMedia() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.mediaList.set(data);
    });
  }

  saveMedia(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateMedia(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteMedia(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
