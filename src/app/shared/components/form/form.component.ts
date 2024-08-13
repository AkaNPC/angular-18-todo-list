import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})

export class FormComponent {
  constructor(public todoService: TodoService) {
  }
}
