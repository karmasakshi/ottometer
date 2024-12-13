import { Component, effect, inject, OnInit, untracked } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from '../page/page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ProfileService } from '@jet/services/profile/profile.service';
import { Profile } from '@jet/interfaces/profile.interface';

@Component({
  selector: 'jet-profile-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    PageComponent,
    TranslocoModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly _loggerService = inject(LoggerService);
  private profileService = inject(ProfileService);
  private readonly _formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar)

   public readonly profileFormGoup: FormGroup<{
      avatar_url: FormControl<string | null>;
      username: FormControl<string | null>;
    }>;

  public constructor() {
    this.profileFormGoup = this._formBuilder.group({
      avatar_url: this.profileService.profile()?.avatar_url ?? '',
      username: this.profileService.profile()?.username ?? ''
    })

    effect(()=>{
      const profile = this.profileService.profile();
      untracked(()=>{
        this.profileFormGoup.controls.avatar_url.setValue(profile?.avatar_url ?? '')
        this.profileFormGoup.controls.username.setValue(profile?.username ?? '')
      })
    })
    this._loggerService.logComponentInitialization('ProfilePageComponent');
  }

  loading = false;
  AVATAR_CONFIG = {
    MAX_SIZE_MB: 1,
    MAX_SIZE_BYTES: 1 * 1024 * 1024, // 1MB in bytes
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  };

   validateProfilePicture(file: File): string | null {
    if (file.size > this.AVATAR_CONFIG.MAX_SIZE_BYTES) {
      return `File size must be less than ${this.AVATAR_CONFIG.MAX_SIZE_MB}MB`;
    }
    
    if (!this.AVATAR_CONFIG.ALLOWED_TYPES.includes(file.type)) {
      return 'Only JPEG, PNG, and WebP images are allowed';
    }
    
    return null;
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const fileerror = this.validateProfilePicture(file)
    if(fileerror!==null){
      this.snackBar.open(fileerror)
      return;
     }
     const profile = this.profileService.profile();
     if(profile === undefined){return}
    this.loading = true;
    try {
      
     
      const url = await this.profileService.uploadAvatar(file);
      await this.profileService.updateProfile({
        avatar_url: url
      });
      this.snackBar.open('Profile photo updated', 'Close', { duration: 3000 });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      this.snackBar.open(error.message || 'Failed to update profile photo', 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    this.loading = true;
    const profile =this.profileService.profile();
    if(profile===undefined){return;}
    try {
      await this.profileService.updateProfile({
        avatar_url: this.profileFormGoup.controls.avatar_url.value ?? '',
        username: this.profileFormGoup.controls.username.value ?? ''
      })
      this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error updating profile:', error);
      this.snackBar.open('Failed to update profile', 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }
}
