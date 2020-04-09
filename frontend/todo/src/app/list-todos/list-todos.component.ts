import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service copy';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {


  todos: Todo[]
  //= [new Todo(1, 'Learn to dance', false, new Date()),
  // new Todo(2, 'Visit Viena', true, new Date())]
  message: string

  constructor(
    private todoService: TodoDataService,
    private router: Router,
    private basicAuthService: BasicAuthenticationService) { }

  ngOnInit(): void {
    this.refreshTodos()
  }

  refreshTodos(){
    let username = this.basicAuthService.getAuthenticatedUser();
    this.todoService.retrieveAllTodos(username).subscribe(
      response => {
        console.log(response)
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    let username = this.basicAuthService.getAuthenticatedUser();
    this.todoService.deleteTodo(username, id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`
        this.refreshTodos();
      }
    )
  }

  updateTodo(id){
    this.router.navigate(['todos', id])
  }

  addTodo() {
    this.router.navigate(['todos', -1])
  }

}
