import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './pages/signup/signup.component';

import { SigninComponent } from './pages/signin/signin.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { PostsComponent } from './pages/posts/posts.component';
import { ReactiveFormsModule} from '@angular/forms';
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AuthGuard } from './guard/auth.guard';
import { PostService } from './post.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,

    SigninComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,

    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    PostService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
