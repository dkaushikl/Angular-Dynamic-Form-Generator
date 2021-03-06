import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,

    CommonModule,

    // Router
    AppRoutingModule,

    SharedModule,

    // Feature
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
