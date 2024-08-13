import { Injectable } from '@angular/core';
import { Task } from '../../types/task';
import { EventObj } from '../../types/event';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  currentUser = new BehaviorSubject<string>('Джон Сноу');
  // user$ = this.currentUser.asObservable();

  tasks: Array<Task> = [];
  tags: string[] = [];
  events: Array<EventObj> = [];
  pagesList: string[] = ['tasks', 'tags', 'events'];
  currentPage: string = '';
  isFormHidden: boolean = true;
  selectedTagName: string = '';
  isTagClicked: boolean = false;

  taskForm = new FormGroup({
    name: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-яё0-9]+(?:[ -_][A-Za-яё0-9]+)*$/)]),
    description: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-яё0-9]+(?:[ -_][A-Za-яё0-9]+)*$/)]),
    tag: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-яё0-9]+(?:[-_][a-яё0-9]+)*$/)]),
    event: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-яё0-9]+(?:[ -_][A-Za-яё0-9]+)*$/)]),
    endDate: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(10)]),
    endTime: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(5)]),
  });

  // получает текущее имя страницы и включает/выключает поля формы в зависимости от текущей страницы
  // временное решение вместо создания переиспользующейся формы через CVAccessor
  setCurrentPageName(pageName: string) {
    this.currentPage = pageName;
    console.log(this.currentPage);

    if (this.currentPage === 'tasks') {
      this.taskForm.controls.name.enable();
      this.taskForm.controls.description.enable();
      this.taskForm.controls.tag.disable();
      this.taskForm.controls.event.disable();
      this.taskForm.controls.endDate.disable();
      this.taskForm.controls.endTime.disable();
    } else if (this.currentPage === 'tags') {
      this.taskForm.controls.tag.enable();
      this.taskForm.controls.name.disable();
      this.taskForm.controls.description.disable();
      this.taskForm.controls.event.disable();
      this.taskForm.controls.endDate.disable();
      this.taskForm.controls.endTime.disable();
    } else if (this.currentPage === 'events') {
      this.taskForm.controls.event.enable();
      this.taskForm.controls.endDate.enable();
      this.taskForm.controls.endTime.enable();
      this.taskForm.controls.name.disable();
      this.taskForm.controls.description.disable();
      this.taskForm.controls.tag.disable();
    }
  }

  // включает/выключает поля даты и времени формы
  toggleDateTimeFields() {
    if (this.taskForm.controls.endDate.disabled) {
      this.taskForm.controls.endDate.enable();
      this.taskForm.controls.endTime.enable();
    } else {
      this.taskForm.controls.endDate.disable();
      this.taskForm.controls.endTime.disable();
    }
  }

  // скрывает/отображает форму при клике
  toggleFormVisible() {
    console.log('Клик');
    this.isFormHidden = !this.isFormHidden;
    if (this.isFormHidden) {
      this.taskForm.reset({ name: '', description: '', tag: '', event: '', endDate: '', endTime: '' })
    }
    ;
  }

  //добавление события к дате и времени, обнуление полей формы события, даты и времени
  addEvent() {
    const event: EventObj = {
      text: this.taskForm.value.event!,
      endDate: this.taskForm.value.endDate!,
      endTime: this.taskForm.value.endTime!,
    }
    this.events.push(event);
    this.taskForm.reset({ event: '', endDate: '', endTime: '' });
    console.log(event);
  }

  // удаление события/event/напоминания
  deleteEvent(index: number) {
    this.events = this.events.filter(event => event !== this.events[index]);
  }

  // формат тега, добавление его в массив и сброс поля тега формы
  addTag() {
    const formatValue = ("" + this.taskForm.value.tag).toLowerCase();
    if (!this.tags.length) {
      this.tags.push(formatValue);
    } else if (!this.tags.find(tag => tag === formatValue)) {
      this.tags.push(formatValue);
    } else {
      alert('Ошибка! Тег с таким именем уже существует.')
    };
    this.taskForm.reset({ tag: '' });
  }

  //выбор тега и пометка его для добавления к задаче
  markTag(tagName: string) {
    if (this.selectedTagName) {
      this.selectedTagName = '';
    } else {
      this.isTagClicked = true;
      this.selectedTagName = tagName;
      alert('Выберите задачу во вкладке "Список Задач" для добавления тега')
    }
  }

  // удаление тега и отмена пометки выбранного тега 
  deleteTag(index: number) {
    this.isTagClicked = false;
    this.selectedTagName = '';
    this.tags = this.tags.filter(tag => tag !== this.tags[index]);
  }


  // создает задачу или сохраняет изменения после редактирования
  setTask() {
    let formatDate;
    if (!this.taskForm.value.endDate && !this.taskForm.value.endTime) {
      formatDate = ''
    } else {
      formatDate = this.taskForm.value.endDate + ', ' + this.taskForm.value.endTime;
    }
    const editingTaskIndex = this.tasks.findIndex(task => task.isEditing);
    if (editingTaskIndex >= 0) {
      this.tasks[editingTaskIndex].name = this.taskForm.value.name!;
      this.tasks[editingTaskIndex].description = this.taskForm.value.description!;
      this.tasks[editingTaskIndex].date = formatDate;
      this.tasks[editingTaskIndex].isEditing = !this.tasks[editingTaskIndex].isEditing;
    } else {
      const task: Task = {
        id: +`${this.tasks.length + 1}`,
        name: this.taskForm.value.name!,
        description: this.taskForm.value.description!,
        date: formatDate,
        tag: '',
        isComplete: false,
        isEditing: false,
      }
      this.tasks.push(task);
    }
    this.taskForm.reset({ name: '', description: '' });
    console.log(this.tasks);
  }

  // позволяет редактировать задачу загружая данные в поля формы и наоборот
  editTask(id: number, name: string, description: string) {
    this.taskForm.patchValue({ name: name, description: description });
    const editingTask = this.tasks.find(task => task.id === id);
    console.log(editingTask);
    if (editingTask) {
      editingTask.isEditing = true;
    }
  }

  // позволяет отметить задачу выполненной через зачеркивание (добавление класса)
  completeTask(index: number) {
    if (!this.isTagClicked) {
      this.tasks[index].isComplete = !this.tasks[index].isComplete;
    }
  }

  //добавить тег к элементу задачи/task по клику
  attachTagToTask(index: number) {
    if (this.selectedTagName) {
      this.tasks[index].tag = this.selectedTagName;
      this.selectedTagName = '';
    }
    console.log(this.tasks)
  }

  //удаление задачи
  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  //очистка полей формы Задач
  clearTasks() {
    this.tasks = [];
    this.taskForm.reset({ name: '', description: '' });
  }

  constructor() { }
}
