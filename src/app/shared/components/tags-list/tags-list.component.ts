import { Component } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { NgFor, NgClass } from '@angular/common';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [NgFor, NgClass, FormComponent],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.scss'
})
export class TagsListComponent {


  constructor(public todoService: TodoService) {
  }
}
