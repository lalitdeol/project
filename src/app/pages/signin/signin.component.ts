import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PostService } from '../../post.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private post: PostService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
     // reset login status
     this.post.logout();
            // get return url from route parameters or default to '/'
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          }
          get f() { return this.loginForm.controls; }

          onSubmit() {
            this.submitted = true;

            // stop here if form is invalid
            if (this.loginForm.invalid) {
                return;
            }

            this.loading = true;
            this.post.login(this.f.email.value, this.f.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                        this.router.navigate(['/posts']);
                    },
                    error => {
                      console.log(error)
                        this.loading = false;
                    });
        }
  }


