import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = {
    pendings: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'],
    inProgress: ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'],
    done : ['Take a shower', 'Check e-mail', 'Walk dog']
  };

  constructor() { }

  ngOnInit(): void {
    this.setItems();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      Object.keys(this.data).forEach((key,index) => {
        localStorage.setItem(key, JSON.stringify(Object.values(this.data)[index]));
      });
    }
  }

  addTodo(todo:any){
    this.data.pendings.push(todo.value);
    todo.value = '';
    localStorage.setItem('pendings', JSON.stringify(this.data.pendings));
  }

  setItems(){
    Object.keys(this.data).forEach((key,index) => {
      if (!localStorage.getItem(key)){
        localStorage.setItem(key, JSON.stringify(Object.values(this.data)[index]));
      }
      else{
        Object.values(this.data)[index] = JSON.parse(localStorage.getItem(key) || '');
      }
    });
  }

}
