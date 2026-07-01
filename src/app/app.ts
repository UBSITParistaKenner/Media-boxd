import { Component, signal } from '@angular/core';
import { MediaForm } from './media-form/media-form';


@Component({
  selector: 'app-root',
  imports: [MediaForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('media-boxd');
}
