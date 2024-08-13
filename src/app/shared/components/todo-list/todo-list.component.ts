import { Component } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  pages: Array<string> = [];

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
  }
}
