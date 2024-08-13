import { Component } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  userName: string = '';


  setUser() {
    const user = prompt("Пожалуйста введите Ваше имя");
    if (user) {
      this.todoService.currentUser.next(user)
    }
  }

  constructor(public todoService: TodoService) {
  }
  ngOnInit() {
    this.todoService.currentUser.subscribe((user) => this.userName = user);
    this.setUser()
  }
  ngOnDestroy() {
    this.todoService.currentUser.unsubscribe()
  }
}
