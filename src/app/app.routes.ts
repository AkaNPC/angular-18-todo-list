import { Routes } from '@angular/router';
import { TodoListComponent } from './shared/components/todo-list/todo-list.component';
import { EventsListComponent } from './shared/components/events-list/events-list.component';
import { TagsListComponent } from './shared/components/tags-list/tags-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full',
    },
    { path: 'tasks', component: TodoListComponent },
    { path: 'events', component: EventsListComponent },
    { path: 'tags', component: TagsListComponent },
];
