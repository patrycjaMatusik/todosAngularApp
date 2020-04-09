import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service copy';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number
  todo: Todo

  constructor(private route: ActivatedRoute,
    private todoService: TodoDataService,
    private router: Router,
    private basicAuthService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date())
    let username = this.basicAuthService.getAuthenticatedUser()
    if (this.id != -1) {
      this.todoService.retrieveTodo(username, this.id)
        .subscribe(
          data => this.todo = data
        )
    }
  }

  saveTodo() {
    let username = this.basicAuthService.getAuthenticatedUser()
    if (this.id === -1) {
      this.todoService.createTodo(username, this.todo)
      .subscribe(
        data => {
          this.router.navigate(['todos'])
        }
      )
    } else {
    this.todoService.updateTodo(username, this.id, this.todo)
      .subscribe(
        data => {
          this.router.navigate(['todos'])
        }
      )
    }
  }

}
