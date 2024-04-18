import { Component, Output, EventEmitter } from '@angular/core'
import { IconsModule } from '../../icons/icons.module'

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [IconsModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
})
export class ModalComponent {
    @Output() closeModal = new EventEmitter()

    public onModalCloseClick(): void {
        this.closeModal.emit()
    }
}
