import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OuterModule } from './core/views/outer-modules/outer.module';
import { MainModule } from './core/main/main.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from './helpers/interceptors/auth.interceptor';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SuccessModalComponent } from './shared/components/success-modal/success-modal.component';
@NgModule({
  declarations: [AppComponent, SuccessModalComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    AngularSvgIconModule,
    OuterModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
