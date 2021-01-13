import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {PostService }  from '../../post.service';
import { User } from './../../user';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  users: User[] = [];
  currentUser: User;


  constructor(private Post:PostService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  posts:any = [];


  ngOnInit() {
    this.loadAllUsers();
    this.Post.getpostdata().subscribe((resp)=>{
      // console.warn( resp)

      this.posts = resp;
    })

  }
  private loadAllUsers() {
    this.Post.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
}

}
