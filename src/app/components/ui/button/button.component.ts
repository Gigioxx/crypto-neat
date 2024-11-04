import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',

})
export class ButtonComponent {
  @Input() variant: string = 'primary';
  @Input() label: string = 'Button';

  get classes() {
    return {
      'bg-primary rounded-3xl hover:bg-[#5C87F3] focus:stroke-primary/40 px-[24px] py-[14px]': this.variant === 'primary',
      // 'bg-white rounded-3xl text-primary hover:bg-[#EBF0FE] focus:stroke-primary px-[24px] py-[14px]': this.variant === 'secondary',
    };
  }
}