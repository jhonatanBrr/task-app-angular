import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ButtonComponent } from './components/general/button/button.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersComponent } from './components/users/users.component';
import { ViewTasksComponent } from './views/view-tasks/view-tasks.component';
import { ViewUsersComponent } from './views/view-users/view-users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TaskComponent,
    SearcherComponent,
    FiltersComponent,
    ButtonComponent,
    MatTabsModule,
    UsersComponent,
    ViewTasksComponent,
    ViewUsersComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements AfterViewInit {
  title = 'taskApp';

  ngAfterViewInit() {
    const tabs = document.querySelectorAll('.navtab');
    const contents = document.querySelectorAll('.content');
    const underline = document.querySelector('.underline') as HTMLElement;

    function updateUnderline() {
      const activeTab = document.querySelector('.navtab.active')  as HTMLElement;
      if (activeTab) {
        underline.style.width = `${activeTab.clientWidth}px`;
        underline.style.left = `${activeTab.offsetLeft}px`;
      }
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        contents.forEach(content => {
          if (content.id === target) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
        updateUnderline();
      });
    });

    window.addEventListener('resize', updateUnderline);
    updateUnderline();
  }
}