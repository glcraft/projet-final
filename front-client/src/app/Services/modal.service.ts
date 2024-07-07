// modal.service.ts
import { Injectable, TemplateRef, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private viewRef!: EmbeddedViewRef<any>;

  constructor(private appRef: ApplicationRef, private injector: Injector) { }

  openModal(content: TemplateRef<any>) {
    this.viewRef = content.createEmbeddedView(null);
    this.appRef.attachView(this.viewRef);
    const domElem = this.viewRef.rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    setTimeout(() => {
      const modalElement = domElem.querySelector('.modal');
      const modal = new bootstrap.Modal(modalElement!);
      modal.show();
    }, 0);
  }

  closeModal() {
    const modalElement = this.viewRef.rootNodes[0].querySelector('.modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement!);
    modalInstance.hide();
    this.appRef.detachView(this.viewRef);
    document.body.removeChild(this.viewRef.rootNodes[0]);
  }
}
