import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { TodoService } from '../../../core/services/todo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent {

  constructor(public todoService: TodoService) {
  }
}
