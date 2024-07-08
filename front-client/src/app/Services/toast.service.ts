// toast.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  showToast(message: string): void {
    const toastElement = this.renderer.selectRootElement('#liveToast', true);
    toastElement.querySelector('.toast-body').innerText = message;
    const toastBootstrap = new Toast(toastElement);
    toastBootstrap.show();
     
  }
}
