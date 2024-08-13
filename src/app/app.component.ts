import { Component } from '@angular/core';
// import { FormComponent } from './shared/components/form/form.component';
import { TodoListComponent } from './shared/components/todo-list/todo-list.component';
import { TagsListComponent } from './shared/components/tags-list/tags-list.component';
import { EventsListComponent } from './shared/components/events-list/events-list.component';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ModalComponent } from './shared/components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent, TagsListComponent, NavBarComponent, EventsListComponent, ModalComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
