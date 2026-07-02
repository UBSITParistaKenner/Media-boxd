import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import { MediaService } from '../media-service';

@Component({
  selector: 'app-media-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './media-form.html',
  styleUrl: './media-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaForm {
  private fb = inject(FormBuilder);
  public mediaService = inject(MediaService);

  editingId = signal<string | null>(null);

  mediaForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    creator: ['', Validators.required],
    mediaType: ['Movie', Validators.required],
    count: [1, [Validators.required, Validators.min(1)]],
    verdict: ['', Validators.required],
    notes: ['', Validators.required]
  });

  ngOnSubmit() {
    this.mediaService.fetchMedia();
  }

  onSubmit() {
    alert("Button clicked!!!")
    console.log("Button clicked!");
    console.log("Form data values:", this.mediaForm.value);
    console.log("Is form valid?", this.mediaForm.valid);
  
    if (this.mediaForm.valid) {
      if (this.editingId()) {
        this.mediaService.updateMedia(this.editingId()!, this.mediaForm.getRawValue()).subscribe(() => {
          this.mediaService.fetchMedia();
          this.cancelEdit();
        });
      } else {
        this.mediaService.saveMedia(this.mediaForm.getRawValue()).subscribe(() => {
          this.mediaService.fetchMedia();
          this.mediaForm.reset({ mediaType: 'Movie', count: 1 });
        });
      }
    } else {
      console.log("Form is INVALID. Check which field is empty or misspelled!");
    }
  }
  
  startEdit(item: any) {
    this.editingId.set(item._id);
    this.mediaForm.patchValue({
      title: item.title,
      creator: item.creator,
      mediaType: item.mediaType,
      count: item.count,
      verdict: item.verdict,
      notes: item.notes
    });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.mediaForm.reset({ mediaType: 'Movie', count: 1 });
  }

  deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this log?')) {
      this.mediaService.deleteMedia(id).subscribe(() => {
        this.mediaService.fetchMedia();
      });
    }
  }
}
