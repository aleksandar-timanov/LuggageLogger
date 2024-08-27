import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { UserComponent } from './components/user/user.component'
import { TopBarComponent } from './components/top-bar/top-bar.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, UserComponent, TopBarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'LuggageLogger'
}
