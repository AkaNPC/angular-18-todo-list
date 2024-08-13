import { Component } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { NgFor } from '@angular/common';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [NgFor, FormComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss',
})
export class EventsListComponent {
  constructor(public todoService: TodoService) {
  }
}
