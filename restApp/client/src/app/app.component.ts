import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1 class="display-1">Welcome to {{title}}!</h1>
    <h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>

<h1 class="display-4">Display 4</h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'client';
}
